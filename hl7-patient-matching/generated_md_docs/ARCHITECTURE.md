# HL7 Patient Matching System - Architecture Documentation
**Version:** 1.2.0  
**Last Updated:** June 2026

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Component Architecture](#component-architecture)
5. [Data Flow](#data-flow)
6. [Database Schema](#database-schema)
7. [Matching Algorithm](#matching-algorithm)
8. [API Endpoints](#api-endpoints)
9. [Deployment Architecture](#deployment-architecture)
10. [Security Considerations](#security-considerations)
11. [Performance & Scalability](#performance--scalability)
12. [Monitoring & Logging](#monitoring--logging)

---

## System Overview

The HL7 Patient Matching System is a healthcare data integration application designed to process HL7 ADT (Admission, Discharge, Transfer) messages, identify potential duplicate patient records, and detect reinrollment scenarios with changed insurance information.

### Key Features
- **HL7 Message Processing**: Parses HL7 v2.5 ADT^A01 messages
- **Duplicate Detection**: Uses deterministic and probabilistic matching algorithms
- **Insurance Change Detection**: Identifies reinrollment scenarios with modified insurance details
- **Real-time Dashboard**: Web-based interface for viewing matches and patient data
- **Merge Management**: Tracks merged patient records and maintains audit trail

### Business Value
- Reduces duplicate patient records in healthcare systems
- Improves data quality and patient safety
- Identifies insurance changes that may indicate reinrollment
- Provides transparency in matching decisions with confidence scores

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Web Browser (Frontend)                                   │  │
│  │  - HTML5 / CSS3 / Vanilla JavaScript                      │  │
│  │  - Responsive UI with Bootstrap-like styling              │  │
│  │  - Real-time statistics dashboard                         │  │
│  │  - Patient match visualization                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Node.js Express Server (Backend)                         │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  API Routes                                         │  │  │
│  │  │  - /api/upload (HL7 file processing)               │  │  │
│  │  │  - /api/stats (dashboard statistics)               │  │  │
│  │  │  - /api/matches (potential duplicates)             │  │  │
│  │  │  - /api/patients (patient records)                 │  │  │
│  │  │  - /api/merge (merge patient records)              │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Business Logic                                     │  │  │
│  │  │  - HL7 Parser (server.js)                          │  │  │
│  │  │  - Matching Engine (matching-engine.js)            │  │  │
│  │  │  - Data Generator (generate-hl7-patients.js)       │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ PostgreSQL Protocol
┌─────────────────────────────────────────────────────────────────┐
│                        Data Layer                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                      │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  Tables:                                            │  │  │
│  │  │  - patients (master patient index)                 │  │  │
│  │  │  - admissions (hospital encounters)                │  │  │
│  │  │  - patient_matches (duplicate candidates)          │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    Container Layer (Podman)                      │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │  hl7-app         │              │  hl7-postgres    │         │
│  │  (Application)   │◄────────────►│  (Database)      │         │
│  │  Port: 3000      │              │  Port: 5432      │         │
│  └──────────────────┘              └──────────────────┘         │
│           Network: hl7-network                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **HTML5**: Semantic markup for web interface
- **CSS3**: Custom styling with responsive design
- **JavaScript (ES6+)**: Client-side logic and API interactions
- **No Framework**: Vanilla JavaScript for lightweight performance

### Backend
- **Node.js v18+**: JavaScript runtime environment
- **Express.js**: Web application framework
- **Multer**: File upload middleware for HL7 files
- **pg (node-postgres)**: PostgreSQL client library

### Database
- **PostgreSQL 15**: Relational database management system
- **pg_trgm Extension**: Trigram-based fuzzy string matching

### Container Runtime
- **Podman**: Docker-compatible container runtime
- **Alpine Linux**: Lightweight base images

### Development Tools
- **@faker-js/faker**: Test data generation
- **dumb-init**: Proper signal handling in containers

---

## Component Architecture

### 1. Frontend Components (`/frontend`)

#### **index.html**
- Main application page
- Dashboard statistics display
- File upload interface
- Patient match results table
- Modal windows for detailed views

#### **app.js**
- API communication layer
- HL7 message parsing for display
- Match result rendering
- Modal management
- Event handling

#### **styles.css**
- Responsive layout
- Component styling
- Color scheme and typography
- Animation and transitions

### 2. Backend Components (`/backend`)

#### **server.js** (Main Application Server)
**Responsibilities:**
- HTTP server setup and routing
- HL7 message parsing
- Database operations
- File upload handling
- API endpoint implementation

**Key Functions:**
```javascript
parseHL7Message(hl7Content)  // Parse HL7 segments into patient objects
processHL7File(filePath)      // Process uploaded HL7 file
findMatches()                 // Trigger matching algorithm
mergePatients(id1, id2)       // Merge duplicate records
```

**HL7 Parsing Logic:**
- Splits messages by carriage return (`\r`)
- Parses segments by pipe delimiter (`|`)
- Extracts fields based on HL7 v2.5 specification
- Handles MSH, EVN, PID, PV1, IN1, DG1 segments

**Field Mappings:**
- **PID Segment**: Patient demographics
  - Field 3: MRN
  - Field 5: Patient name (Last^First^Middle)
  - Field 7: Date of birth
  - Field 8: Sex
  - Field 11: Address
  - Field 13: Phone
  - Field 19: SSN

- **IN1 Segment**: Insurance information
  - Field 3: Insurance carrier ID
  - Field 4: Insurance carrier name
  - Field 10: Group number
  - Field 17: Plan type
  - Last field: Policy number

#### **matching-engine.js** (Duplicate Detection Engine)
**Responsibilities:**
- Patient record comparison
- Similarity scoring
- Match confidence calculation
- Insurance change detection

**Matching Criteria:**
1. **Deterministic Matching** (Exact matches)
   - SSN match
   - MRN match (same facility)
   - DOB + Full name match

2. **Probabilistic Matching** (Fuzzy matches)
   - Name similarity (Levenshtein distance)
   - DOB proximity
   - Phone number match
   - Address similarity

3. **Insurance Change Detection**
   - Same carrier, different policy
   - Same carrier, different group number
   - Same carrier, different plan type

**Confidence Scoring:**
```javascript
Base Score:
- SSN match: 40 points
- DOB match: 20 points
- Name similarity: 0-30 points
- Phone match: 10 points

Modifiers:
- Insurance changes: Warning flag
- Multiple matches: Reduced confidence
```

#### **generate-hl7-patients.js** (Test Data Generator)
**Responsibilities:**
- Generate realistic patient data
- Create HL7 ADT^A01 messages
- Introduce intentional duplicates
- Simulate reinrollment scenarios

**Generated Scenarios:**
- Exact duplicates (same MRN)
- Name variations (typos, nicknames)
- Address changes
- Phone number updates
- Insurance changes (reinrollment)

### 3. Database Components (`/database`)

#### **init.sql** (Schema Definition)
**Tables:**

**patients**
```sql
- id: SERIAL PRIMARY KEY
- mrn: VARCHAR(50) UNIQUE
- first_name, middle_name, last_name: VARCHAR(100)
- dob: DATE
- sex: CHAR(1)
- ssn: VARCHAR(11)
- phone: VARCHAR(20)
- address, city, state, zip: VARCHAR
- insurance_carrier_id, insurance_carrier_name: VARCHAR
- insurance_group_number, insurance_plan_type, insurance_policy_number: VARCHAR
- status: VARCHAR(20) DEFAULT 'active'
- created_at, updated_at: TIMESTAMP
```

**admissions**
```sql
- id: SERIAL PRIMARY KEY
- patient_id: INTEGER REFERENCES patients(id)
- admission_date: TIMESTAMP
- patient_class: VARCHAR(10)
- assigned_location: VARCHAR(100)
- attending_doctor: VARCHAR(200)
- hospital_service: VARCHAR(50)
- admission_type: VARCHAR(10)
- raw_hl7_message: TEXT
- created_at: TIMESTAMP
```

**patient_matches**
```sql
- id: SERIAL PRIMARY KEY
- patient1_id: INTEGER REFERENCES patients(id)
- patient2_id: INTEGER REFERENCES patients(id)
- match_score: DECIMAL(5,2)
- match_type: VARCHAR(50)
- match_reason: TEXT
- status: VARCHAR(20) DEFAULT 'pending'
- reviewed_by: VARCHAR(100)
- reviewed_at: TIMESTAMP
- created_at: TIMESTAMP
```

**Indexes:**
- patients(mrn)
- patients(ssn)
- patients(dob)
- patients(last_name, first_name)
- patient_matches(status)

---

## Data Flow

### 1. HL7 File Upload Flow
```
User uploads HL7 file
    ↓
Frontend sends POST /api/upload
    ↓
Backend receives file via Multer
    ↓
Parse HL7 messages line by line
    ↓
Extract patient demographics (PID)
    ↓
Extract insurance info (IN1)
    ↓
Extract admission details (PV1)
    ↓
Check if patient exists (by MRN)
    ↓
Insert/Update patient record
    ↓
Insert admission record
    ↓
Trigger matching algorithm
    ↓
Return processing results
    ↓
Frontend displays statistics
```

### 2. Matching Algorithm Flow
```
New patient record inserted
    ↓
Query all active patients
    ↓
For each existing patient:
    ↓
    Calculate similarity scores
    ↓
    Check deterministic criteria
    ↓
    Calculate probabilistic scores
    ↓
    Check insurance changes
    ↓
    If score > threshold:
        ↓
        Create patient_match record
        ↓
        Generate match reasoning
    ↓
Return all matches
    ↓
Display in dashboard
```

### 3. Patient Merge Flow
```
User selects match to merge
    ↓
Frontend sends POST /api/merge
    ↓
Backend validates merge request
    ↓
Begin database transaction
    ↓
Update patient2 status to 'merged'
    ↓
Update admissions to point to patient1
    ↓
Update match status to 'merged'
    ↓
Commit transaction
    ↓
Return success
    ↓
Frontend refreshes dashboard
```

---

## Database Schema

### Entity Relationship Diagram
```
┌─────────────────────┐
│     patients        │
│─────────────────────│
│ id (PK)             │
│ mrn (UNIQUE)        │
│ first_name          │
│ last_name           │
│ dob                 │
│ ssn                 │
│ insurance_*         │
│ status              │
└─────────────────────┘
         │ 1
         │
         │ N
         ↓
┌─────────────────────┐
│    admissions       │
│─────────────────────│
│ id (PK)             │
│ patient_id (FK)     │
│ admission_date      │
│ raw_hl7_message     │
└─────────────────────┘

┌─────────────────────┐
│  patient_matches    │
│─────────────────────│
│ id (PK)             │
│ patient1_id (FK)    │───┐
│ patient2_id (FK)    │───┼──→ patients.id
│ match_score         │   │
│ match_reason        │   │
│ status              │   │
└─────────────────────┘   │
                          │
         ┌────────────────┘
         │
         ↓
    patients table
```

---

## Matching Algorithm

### Algorithm Overview
The matching engine uses a hybrid approach combining deterministic and probabilistic methods.

### Deterministic Rules (High Confidence)
1. **SSN Match**: If SSN matches exactly → 100% confidence
2. **MRN Match**: If MRN matches → 100% confidence (same facility)
3. **DOB + Full Name**: If DOB and full name match → 95% confidence

### Probabilistic Scoring
```javascript
Score Calculation:
─────────────────
Base Score = 0

IF SSN matches:
    Score += 40

IF DOB matches:
    Score += 20

Name Similarity:
    firstName_similarity = levenshtein(name1, name2)
    lastName_similarity = levenshtein(name1, name2)
    Score += (firstName_similarity + lastName_similarity) / 2 * 30

IF Phone matches:
    Score += 10

Confidence = Score / 100 * 100%
```

### Insurance Change Detection
```javascript
IF (same_carrier AND 
    (different_policy OR different_group OR different_plan)):
    Flag as "Reinrollment Exception"
    Add warning to match_reason
```

### Match Thresholds
- **High Confidence**: Score ≥ 90%
- **Medium Confidence**: Score 70-89%
- **Low Confidence**: Score 50-69%
- **No Match**: Score < 50%

---

## API Endpoints

### POST /api/upload
**Description**: Upload and process HL7 file  
**Content-Type**: multipart/form-data  
**Request Body**: 
```javascript
{
  file: <HL7 file>
}
```
**Response**:
```json
{
  "message": "File processed successfully",
  "stats": {
    "patientsProcessed": 100,
    "admissionsCreated": 100,
    "matchesFound": 15
  }
}
```

### GET /api/stats
**Description**: Get dashboard statistics  
**Response**:
```json
{
  "activePatients": 85,
  "mergedPatients": 15,
  "pendingMatches": 10,
  "totalAdmissions": 100
}
```

### GET /api/matches
**Description**: Get all potential duplicate matches  
**Response**:
```json
{
  "matches": [
    {
      "id": 1,
      "p1_mrn": "MRN000001",
      "p1_name": "John Doe",
      "p2_mrn": "MRN000002",
      "p2_name": "Jon Doe",
      "match_score": 95.5,
      "match_reason": "SSN match, DOB match, Name similarity: 95%",
      "status": "pending"
    }
  ]
}
```

### GET /api/patients
**Description**: Get all active patients  
**Response**:
```json
{
  "patients": [
    {
      "id": 1,
      "mrn": "MRN000001",
      "first_name": "John",
      "last_name": "Doe",
      "dob": "1980-01-01",
      "status": "active"
    }
  ]
}
```

### POST /api/merge
**Description**: Merge two patient records  
**Request Body**:
```json
{
  "patient1_id": 1,
  "patient2_id": 2
}
```
**Response**:
```json
{
  "message": "Patients merged successfully"
}
```

### GET /api/merged-patients
**Description**: Get all merged patient records  
**Response**:
```json
{
  "mergedPatients": [
    {
      "id": 2,
      "mrn": "MRN000002",
      "first_name": "Jon",
      "last_name": "Doe",
      "merged_into_mrn": "MRN000001",
      "merged_at": "2026-06-20T02:00:00Z"
    }
  ]
}
```

---

## Deployment Architecture

### Container Configuration

#### Application Container (hl7-app)
```yaml
Image: hl7-patient-matching:1.2.0
Base: node:18-alpine
Port: 3000
Environment:
  - DB_HOST=hl7-postgres
  - DB_USER=postgres
  - DB_PASSWORD=postgres
  - DB_NAME=hl7_matching
  - DB_PORT=5432
Network: hl7-network
```

#### Database Container (hl7-postgres)
```yaml
Image: postgres:15-alpine
Port: 5432
Environment:
  - POSTGRES_USER=postgres
  - POSTGRES_PASSWORD=postgres
  - POSTGRES_DB=hl7_matching
Volume: hl7-db-data:/var/lib/postgresql/data
Network: hl7-network
```

### Deployment Steps
```bash
# 1. Create network
podman network create hl7-network

# 2. Start database
podman run -d --name hl7-postgres \
  --network hl7-network \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=hl7_matching \
  -v hl7-db-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15-alpine

# 3. Initialize database
podman exec -i hl7-postgres psql -U postgres -d hl7_matching < database/init.sql

# 4. Build application
podman build -t hl7-patient-matching:1.2.0 .

# 5. Start application
podman run -d --name hl7-app \
  --network hl7-network \
  -p 3000:3000 \
  -e DB_HOST=hl7-postgres \
  -e DB_USER=postgres \
  -e DB_PASSWORD=postgres \
  -e DB_NAME=hl7_matching \
  hl7-patient-matching:1.2.0
```

---

## Security Considerations

### Current Implementation
- **No Authentication**: Application is open access
- **No Encryption**: HTTP only (not HTTPS)
- **No Input Validation**: Limited sanitization
- **Database Credentials**: Stored in environment variables

### Recommended Enhancements
1. **Authentication & Authorization**
   - Implement OAuth 2.0 or SAML
   - Role-based access control (RBAC)
   - Session management

2. **Data Encryption**
   - TLS/SSL for HTTPS
   - Encrypt PHI at rest
   - Secure database connections

3. **Input Validation**
   - Sanitize HL7 input
   - Validate file uploads
   - SQL injection prevention (using parameterized queries)

4. **Audit Logging**
   - Log all data access
   - Track merge operations
   - Monitor failed login attempts

5. **HIPAA Compliance**
   - Implement access controls
   - Audit trails
   - Data encryption
   - Business Associate Agreements (BAA)

---

## Performance & Scalability

### Current Performance
- **Throughput**: ~100 patients/second
- **Database**: Single PostgreSQL instance
- **Concurrency**: Node.js event loop (single-threaded)

### Optimization Strategies

#### Database Optimization
```sql
-- Add indexes for common queries
CREATE INDEX idx_patients_ssn ON patients(ssn);
CREATE INDEX idx_patients_dob ON patients(dob);
CREATE INDEX idx_patients_name ON patients(last_name, first_name);
CREATE INDEX idx_matches_status ON patient_matches(status);

-- Enable pg_trgm for fuzzy matching
CREATE EXTENSION pg_trgm;
CREATE INDEX idx_patients_name_trgm ON patients USING gin(last_name gin_trgm_ops);
```

#### Application Optimization
- **Batch Processing**: Process HL7 messages in batches
- **Caching**: Cache frequently accessed patient records
- **Connection Pooling**: Reuse database connections
- **Async Processing**: Use worker queues for matching

#### Horizontal Scaling
```
Load Balancer
    ↓
┌───────┬───────┬───────┐
│ App 1 │ App 2 │ App 3 │
└───────┴───────┴───────┘
         ↓
    PostgreSQL
    (Primary + Replicas)
```

---

## Monitoring & Logging

### Application Logs
```javascript
// Current logging
console.log('✅ Patient processed:', mrn);
console.log('🔍 Match found:', matchScore);
console.error('❌ Error:', error);
```

### Recommended Monitoring

#### Metrics to Track
- **Application Metrics**
  - Request rate (req/sec)
  - Response time (ms)
  - Error rate (%)
  - Active connections

- **Database Metrics**
  - Query execution time
  - Connection pool usage
  - Table sizes
  - Index hit ratio

- **Business Metrics**
  - Patients processed/day
  - Matches found/day
  - Merge operations/day
  - Average match confidence

#### Monitoring Tools
- **Prometheus**: Metrics collection
- **Grafana**: Visualization dashboards
- **ELK Stack**: Log aggregation and analysis
- **Sentry**: Error tracking

---

## Version History

### v1.2.0 (Current)
- ✅ Fixed IN1 segment parsing (insurance fields)
- ✅ Added reinrollment exception detection
- ✅ Improved matching algorithm with insurance change detection
- ✅ Enhanced UI with insurance field display
- ✅ Complete architecture documentation
- ✅ Merged patients modal view

### v1.1.0
- Added probabilistic matching
- Implemented merge functionality
- Enhanced dashboard statistics

### v1.0.0
- Initial release
- Basic HL7 parsing
- Deterministic matching
- Web dashboard

---

## Future Enhancements

### Short-term (Next Release)
- [ ] Add authentication and authorization
- [ ] Implement HTTPS/TLS
- [ ] Add audit logging
- [ ] Export match results to CSV
- [ ] Batch merge operations

### Medium-term
- [ ] Machine learning-based matching
- [ ] Real-time HL7 message streaming
- [ ] Integration with EHR systems
- [ ] Advanced reporting and analytics
- [ ] Mobile-responsive design improvements

### Long-term
- [ ] FHIR API support
- [ ] Multi-facility support
- [ ] Advanced deduplication workflows
- [ ] Integration with Master Patient Index (MPI)
- [ ] Blockchain-based audit trail

---

## Support & Maintenance

### Development Team
- **Lead Developer**: Bob (AI Assistant)
- **Project Owner**: Healthcare IT Team

### Documentation
- Architecture: `/ARCHITECTURE.md`
- API Documentation: `/API.md` (to be created)
- User Guide: `/USER_GUIDE.md` (to be created)
- Deployment Guide: `/DEPLOYMENT.md` (to be created)

### Issue Tracking
- GitHub Issues (if using version control)
- Internal ticketing system

---

## Appendix

### A. HL7 v2.5 Segment Reference
- **MSH**: Message Header
- **EVN**: Event Type
- **PID**: Patient Identification
- **PV1**: Patient Visit
- **IN1**: Insurance
- **DG1**: Diagnosis

### B. Glossary
- **ADT**: Admission, Discharge, Transfer
- **MRN**: Medical Record Number
- **SSN**: Social Security Number
- **PHI**: Protected Health Information
- **HIPAA**: Health Insurance Portability and Accountability Act
- **EHR**: Electronic Health Record
- **MPI**: Master Patient Index

### C. References
- HL7 v2.5 Specification: http://www.hl7.org
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices

---

**Document Version**: 1.0  
**Last Updated**: June 20, 2026  
**Next Review**: September 2026