const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const PatientMatchingEngine = require('./matching-engine');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'hl7_matching',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// File upload configuration
const upload = multer({ storage: multer.memoryStorage() });

// Initialize matching engine
const matchingEngine = new PatientMatchingEngine();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HL7 Patient Matching API is running' });
});

// Parse HL7 message
function parseHL7Message(message) {
  const segments = message.split('\r');
  const patient = {};

  for (const segment of segments) {
    const fields = segment.split('|');
    const segmentType = fields[0];

    if (segmentType === 'PID') {
      // PID segment contains patient demographics
      const nameParts = fields[5]?.split('^') || [];
      patient.last_name = nameParts[0] || '';
      patient.first_name = nameParts[1] || '';
      patient.middle_name = nameParts[2] || '';
      patient.suffix = nameParts[4] || '';
      
      patient.mrn = fields[3]?.split('^')[0] || '';
      patient.dob = fields[7] || '';
      patient.sex = fields[8] || '';
      patient.race = fields[10] || '';
      
      const addressParts = fields[11]?.split('^') || [];
      patient.street_address = addressParts[0] || '';
      patient.city = addressParts[2] || '';
      patient.state = addressParts[3] || '';
      patient.zip = addressParts[4] || '';
      
      patient.phone = fields[13] || '';
      patient.ssn = fields[19] || '';
    }

    if (segmentType === 'PV1') {
      patient.admission_type = fields[4] || '';
      patient.admission_date = fields[44] || '';
    }

    if (segmentType === 'IN1') {
      // Parse insurance information from IN1 segment
      // Correct field positions based on actual HL7 structure:
      // IN1|1|CarrierID|CarrierID|CarrierName||||||GroupNum||||EffDate|||PlanType|PatientName||...||||||||||||||||PolicyNum
      patient.insurance_carrier_id = fields[3] || '';
      patient.insurance_carrier_name = fields[4] || '';
      patient.insurance_group_number = fields[10] || '';  // Field 10: Group Number
      patient.insurance_plan_type = fields[17] || '';     // Field 17: Plan Type (CORRECTED!)
      patient.insurance_policy_number = fields[fields.length - 1] || ''; // Last field: Policy Number
      
      // Debug logging
      console.log('🔍 IN1 Segment Parsed:');
      console.log('  Carrier:', patient.insurance_carrier_name);
      console.log('  Group Number (field 10):', fields[10]);
      console.log('  Plan Type (field 17):', fields[17]);
      console.log('  Policy Number (last field):', fields[fields.length - 1]);
      console.log('  Total fields in IN1:', fields.length);
    }

    if (segmentType === 'DG1') {
      const diagnosisParts = fields[3]?.split('^') || [];
      patient.diagnosis_code = diagnosisParts[0] || '';
      patient.diagnosis_description = diagnosisParts[1] || '';
    }
  }

  return patient;
}

// Upload and process HL7 file
app.post('/api/hl7/upload', upload.single('hl7file'), async (req, res) => {
  try {
    const hl7Content = req.file.buffer.toString('utf-8');
    // Split on newline, each message starts with MSH
    const messages = hl7Content.split('\n').filter(m => m.trim() && m.startsWith('MSH'));
    
    const patients = [];
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      for (const message of messages) {
        if (!message.trim()) continue;
        
        const patient = parseHL7Message(message);
        
        // Check if patient already exists
        const existingPatient = await client.query(
          'SELECT id FROM patients WHERE mrn = $1',
          [patient.mrn]
        );

        let patientId;
        
        if (existingPatient.rows.length > 0) {
          // Patient exists, use existing ID
          patientId = existingPatient.rows[0].id;
          console.log(`Patient with MRN ${patient.mrn} already exists, skipping insert`);
        } else {
          // Insert new patient with insurance information
          const result = await client.query(
            `INSERT INTO patients (
              mrn, first_name, middle_name, last_name, suffix,
              dob, sex, race, ssn, street_address, city, state, zip, phone,
              insurance_carrier_id, insurance_carrier_name, insurance_plan_type,
              insurance_policy_number, insurance_group_number
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            RETURNING id`,
            [
              patient.mrn, patient.first_name, patient.middle_name,
              patient.last_name, patient.suffix, patient.dob, patient.sex,
              patient.race, patient.ssn, patient.street_address,
              patient.city, patient.state, patient.zip, patient.phone,
              patient.insurance_carrier_id, patient.insurance_carrier_name,
              patient.insurance_plan_type, patient.insurance_policy_number,
              patient.insurance_group_number
            ]
          );
          patientId = result.rows[0].id;
        }

        // Insert admission (always insert new admissions)
        await client.query(
          `INSERT INTO admissions (
            patient_id, admission_date, admission_type,
            diagnosis_code, diagnosis_description, hl7_message
          ) VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            patientId,
            patient.admission_date || new Date().toISOString(),
            patient.admission_type,
            patient.diagnosis_code,
            patient.diagnosis_description,
            message
          ]
        );

        patients.push({ id: patientId, ...patient });
      }

      await client.query('COMMIT');
      
      res.json({
        success: true,
        count: patients.length,
        message: 'HL7 messages processed successfully',
        patients: patients
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error processing HL7 file:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM patients WHERE status = 'ACTIVE' ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: error.message });
  }
});

// Run matching algorithm
app.post('/api/matching/run', async (req, res) => {
  try {
    const { threshold = 0.75 } = req.body;
    
    const patientsResult = await pool.query(
      'SELECT * FROM patients WHERE status = $1',
      ['ACTIVE']
    );
    const patients = patientsResult.rows;
    
    console.log(`Running matching on ${patients.length} patients...`);
    
    const matches = await matchingEngine.findAllDuplicates(patients, threshold);
    
    // Store matches in database
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Clear existing matches
      await client.query('DELETE FROM patient_matches');
      
      // Insert new matches
      for (const match of matches) {
        await client.query(
          `INSERT INTO patient_matches (
            patient1_id, patient2_id, confidence, method, reasoning, field_scores, breakdown, exception
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            match.patient1.id,
            match.patient2.id,
            match.confidence,
            match.method,
            match.reasoning,
            JSON.stringify(match.fieldScores || {}),
            JSON.stringify(match.breakdown || []),
            match.exception ? JSON.stringify(match.exception) : null
          ]
        );
      }
      
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
    res.json({
      success: true,
      matchCount: matches.length,
      matches: matches.map(m => ({
        patient1_id: m.patient1.id,
        patient1_name: `${m.patient1.first_name} ${m.patient1.last_name}`,
        patient2_id: m.patient2.id,
        patient2_name: `${m.patient2.first_name} ${m.patient2.last_name}`,
        confidence: m.confidence,
        method: m.method,
        reasoning: m.reasoning
      }))
    });
  } catch (error) {
    console.error('Error running matching:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get matching results
app.get('/api/matching/results', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        m.*,
        p1.mrn as p1_mrn,
        p1.first_name as p1_first,
        p1.last_name as p1_last,
        p1.dob as p1_dob,
        p1.ssn as p1_ssn,
        p1.phone as p1_phone,
        p1.city as p1_city,
        p1.state as p1_state,
        p1.insurance_carrier_name as p1_insurance,
        p1.insurance_plan_type as p1_plan_type,
        p1.insurance_policy_number as p1_policy_number,
        p1.insurance_group_number as p1_group_number,
        p2.mrn as p2_mrn,
        p2.first_name as p2_first,
        p2.last_name as p2_last,
        p2.dob as p2_dob,
        p2.ssn as p2_ssn,
        p2.phone as p2_phone,
        p2.city as p2_city,
        p2.state as p2_state,
        p2.insurance_carrier_name as p2_insurance,
        p2.insurance_plan_type as p2_plan_type,
        p2.insurance_policy_number as p2_policy_number,
        p2.insurance_group_number as p2_group_number
      FROM patient_matches m
      JOIN patients p1 ON m.patient1_id = p1.id
      JOIN patients p2 ON m.patient2_id = p2.id
      WHERE m.status = 'PENDING'
      ORDER BY m.confidence DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: error.message });
  }
});

// Merge patients
app.post('/api/patients/merge', async (req, res) => {
  try {
    const { keepId, mergeId, matchId } = req.body;
    
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Update all admissions
      await client.query(
        'UPDATE admissions SET patient_id = $1 WHERE patient_id = $2',
        [keepId, mergeId]
      );
      
      // Mark patient as merged
      await client.query(
        'UPDATE patients SET merged_into = $1, status = $2 WHERE id = $3',
        [keepId, 'MERGED', mergeId]
      );
      
      // Update match status
      if (matchId) {
        await client.query(
          'UPDATE patient_matches SET status = $1, reviewed_at = NOW() WHERE id = $2',
          ['APPROVED', matchId]
        );
      }
      
      await client.query('COMMIT');
      
      res.json({ success: true, message: 'Patients merged successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error merging patients:', error);
    res.status(500).json({ error: error.message });
  }
});

// Reject match
app.post('/api/matching/reject', async (req, res) => {
  try {
    const { matchId } = req.body;
    
    await pool.query(
      'UPDATE patient_matches SET status = $1, reviewed_at = NOW() WHERE id = $2',
      ['REJECTED', matchId]
    );
    
    res.json({ success: true, message: 'Match rejected' });
  } catch (error) {
    console.error('Error rejecting match:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get HL7 record for a patient
app.get('/api/patients/:patientId/hl7', async (req, res) => {
  try {
    const { patientId } = req.params;
    
    const result = await pool.query(
      `SELECT a.hl7_message, a.admission_date, a.diagnosis_description,
              p.mrn, p.first_name, p.last_name, p.dob
       FROM admissions a
       JOIN patients p ON a.patient_id = p.id
       WHERE a.patient_id = $1
       ORDER BY a.admission_date DESC
       LIMIT 1`,
      [patientId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No HL7 record found for this patient' });
    }
    
    res.json({
      success: true,
      hl7_message: result.rows[0].hl7_message,
      patient_info: {
        mrn: result.rows[0].mrn,
        name: `${result.rows[0].first_name} ${result.rows[0].last_name}`,
        dob: result.rows[0].dob,
        admission_date: result.rows[0].admission_date,
        diagnosis: result.rows[0].diagnosis_description
      }
    });
  } catch (error) {
    console.error('Error fetching HL7 record:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get merged patients
app.get('/api/merged-patients', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.mrn,
        p.first_name,
        p.middle_name,
        p.last_name,
        p.dob,
        p.sex,
        p.ssn,
        p.phone,
        p.street_address,
        p.city,
        p.state,
        p.zip,
        p.insurance_carrier_name,
        p.insurance_plan_type,
        p.insurance_policy_number,
        p.insurance_group_number,
        p.updated_at as merged_at,
        pm.patient1_id as merged_into_id,
        p2.mrn as merged_into_mrn,
        p2.first_name || ' ' || p2.last_name as merged_into_name
      FROM patients p
      LEFT JOIN patient_matches pm ON p.id = pm.patient2_id AND pm.status = 'MERGED'
      LEFT JOIN patients p2 ON pm.patient1_id = p2.id
      WHERE p.status = 'MERGED'
      ORDER BY p.updated_at DESC
    `);
    
    res.json({ mergedPatients: result.rows });
  } catch (error) {
    console.error('Error fetching merged patients:', error);
    res.status(500).json({ error: error.message });
  }
});

// Statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM patients WHERE status = 'ACTIVE') as active_patients,
        (SELECT COUNT(*) FROM patients WHERE status = 'MERGED') as merged_patients,
        (SELECT COUNT(*) FROM patient_matches WHERE status = 'PENDING') as pending_matches,
        (SELECT COUNT(*) FROM patient_matches WHERE status = 'APPROVED') as approved_matches,
        (SELECT COUNT(*) FROM admissions) as total_admissions
    `);
    
    res.json(stats.rows[0]);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🏥 HL7 Patient Matching Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  pool.end();
  process.exit(0);
});

// Made with Bob
