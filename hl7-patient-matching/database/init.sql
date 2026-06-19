-- HL7 Patient Matching Database Schema
-- Version: 1.0
-- Date: June 19, 2026

-- Drop existing tables if they exist
DROP TABLE IF EXISTS admissions CASCADE;
DROP TABLE IF EXISTS patient_matches CASCADE;
DROP TABLE IF EXISTS patients CASCADE;

-- Patients table
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  mrn VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  middle_name VARCHAR(100),
  last_name VARCHAR(100),
  suffix VARCHAR(10),
  dob VARCHAR(20),
  sex CHAR(1),
  race VARCHAR(20),
  ssn VARCHAR(11),
  street_address VARCHAR(200),
  city VARCHAR(100),
  state VARCHAR(2),
  zip VARCHAR(10),
  phone VARCHAR(20),
  insurance_carrier_id VARCHAR(20),
  insurance_carrier_name VARCHAR(200),
  insurance_plan_type VARCHAR(50),
  insurance_policy_number VARCHAR(50),
  insurance_group_number VARCHAR(50),
  status VARCHAR(20) DEFAULT 'ACTIVE',
  merged_into INTEGER REFERENCES patients(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Patient matches table
CREATE TABLE patient_matches (
  id SERIAL PRIMARY KEY,
  patient1_id INTEGER REFERENCES patients(id),
  patient2_id INTEGER REFERENCES patients(id),
  confidence DECIMAL(5,4),
  method VARCHAR(50),
  reasoning TEXT,
  field_scores JSONB,
  breakdown JSONB,
  exception JSONB,
  status VARCHAR(20) DEFAULT 'PENDING',
  reviewed_by VARCHAR(100),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_match UNIQUE(patient1_id, patient2_id)
);

-- Admissions table
CREATE TABLE admissions (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id),
  admission_date TIMESTAMP,
  admission_type VARCHAR(10),
  diagnosis_code VARCHAR(20),
  diagnosis_description TEXT,
  hl7_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_patients_name ON patients(last_name, first_name);
CREATE INDEX idx_patients_dob ON patients(dob);
CREATE INDEX idx_patients_ssn ON patients(ssn);
CREATE INDEX idx_patients_status ON patients(status);
CREATE INDEX idx_patients_insurance ON patients(insurance_carrier_id);
CREATE INDEX idx_matches_confidence ON patient_matches(confidence DESC);
CREATE INDEX idx_matches_status ON patient_matches(status);
CREATE INDEX idx_admissions_patient ON admissions(patient_id);

-- Comments
COMMENT ON TABLE patients IS 'Patient demographic information from HL7 ADT messages';
COMMENT ON TABLE patient_matches IS 'Potential duplicate patient records identified by matching algorithms';
COMMENT ON TABLE admissions IS 'Hospital admission records with HL7 message data';

COMMENT ON COLUMN patients.status IS 'ACTIVE, MERGED, or INACTIVE';
COMMENT ON COLUMN patient_matches.status IS 'PENDING, APPROVED, or REJECTED';
COMMENT ON COLUMN patient_matches.confidence IS 'Match confidence score from 0.0 to 1.0';
COMMENT ON COLUMN patient_matches.method IS 'Matching algorithm used: deterministic, probabilistic, or ai';
COMMENT ON COLUMN patient_matches.exception IS 'JSON object containing exception details (e.g., insurance reinrollment)';

-- Insert sample data for testing (optional)
-- This will be populated by the data generator script

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Database schema initialized successfully';
  RAISE NOTICE '📊 Tables created: patients, patient_matches, admissions';
  RAISE NOTICE '🔍 Indexes created for optimal query performance';
END $$;

-- Made with Bob
