-- Standalone FHIR Bundle relational schema for hospital-admissions.fhir.json
-- This schema is intentionally separate from the production patient-matching tables.
-- It supports loading the generated FHIR Bundle into normalized PostgreSQL tables
-- while also preserving the original JSON payload for traceability.

DROP SCHEMA IF EXISTS fhir_demo CASCADE;
CREATE SCHEMA fhir_demo;

CREATE TABLE fhir_demo.bundle (
  bundle_id TEXT PRIMARY KEY,
  identifier_system TEXT,
  identifier_value TEXT,
  bundle_type TEXT NOT NULL,
  bundle_timestamp TIMESTAMPTZ,
  raw_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE fhir_demo.organization (
  organization_id TEXT PRIMARY KEY,
  bundle_id TEXT NOT NULL REFERENCES fhir_demo.bundle(bundle_id) ON DELETE CASCADE,
  name TEXT,
  identifier_system TEXT,
  identifier_value TEXT,
  raw_json JSONB NOT NULL
);

CREATE TABLE fhir_demo.patient (
  patient_id TEXT PRIMARY KEY,
  bundle_id TEXT NOT NULL REFERENCES fhir_demo.bundle(bundle_id) ON DELETE CASCADE,
  mrn_system TEXT,
  mrn_value TEXT,
  ssn_system TEXT,
  ssn_value TEXT,
  family_name TEXT,
  given_names TEXT[],
  suffixes TEXT[],
  telecom_phone TEXT,
  gender TEXT,
  birth_date DATE,
  address_line1 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT,
  race_code TEXT,
  race_display TEXT,
  raw_json JSONB NOT NULL
);

CREATE TABLE fhir_demo.practitioner (
  practitioner_id TEXT PRIMARY KEY,
  bundle_id TEXT NOT NULL REFERENCES fhir_demo.bundle(bundle_id) ON DELETE CASCADE,
  npi_system TEXT,
  npi_value TEXT,
  family_name TEXT,
  given_names TEXT[],
  prefixes TEXT[],
  raw_json JSONB NOT NULL
);

CREATE TABLE fhir_demo.coverage (
  coverage_id TEXT PRIMARY KEY,
  bundle_id TEXT NOT NULL REFERENCES fhir_demo.bundle(bundle_id) ON DELETE CASCADE,
  patient_id TEXT NOT NULL REFERENCES fhir_demo.patient(patient_id) ON DELETE CASCADE,
  status TEXT,
  type_text TEXT,
  payor_display TEXT,
  relationship_code TEXT,
  relationship_display TEXT,
  group_value TEXT,
  plan_value TEXT,
  subscriber_id TEXT,
  period_start DATE,
  raw_json JSONB NOT NULL
);

CREATE TABLE fhir_demo.encounter (
  encounter_id TEXT PRIMARY KEY,
  bundle_id TEXT NOT NULL REFERENCES fhir_demo.bundle(bundle_id) ON DELETE CASCADE,
  patient_id TEXT NOT NULL REFERENCES fhir_demo.patient(patient_id) ON DELETE CASCADE,
  organization_id TEXT REFERENCES fhir_demo.organization(organization_id) ON DELETE SET NULL,
  status TEXT,
  class_system TEXT,
  class_code TEXT,
  class_display TEXT,
  type_text TEXT,
  period_start TIMESTAMPTZ,
  location_display TEXT,
  reason_condition_id TEXT,
  raw_json JSONB NOT NULL
);

CREATE TABLE fhir_demo.encounter_participant (
  encounter_id TEXT NOT NULL REFERENCES fhir_demo.encounter(encounter_id) ON DELETE CASCADE,
  practitioner_id TEXT NOT NULL REFERENCES fhir_demo.practitioner(practitioner_id) ON DELETE CASCADE,
  participant_order INTEGER NOT NULL,
  PRIMARY KEY (encounter_id, practitioner_id, participant_order)
);

CREATE TABLE fhir_demo.condition (
  condition_id TEXT PRIMARY KEY,
  bundle_id TEXT NOT NULL REFERENCES fhir_demo.bundle(bundle_id) ON DELETE CASCADE,
  patient_id TEXT NOT NULL REFERENCES fhir_demo.patient(patient_id) ON DELETE CASCADE,
  encounter_id TEXT REFERENCES fhir_demo.encounter(encounter_id) ON DELETE SET NULL,
  clinical_status_code TEXT,
  verification_status_code TEXT,
  category_code TEXT,
  diagnosis_system TEXT,
  diagnosis_code TEXT,
  diagnosis_display TEXT,
  diagnosis_text TEXT,
  onset_datetime TIMESTAMPTZ,
  recorded_date TIMESTAMPTZ,
  raw_json JSONB NOT NULL
);

CREATE TABLE fhir_demo.provenance (
  provenance_id TEXT PRIMARY KEY,
  bundle_id TEXT NOT NULL REFERENCES fhir_demo.bundle(bundle_id) ON DELETE CASCADE,
  recorded TIMESTAMPTZ,
  activity_code TEXT,
  source_identifier_system TEXT,
  source_identifier_value TEXT,
  source_display TEXT,
  raw_json JSONB NOT NULL
);

CREATE TABLE fhir_demo.provenance_target (
  provenance_id TEXT NOT NULL REFERENCES fhir_demo.provenance(provenance_id) ON DELETE CASCADE,
  target_reference TEXT NOT NULL,
  target_order INTEGER NOT NULL,
  PRIMARY KEY (provenance_id, target_order)
);

CREATE INDEX idx_fhir_patient_mrn ON fhir_demo.patient(mrn_value);
CREATE INDEX idx_fhir_patient_ssn ON fhir_demo.patient(ssn_value);
CREATE INDEX idx_fhir_coverage_patient ON fhir_demo.coverage(patient_id);
CREATE INDEX idx_fhir_encounter_patient ON fhir_demo.encounter(patient_id);
CREATE INDEX idx_fhir_condition_patient ON fhir_demo.condition(patient_id);
CREATE INDEX idx_fhir_condition_encounter ON fhir_demo.condition(encounter_id);
CREATE INDEX idx_fhir_provenance_recorded ON fhir_demo.provenance(recorded);

COMMENT ON SCHEMA fhir_demo IS 'Standalone relational schema for loading generated FHIR Bundle JSON from hospital-admissions.fhir.json';
COMMENT ON TABLE fhir_demo.bundle IS 'Top-level FHIR Bundle metadata and raw JSON payload';
COMMENT ON TABLE fhir_demo.patient IS 'FHIR Patient resources normalized from the bundle';
COMMENT ON TABLE fhir_demo.coverage IS 'FHIR Coverage resources linked to Patient';
COMMENT ON TABLE fhir_demo.encounter IS 'FHIR Encounter resources linked to Patient and Organization';
COMMENT ON TABLE fhir_demo.condition IS 'FHIR Condition resources linked to Patient and Encounter';
COMMENT ON TABLE fhir_demo.provenance IS 'FHIR Provenance resources preserving source HL7 traceability';

-- Made with Bob
