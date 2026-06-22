# FHIR JSON to PostgreSQL Validation Report

Standalone validation artifact for business review.

## Scope

- Source FHIR file: `data/hospital-admissions.fhir.json`
- Database schema: `fhir_demo`
- Database container: `hl7-postgres`
- Bundle id: `47e7fc2b-163e-4316-a1c7-0258d5d953e1`
- Bundle type: `collection`
- Bundle timestamp: `2026-06-22T17:20:51Z`
- Patient records reviewed: `100`

## Summary Counts

| Resource/Table | Count |
|---|---:|
| Patient | 100 |
| Practitioner | 200 |
| Coverage | 100 |
| Encounter | 100 |
| Condition | 100 |
| Provenance | 100 |

## Record-by-Record Validation

### MRN000001 - Bashirian, Julianne

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000001` |
| MRN | `MRN000001` |
| SSN | `44900642875` |
| Name | `Bashirian, Julianne Austin` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1945-03-31` |
| Address | `21164 Conn Canyon, Jenkinscester, TX 12684-3551, USA` |
| Phone | `(938) 933-0147` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000001` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Blue Cross Blue Shield` |
| Coverage Group | `` |
| Coverage Plan | `BC001` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000001` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-16T18:43:08Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000001` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-16T18:43:08Z` |
| Recorded Date | `2026-06-16T18:43:08Z` |
| Provenance ID | `provenance-mrn000001` |
| Provenance Recorded | `2026-06-16T18:43:08Z` |
| Source Message Control ID | `MSG000016` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000001` |
| mrn_value | `MRN000001` |
| family_name | `Bashirian` |
| given_names | `['Julianne', 'Austin']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1945-03-31` |
| telecom_phone | `(938) 933-0147` |
| address_line1 | `21164 Conn Canyon` |
| city | `Jenkinscester` |
| state | `TX` |
| postal_code | `12684-3551` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `44900642875` |
| coverage_id | `coverage-mrn000001` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Blue Cross Blue Shield` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `BC001` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000001` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-16T18:43:08+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000001` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-16T18:43:08+00:00` |
| recorded_date | `2026-06-16T18:43:08+00:00` |
| provenance_id | `provenance-mrn000001` |
| provenance_recorded | `2026-06-16T18:43:08+00:00` |
| source_identifier_value | `MSG000016` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000002 - Hoppe, Jacklyn

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000002` |
| MRN | `MRN000002` |
| SSN | `65029317227` |
| Name | `Hoppe, Jacklyn Dakota` |
| Suffix | `JR` |
| Gender | `male` |
| Birth Date | `1939-05-09` |
| Address | `1048 Station Road, Gleasonbury, ID 38471-3465, USA` |
| Phone | `(521) 933-3940` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000002` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000002` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-07T15:06:09Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000002` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-06-07T15:06:09Z` |
| Recorded Date | `2026-06-07T15:06:09Z` |
| Provenance ID | `provenance-mrn000002` |
| Provenance Recorded | `2026-06-07T15:06:09Z` |
| Source Message Control ID | `MSG000017` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000002` |
| mrn_value | `MRN000002` |
| family_name | `Hoppe` |
| given_names | `['Jacklyn', 'Dakota']` |
| suffixes | `['JR']` |
| gender | `male` |
| birth_date | `1939-05-09` |
| telecom_phone | `(521) 933-3940` |
| address_line1 | `1048 Station Road` |
| city | `Gleasonbury` |
| state | `ID` |
| postal_code | `38471-3465` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `65029317227` |
| coverage_id | `coverage-mrn000002` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000002` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-07T15:06:09+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000002` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-06-07T15:06:09+00:00` |
| recorded_date | `2026-06-07T15:06:09+00:00` |
| provenance_id | `provenance-mrn000002` |
| provenance_recorded | `2026-06-07T15:06:09+00:00` |
| source_identifier_value | `MSG000017` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000003 - Boyle, Abbie

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000003` |
| MRN | `MRN000003` |
| SSN | `20542705508` |
| Name | `Boyle, Abbie Harper` |
| Suffix | `JR` |
| Gender | `male` |
| Birth Date | `1975-03-01` |
| Address | `17994 N Park Street, Port Lindsey, KY 19754-9322, USA` |
| Phone | `(428) 567-1419` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000003` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Anthem` |
| Coverage Group | `` |
| Coverage Plan | `AN007` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000003` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-04T02:18:28Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000003` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-06-04T02:18:28Z` |
| Recorded Date | `2026-06-04T02:18:28Z` |
| Provenance ID | `provenance-mrn000003` |
| Provenance Recorded | `2026-06-04T02:18:28Z` |
| Source Message Control ID | `MSG000018` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000003` |
| mrn_value | `MRN000003` |
| family_name | `Boyle` |
| given_names | `['Abbie', 'Harper']` |
| suffixes | `['JR']` |
| gender | `male` |
| birth_date | `1975-03-01` |
| telecom_phone | `(428) 567-1419` |
| address_line1 | `17994 N Park Street` |
| city | `Port Lindsey` |
| state | `KY` |
| postal_code | `19754-9322` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `20542705508` |
| coverage_id | `coverage-mrn000003` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Anthem` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AN007` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000003` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-04T02:18:28+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000003` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-06-04T02:18:28+00:00` |
| recorded_date | `2026-06-04T02:18:28+00:00` |
| provenance_id | `provenance-mrn000003` |
| provenance_recorded | `2026-06-04T02:18:28+00:00` |
| source_identifier_value | `MSG000018` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000004 - Dach, Corbin

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000004` |
| MRN | `MRN000004` |
| SSN | `56286502646` |
| Name | `Dach, Corbin Jules` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1939-01-16` |
| Address | `35903 Murray Passage, Huelcester, TX 16890, USA` |
| Phone | `(920) 831-0711` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000004` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000004` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-01T17:03:01Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000004` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-06-01T17:03:01Z` |
| Recorded Date | `2026-06-01T17:03:01Z` |
| Provenance ID | `provenance-mrn000004` |
| Provenance Recorded | `2026-06-01T17:03:01Z` |
| Source Message Control ID | `MSG000019` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000004` |
| mrn_value | `MRN000004` |
| family_name | `Dach` |
| given_names | `['Corbin', 'Jules']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1939-01-16` |
| telecom_phone | `(920) 831-0711` |
| address_line1 | `35903 Murray Passage` |
| city | `Huelcester` |
| state | `TX` |
| postal_code | `16890` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `56286502646` |
| coverage_id | `coverage-mrn000004` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000004` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-01T17:03:01+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000004` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-06-01T17:03:01+00:00` |
| recorded_date | `2026-06-01T17:03:01+00:00` |
| provenance_id | `provenance-mrn000004` |
| provenance_recorded | `2026-06-01T17:03:01+00:00` |
| source_identifier_value | `MSG000019` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000005 - Swift, Berta

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000005` |
| MRN | `MRN000005` |
| SSN | `95040111580` |
| Name | `Swift, Berta Sage` |
| Suffix | `SR` |
| Gender | `female` |
| Birth Date | `1950-07-16` |
| Address | `37537 Priory Road, Boehmborough, ND 20260-2158, USA` |
| Phone | `(982) 586-7636` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000005` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000005` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-25T02:47:47Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000005` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-05-25T02:47:47Z` |
| Recorded Date | `2026-05-25T02:47:47Z` |
| Provenance ID | `provenance-mrn000005` |
| Provenance Recorded | `2026-05-25T02:47:47Z` |
| Source Message Control ID | `MSG000020` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000005` |
| mrn_value | `MRN000005` |
| family_name | `Swift` |
| given_names | `['Berta', 'Sage']` |
| suffixes | `['SR']` |
| gender | `female` |
| birth_date | `1950-07-16` |
| telecom_phone | `(982) 586-7636` |
| address_line1 | `37537 Priory Road` |
| city | `Boehmborough` |
| state | `ND` |
| postal_code | `20260-2158` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `95040111580` |
| coverage_id | `coverage-mrn000005` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000005` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-25T02:47:47+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000005` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-05-25T02:47:47+00:00` |
| recorded_date | `2026-05-25T02:47:47+00:00` |
| provenance_id | `provenance-mrn000005` |
| provenance_recorded | `2026-05-25T02:47:47+00:00` |
| source_identifier_value | `MSG000020` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000006 - Breitenberg, Angus

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000006` |
| MRN | `MRN000006` |
| SSN | `82461084048` |
| Name | `Breitenberg, Angus Reagan` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1972-02-22` |
| Address | `78560 S College Street, Port Arlie, IA 13585, USA` |
| Phone | `(374) 456-2323` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000006` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000006` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-26T19:51:07Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000006` |
| Diagnosis | `K21.9 - GERD` |
| Diagnosis Text | `GERD` |
| Onset | `2026-05-26T19:51:07Z` |
| Recorded Date | `2026-05-26T19:51:07Z` |
| Provenance ID | `provenance-mrn000006` |
| Provenance Recorded | `2026-05-26T19:51:07Z` |
| Source Message Control ID | `MSG000021` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000006` |
| mrn_value | `MRN000006` |
| family_name | `Breitenberg` |
| given_names | `['Angus', 'Reagan']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1972-02-22` |
| telecom_phone | `(374) 456-2323` |
| address_line1 | `78560 S College Street` |
| city | `Port Arlie` |
| state | `IA` |
| postal_code | `13585` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `82461084048` |
| coverage_id | `coverage-mrn000006` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000006` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-26T19:51:07+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000006` |
| diagnosis_code | `K21.9` |
| diagnosis_display | `GERD` |
| diagnosis_text | `GERD` |
| onset_datetime | `2026-05-26T19:51:07+00:00` |
| recorded_date | `2026-05-26T19:51:07+00:00` |
| provenance_id | `provenance-mrn000006` |
| provenance_recorded | `2026-05-26T19:51:07+00:00` |
| source_identifier_value | `MSG000021` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000007 - Volkman, Kylee

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000007` |
| MRN | `MRN000007` |
| SSN | `69920409616` |
| Name | `Volkman, Kylee James` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `2005-07-09` |
| Address | `4224 Hackett Center, Bufordland, TN 95820-5771, USA` |
| Phone | `(342) 826-5983` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000007` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000007` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-13T15:37:29Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000007` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-13T15:37:29Z` |
| Recorded Date | `2026-06-13T15:37:29Z` |
| Provenance ID | `provenance-mrn000007` |
| Provenance Recorded | `2026-06-13T15:37:29Z` |
| Source Message Control ID | `MSG000022` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000007` |
| mrn_value | `MRN000007` |
| family_name | `Volkman` |
| given_names | `['Kylee', 'James']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `2005-07-09` |
| telecom_phone | `(342) 826-5983` |
| address_line1 | `4224 Hackett Center` |
| city | `Bufordland` |
| state | `TN` |
| postal_code | `95820-5771` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `69920409616` |
| coverage_id | `coverage-mrn000007` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000007` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-13T15:37:29+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000007` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-13T15:37:29+00:00` |
| recorded_date | `2026-06-13T15:37:29+00:00` |
| provenance_id | `provenance-mrn000007` |
| provenance_recorded | `2026-06-13T15:37:29+00:00` |
| source_identifier_value | `MSG000022` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000008 - Dickens, Verla

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000008` |
| MRN | `MRN000008` |
| SSN | `95899724275` |
| Name | `Dickens, Verla Shawn` |
| Suffix | `SR` |
| Gender | `male` |
| Birth Date | `1971-04-11` |
| Address | `9027 Crooks Path, Cassieland, AR 49775, USA` |
| Phone | `(844) 366-4482` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000008` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000008` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-28T20:34:13Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000008` |
| Diagnosis | `M79.3 - Fibromyalgia` |
| Diagnosis Text | `Fibromyalgia` |
| Onset | `2026-05-28T20:34:13Z` |
| Recorded Date | `2026-05-28T20:34:13Z` |
| Provenance ID | `provenance-mrn000008` |
| Provenance Recorded | `2026-05-28T20:34:13Z` |
| Source Message Control ID | `MSG000023` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000008` |
| mrn_value | `MRN000008` |
| family_name | `Dickens` |
| given_names | `['Verla', 'Shawn']` |
| suffixes | `['SR']` |
| gender | `male` |
| birth_date | `1971-04-11` |
| telecom_phone | `(844) 366-4482` |
| address_line1 | `9027 Crooks Path` |
| city | `Cassieland` |
| state | `AR` |
| postal_code | `49775` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `95899724275` |
| coverage_id | `coverage-mrn000008` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000008` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-28T20:34:13+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000008` |
| diagnosis_code | `M79.3` |
| diagnosis_display | `Fibromyalgia` |
| diagnosis_text | `Fibromyalgia` |
| onset_datetime | `2026-05-28T20:34:13+00:00` |
| recorded_date | `2026-05-28T20:34:13+00:00` |
| provenance_id | `provenance-mrn000008` |
| provenance_recorded | `2026-05-28T20:34:13+00:00` |
| source_identifier_value | `MSG000023` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000009 - Feeney, Joelle

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000009` |
| MRN | `MRN000009` |
| SSN | `87857163818` |
| Name | `Feeney, Joelle Shiloh` |
| Suffix | `` |
| Gender | `female` |
| Birth Date | `1971-10-13` |
| Address | `80936 Margaret Stream, West Velda, VA 64863-8553, USA` |
| Phone | `(885) 008-8989` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000009` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000009` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-02T13:37:06Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000009` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-06-02T13:37:06Z` |
| Recorded Date | `2026-06-02T13:37:06Z` |
| Provenance ID | `provenance-mrn000009` |
| Provenance Recorded | `2026-06-02T13:37:06Z` |
| Source Message Control ID | `MSG000024` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000009` |
| mrn_value | `MRN000009` |
| family_name | `Feeney` |
| given_names | `['Joelle', 'Shiloh']` |
| suffixes | `[]` |
| gender | `female` |
| birth_date | `1971-10-13` |
| telecom_phone | `(885) 008-8989` |
| address_line1 | `80936 Margaret Stream` |
| city | `West Velda` |
| state | `VA` |
| postal_code | `64863-8553` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `87857163818` |
| coverage_id | `coverage-mrn000009` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000009` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-02T13:37:06+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000009` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-06-02T13:37:06+00:00` |
| recorded_date | `2026-06-02T13:37:06+00:00` |
| provenance_id | `provenance-mrn000009` |
| provenance_recorded | `2026-06-02T13:37:06+00:00` |
| source_identifier_value | `MSG000024` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000010 - Hane, Sunny

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000010` |
| MRN | `MRN000010` |
| SSN | `21219074076` |
| Name | `Hane, Sunny Jordan` |
| Suffix | `SR` |
| Gender | `male` |
| Birth Date | `1971-03-05` |
| Address | `8835 Washington Road, Ullrichstad, CT 43683, USA` |
| Phone | `(394) 318-2109` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000010` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000010` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T03:29:48Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000010` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-05-21T03:29:48Z` |
| Recorded Date | `2026-05-21T03:29:48Z` |
| Provenance ID | `provenance-mrn000010` |
| Provenance Recorded | `2026-05-21T03:29:48Z` |
| Source Message Control ID | `MSG000025` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000010` |
| mrn_value | `MRN000010` |
| family_name | `Hane` |
| given_names | `['Sunny', 'Jordan']` |
| suffixes | `['SR']` |
| gender | `male` |
| birth_date | `1971-03-05` |
| telecom_phone | `(394) 318-2109` |
| address_line1 | `8835 Washington Road` |
| city | `Ullrichstad` |
| state | `CT` |
| postal_code | `43683` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `21219074076` |
| coverage_id | `coverage-mrn000010` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000010` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T03:29:48+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000010` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-05-21T03:29:48+00:00` |
| recorded_date | `2026-05-21T03:29:48+00:00` |
| provenance_id | `provenance-mrn000010` |
| provenance_recorded | `2026-05-21T03:29:48+00:00` |
| source_identifier_value | `MSG000025` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000011 - Murphy, Jorge

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000011` |
| MRN | `MRN000011` |
| SSN | `45521088265` |
| Name | `Murphy, Jorge Brooklyn` |
| Suffix | `II` |
| Gender | `male` |
| Birth Date | `1964-08-14` |
| Address | `37256 West Street, Lake Josiah, IL 04937, USA` |
| Phone | `(493) 956-2261` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000011` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000011` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-14T19:05:08Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000011` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-06-14T19:05:08Z` |
| Recorded Date | `2026-06-14T19:05:08Z` |
| Provenance ID | `provenance-mrn000011` |
| Provenance Recorded | `2026-06-14T19:05:08Z` |
| Source Message Control ID | `MSG000026` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000011` |
| mrn_value | `MRN000011` |
| family_name | `Murphy` |
| given_names | `['Jorge', 'Brooklyn']` |
| suffixes | `['II']` |
| gender | `male` |
| birth_date | `1964-08-14` |
| telecom_phone | `(493) 956-2261` |
| address_line1 | `37256 West Street` |
| city | `Lake Josiah` |
| state | `IL` |
| postal_code | `04937` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `45521088265` |
| coverage_id | `coverage-mrn000011` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000011` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-14T19:05:08+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000011` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-06-14T19:05:08+00:00` |
| recorded_date | `2026-06-14T19:05:08+00:00` |
| provenance_id | `provenance-mrn000011` |
| provenance_recorded | `2026-06-14T19:05:08+00:00` |
| source_identifier_value | `MSG000026` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000012 - Brown, Shane

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000012` |
| MRN | `MRN000012` |
| SSN | `28354482031` |
| Name | `Brown, Shane Phoenix` |
| Suffix | `SR` |
| Gender | `female` |
| Birth Date | `1986-09-20` |
| Address | `9774 Candelario Lakes, Botsfordbury, VA 59052, USA` |
| Phone | `(327) 609-3014` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000012` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000012` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-09T18:48:42Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000012` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-06-09T18:48:42Z` |
| Recorded Date | `2026-06-09T18:48:42Z` |
| Provenance ID | `provenance-mrn000012` |
| Provenance Recorded | `2026-06-09T18:48:42Z` |
| Source Message Control ID | `MSG000027` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000012` |
| mrn_value | `MRN000012` |
| family_name | `Brown` |
| given_names | `['Shane', 'Phoenix']` |
| suffixes | `['SR']` |
| gender | `female` |
| birth_date | `1986-09-20` |
| telecom_phone | `(327) 609-3014` |
| address_line1 | `9774 Candelario Lakes` |
| city | `Botsfordbury` |
| state | `VA` |
| postal_code | `59052` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `28354482031` |
| coverage_id | `coverage-mrn000012` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000012` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-09T18:48:42+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000012` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-06-09T18:48:42+00:00` |
| recorded_date | `2026-06-09T18:48:42+00:00` |
| provenance_id | `provenance-mrn000012` |
| provenance_recorded | `2026-06-09T18:48:42+00:00` |
| source_identifier_value | `MSG000027` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000013 - Beatty, Jaylen

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000013` |
| MRN | `MRN000013` |
| SSN | `89342075741` |
| Name | `Beatty, Jaylen Cameron` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1950-07-19` |
| Address | `6043 Wolff Knolls, North Ryleyshire, IA 16437-8156, USA` |
| Phone | `(851) 569-6679` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000013` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000013` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-10T09:34:41Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000013` |
| Diagnosis | `M79.3 - Fibromyalgia` |
| Diagnosis Text | `Fibromyalgia` |
| Onset | `2026-06-10T09:34:41Z` |
| Recorded Date | `2026-06-10T09:34:41Z` |
| Provenance ID | `provenance-mrn000013` |
| Provenance Recorded | `2026-06-10T09:34:41Z` |
| Source Message Control ID | `MSG000028` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000013` |
| mrn_value | `MRN000013` |
| family_name | `Beatty` |
| given_names | `['Jaylen', 'Cameron']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1950-07-19` |
| telecom_phone | `(851) 569-6679` |
| address_line1 | `6043 Wolff Knolls` |
| city | `North Ryleyshire` |
| state | `IA` |
| postal_code | `16437-8156` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `89342075741` |
| coverage_id | `coverage-mrn000013` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000013` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-10T09:34:41+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000013` |
| diagnosis_code | `M79.3` |
| diagnosis_display | `Fibromyalgia` |
| diagnosis_text | `Fibromyalgia` |
| onset_datetime | `2026-06-10T09:34:41+00:00` |
| recorded_date | `2026-06-10T09:34:41+00:00` |
| provenance_id | `provenance-mrn000013` |
| provenance_recorded | `2026-06-10T09:34:41+00:00` |
| source_identifier_value | `MSG000028` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000014 - Kozey, Maurice

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000014` |
| MRN | `MRN000014` |
| SSN | `65613706035` |
| Name | `Kozey, Maurice Taylor` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1950-04-01` |
| Address | `82591 Oma Locks, Lake Lora, SC 87176-4184, USA` |
| Phone | `(090) 796-1874` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000014` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000014` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-15T21:58:07Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000014` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-06-15T21:58:07Z` |
| Recorded Date | `2026-06-15T21:58:07Z` |
| Provenance ID | `provenance-mrn000014` |
| Provenance Recorded | `2026-06-15T21:58:07Z` |
| Source Message Control ID | `MSG000029` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000014` |
| mrn_value | `MRN000014` |
| family_name | `Kozey` |
| given_names | `['Maurice', 'Taylor']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1950-04-01` |
| telecom_phone | `(090) 796-1874` |
| address_line1 | `82591 Oma Locks` |
| city | `Lake Lora` |
| state | `SC` |
| postal_code | `87176-4184` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `65613706035` |
| coverage_id | `coverage-mrn000014` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000014` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-15T21:58:07+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000014` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-06-15T21:58:07+00:00` |
| recorded_date | `2026-06-15T21:58:07+00:00` |
| provenance_id | `provenance-mrn000014` |
| provenance_recorded | `2026-06-15T21:58:07+00:00` |
| source_identifier_value | `MSG000029` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000015 - Leannon, Keagan

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000015` |
| MRN | `MRN000015` |
| SSN | `73381282377` |
| Name | `Leannon, Keagan Kennedy` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1978-10-01` |
| Address | `747 Birch Road, Lake Soloncester, TN 10938, USA` |
| Phone | `(194) 267-7370` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000015` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000015` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-09T17:58:08Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000015` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-06-09T17:58:08Z` |
| Recorded Date | `2026-06-09T17:58:08Z` |
| Provenance ID | `provenance-mrn000015` |
| Provenance Recorded | `2026-06-09T17:58:08Z` |
| Source Message Control ID | `MSG000030` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000015` |
| mrn_value | `MRN000015` |
| family_name | `Leannon` |
| given_names | `['Keagan', 'Kennedy']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1978-10-01` |
| telecom_phone | `(194) 267-7370` |
| address_line1 | `747 Birch Road` |
| city | `Lake Soloncester` |
| state | `TN` |
| postal_code | `10938` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `73381282377` |
| coverage_id | `coverage-mrn000015` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000015` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-09T17:58:08+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000015` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-06-09T17:58:08+00:00` |
| recorded_date | `2026-06-09T17:58:08+00:00` |
| provenance_id | `provenance-mrn000015` |
| provenance_recorded | `2026-06-09T17:58:08+00:00` |
| source_identifier_value | `MSG000030` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000016 - Langworth, Cora

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000016` |
| MRN | `MRN000016` |
| SSN | `11422663836` |
| Name | `Langworth, Cora Drew` |
| Suffix | `` |
| Gender | `female` |
| Birth Date | `1989-11-14` |
| Address | `3810 Cemetery Road, Fort Hyman, OK 06465-3182, USA` |
| Phone | `(798) 876-5140` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000016` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000016` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-30T02:08:12Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000016` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-05-30T02:08:12Z` |
| Recorded Date | `2026-05-30T02:08:12Z` |
| Provenance ID | `provenance-mrn000016` |
| Provenance Recorded | `2026-05-30T02:08:12Z` |
| Source Message Control ID | `MSG000031` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000016` |
| mrn_value | `MRN000016` |
| family_name | `Langworth` |
| given_names | `['Cora', 'Drew']` |
| suffixes | `[]` |
| gender | `female` |
| birth_date | `1989-11-14` |
| telecom_phone | `(798) 876-5140` |
| address_line1 | `3810 Cemetery Road` |
| city | `Fort Hyman` |
| state | `OK` |
| postal_code | `06465-3182` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `11422663836` |
| coverage_id | `coverage-mrn000016` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000016` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-30T02:08:12+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000016` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-05-30T02:08:12+00:00` |
| recorded_date | `2026-05-30T02:08:12+00:00` |
| provenance_id | `provenance-mrn000016` |
| provenance_recorded | `2026-05-30T02:08:12+00:00` |
| source_identifier_value | `MSG000031` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000017 - Vandervort, Makenna

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000017` |
| MRN | `MRN000017` |
| SSN | `82677822001` |
| Name | `Vandervort, Makenna Avery` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1987-05-28` |
| Address | `5044 Senger Dam, Fisherburgh, OK 27972, USA` |
| Phone | `(402) 524-7289` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000017` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000017` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-18T09:25:53Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000017` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-18T09:25:53Z` |
| Recorded Date | `2026-06-18T09:25:53Z` |
| Provenance ID | `provenance-mrn000017` |
| Provenance Recorded | `2026-06-18T09:25:53Z` |
| Source Message Control ID | `MSG000032` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000017` |
| mrn_value | `MRN000017` |
| family_name | `Vandervort` |
| given_names | `['Makenna', 'Avery']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1987-05-28` |
| telecom_phone | `(402) 524-7289` |
| address_line1 | `5044 Senger Dam` |
| city | `Fisherburgh` |
| state | `OK` |
| postal_code | `27972` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `82677822001` |
| coverage_id | `coverage-mrn000017` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000017` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-18T09:25:53+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000017` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-18T09:25:53+00:00` |
| recorded_date | `2026-06-18T09:25:53+00:00` |
| provenance_id | `provenance-mrn000017` |
| provenance_recorded | `2026-06-18T09:25:53+00:00` |
| source_identifier_value | `MSG000032` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000018 - Goyette, Ivy

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000018` |
| MRN | `MRN000018` |
| SSN | `88723301467` |
| Name | `Goyette, Ivy Austin` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1988-12-18` |
| Address | `558 Eldora Pines, Westleystad, GA 48442-7533, USA` |
| Phone | `(374) 004-6725` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000018` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000018` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-28T12:11:04Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000018` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-05-28T12:11:04Z` |
| Recorded Date | `2026-05-28T12:11:04Z` |
| Provenance ID | `provenance-mrn000018` |
| Provenance Recorded | `2026-05-28T12:11:04Z` |
| Source Message Control ID | `MSG000033` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000018` |
| mrn_value | `MRN000018` |
| family_name | `Goyette` |
| given_names | `['Ivy', 'Austin']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1988-12-18` |
| telecom_phone | `(374) 004-6725` |
| address_line1 | `558 Eldora Pines` |
| city | `Westleystad` |
| state | `GA` |
| postal_code | `48442-7533` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `88723301467` |
| coverage_id | `coverage-mrn000018` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000018` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-28T12:11:04+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000018` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-05-28T12:11:04+00:00` |
| recorded_date | `2026-05-28T12:11:04+00:00` |
| provenance_id | `provenance-mrn000018` |
| provenance_recorded | `2026-05-28T12:11:04+00:00` |
| source_identifier_value | `MSG000033` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000019 - Stehr, Alice

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000019` |
| MRN | `MRN000019` |
| SSN | `33222669610` |
| Name | `Stehr, Alice Kendall` |
| Suffix | `` |
| Gender | `male` |
| Birth Date | `1964-10-04` |
| Address | `286 Charles Isle, Elmhurst, CO 11515-2935, USA` |
| Phone | `(085) 666-7915` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000019` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000019` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-26T14:42:53Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000019` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-05-26T14:42:53Z` |
| Recorded Date | `2026-05-26T14:42:53Z` |
| Provenance ID | `provenance-mrn000019` |
| Provenance Recorded | `2026-05-26T14:42:53Z` |
| Source Message Control ID | `MSG000034` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000019` |
| mrn_value | `MRN000019` |
| family_name | `Stehr` |
| given_names | `['Alice', 'Kendall']` |
| suffixes | `[]` |
| gender | `male` |
| birth_date | `1964-10-04` |
| telecom_phone | `(085) 666-7915` |
| address_line1 | `286 Charles Isle` |
| city | `Elmhurst` |
| state | `CO` |
| postal_code | `11515-2935` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `33222669610` |
| coverage_id | `coverage-mrn000019` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000019` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-26T14:42:53+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000019` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-05-26T14:42:53+00:00` |
| recorded_date | `2026-05-26T14:42:53+00:00` |
| provenance_id | `provenance-mrn000019` |
| provenance_recorded | `2026-05-26T14:42:53+00:00` |
| source_identifier_value | `MSG000034` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000020 - Frami, Josefa

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000020` |
| MRN | `MRN000020` |
| SSN | `35048261709` |
| Name | `Frami, Josefa River` |
| Suffix | `` |
| Gender | `female` |
| Birth Date | `1974-06-20` |
| Address | `38653 N Washington Avenue, West Devanton, HI 86477, USA` |
| Phone | `(205) 260-5329` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000020` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000020` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-05T10:54:41Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000020` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-06-05T10:54:41Z` |
| Recorded Date | `2026-06-05T10:54:41Z` |
| Provenance ID | `provenance-mrn000020` |
| Provenance Recorded | `2026-06-05T10:54:41Z` |
| Source Message Control ID | `MSG000035` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000020` |
| mrn_value | `MRN000020` |
| family_name | `Frami` |
| given_names | `['Josefa', 'River']` |
| suffixes | `[]` |
| gender | `female` |
| birth_date | `1974-06-20` |
| telecom_phone | `(205) 260-5329` |
| address_line1 | `38653 N Washington Avenue` |
| city | `West Devanton` |
| state | `HI` |
| postal_code | `86477` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `35048261709` |
| coverage_id | `coverage-mrn000020` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000020` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-05T10:54:41+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000020` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-06-05T10:54:41+00:00` |
| recorded_date | `2026-06-05T10:54:41+00:00` |
| provenance_id | `provenance-mrn000020` |
| provenance_recorded | `2026-06-05T10:54:41+00:00` |
| source_identifier_value | `MSG000035` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000021 - Ebert, Zella

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000021` |
| MRN | `MRN000021` |
| SSN | `19609337810` |
| Name | `Ebert, Zella Emerson` |
| Suffix | `JR` |
| Gender | `male` |
| Birth Date | `1940-09-22` |
| Address | `713 Fay Key, Gilbert, IA 06332-9563, USA` |
| Phone | `(472) 523-7758` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000021` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Cigna` |
| Coverage Group | `` |
| Coverage Plan | `CI004` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000021` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-11T10:05:28Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000021` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-11T10:05:28Z` |
| Recorded Date | `2026-06-11T10:05:28Z` |
| Provenance ID | `provenance-mrn000021` |
| Provenance Recorded | `2026-06-11T10:05:28Z` |
| Source Message Control ID | `MSG000036` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000021` |
| mrn_value | `MRN000021` |
| family_name | `Ebert` |
| given_names | `['Zella', 'Emerson']` |
| suffixes | `['JR']` |
| gender | `male` |
| birth_date | `1940-09-22` |
| telecom_phone | `(472) 523-7758` |
| address_line1 | `713 Fay Key` |
| city | `Gilbert` |
| state | `IA` |
| postal_code | `06332-9563` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `19609337810` |
| coverage_id | `coverage-mrn000021` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Cigna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `CI004` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000021` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-11T10:05:28+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000021` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-11T10:05:28+00:00` |
| recorded_date | `2026-06-11T10:05:28+00:00` |
| provenance_id | `provenance-mrn000021` |
| provenance_recorded | `2026-06-11T10:05:28+00:00` |
| source_identifier_value | `MSG000036` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000022 - DuBuque, Catalina

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000022` |
| MRN | `MRN000022` |
| SSN | `85176846769` |
| Name | `DuBuque, Catalina Hayden` |
| Suffix | `III` |
| Gender | `female` |
| Birth Date | `1955-05-21` |
| Address | `51759 Nathanael Parkway, Rebekahhaven, OK 66753-0236, USA` |
| Phone | `(720) 350-4581` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000022` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Anthem` |
| Coverage Group | `` |
| Coverage Plan | `AN007` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000022` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T19:03:43Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000022` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-05-21T19:03:43Z` |
| Recorded Date | `2026-05-21T19:03:43Z` |
| Provenance ID | `provenance-mrn000022` |
| Provenance Recorded | `2026-05-21T19:03:43Z` |
| Source Message Control ID | `MSG000037` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000022` |
| mrn_value | `MRN000022` |
| family_name | `DuBuque` |
| given_names | `['Catalina', 'Hayden']` |
| suffixes | `['III']` |
| gender | `female` |
| birth_date | `1955-05-21` |
| telecom_phone | `(720) 350-4581` |
| address_line1 | `51759 Nathanael Parkway` |
| city | `Rebekahhaven` |
| state | `OK` |
| postal_code | `66753-0236` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `85176846769` |
| coverage_id | `coverage-mrn000022` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Anthem` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AN007` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000022` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T19:03:43+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000022` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-05-21T19:03:43+00:00` |
| recorded_date | `2026-05-21T19:03:43+00:00` |
| provenance_id | `provenance-mrn000022` |
| provenance_recorded | `2026-05-21T19:03:43+00:00` |
| source_identifier_value | `MSG000037` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000023 - Wolff, Kaitlyn

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000023` |
| MRN | `MRN000023` |
| SSN | `55802852031` |
| Name | `Wolff, Kaitlyn Finley` |
| Suffix | `JR` |
| Gender | `male` |
| Birth Date | `1961-04-16` |
| Address | `902 E Market Street, Lake Susanberg, ND 80964, USA` |
| Phone | `(780) 028-5663` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000023` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000023` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-15T14:52:40Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000023` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-15T14:52:40Z` |
| Recorded Date | `2026-06-15T14:52:40Z` |
| Provenance ID | `provenance-mrn000023` |
| Provenance Recorded | `2026-06-15T14:52:40Z` |
| Source Message Control ID | `MSG000038` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000023` |
| mrn_value | `MRN000023` |
| family_name | `Wolff` |
| given_names | `['Kaitlyn', 'Finley']` |
| suffixes | `['JR']` |
| gender | `male` |
| birth_date | `1961-04-16` |
| telecom_phone | `(780) 028-5663` |
| address_line1 | `902 E Market Street` |
| city | `Lake Susanberg` |
| state | `ND` |
| postal_code | `80964` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `55802852031` |
| coverage_id | `coverage-mrn000023` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000023` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-15T14:52:40+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000023` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-15T14:52:40+00:00` |
| recorded_date | `2026-06-15T14:52:40+00:00` |
| provenance_id | `provenance-mrn000023` |
| provenance_recorded | `2026-06-15T14:52:40+00:00` |
| source_identifier_value | `MSG000038` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000024 - Bergstrom, Norval

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000024` |
| MRN | `MRN000024` |
| SSN | `19572149905` |
| Name | `Bergstrom, Norval Reagan` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1969-03-06` |
| Address | `57268 Hosea Fords, Port Mohammed, AR 45879-3538, USA` |
| Phone | `(888) 000-6750` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000024` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000024` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-04T21:05:38Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000024` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-04T21:05:38Z` |
| Recorded Date | `2026-06-04T21:05:38Z` |
| Provenance ID | `provenance-mrn000024` |
| Provenance Recorded | `2026-06-04T21:05:38Z` |
| Source Message Control ID | `MSG000039` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000024` |
| mrn_value | `MRN000024` |
| family_name | `Bergstrom` |
| given_names | `['Norval', 'Reagan']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1969-03-06` |
| telecom_phone | `(888) 000-6750` |
| address_line1 | `57268 Hosea Fords` |
| city | `Port Mohammed` |
| state | `AR` |
| postal_code | `45879-3538` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `19572149905` |
| coverage_id | `coverage-mrn000024` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000024` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-04T21:05:38+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000024` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-04T21:05:38+00:00` |
| recorded_date | `2026-06-04T21:05:38+00:00` |
| provenance_id | `provenance-mrn000024` |
| provenance_recorded | `2026-06-04T21:05:38+00:00` |
| source_identifier_value | `MSG000039` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000025 - Greenholt, Mireille

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000025` |
| MRN | `MRN000025` |
| SSN | `42060184737` |
| Name | `Greenholt, Mireille Phoenix` |
| Suffix | `` |
| Gender | `male` |
| Birth Date | `1976-04-07` |
| Address | `2471 Frontage Road, Lake Elroyland, WA 83391-3586, USA` |
| Phone | `(881) 959-1807` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000025` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000025` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-22T05:50:26Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000025` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-05-22T05:50:26Z` |
| Recorded Date | `2026-05-22T05:50:26Z` |
| Provenance ID | `provenance-mrn000025` |
| Provenance Recorded | `2026-05-22T05:50:26Z` |
| Source Message Control ID | `MSG000040` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000025` |
| mrn_value | `MRN000025` |
| family_name | `Greenholt` |
| given_names | `['Mireille', 'Phoenix']` |
| suffixes | `[]` |
| gender | `male` |
| birth_date | `1976-04-07` |
| telecom_phone | `(881) 959-1807` |
| address_line1 | `2471 Frontage Road` |
| city | `Lake Elroyland` |
| state | `WA` |
| postal_code | `83391-3586` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `42060184737` |
| coverage_id | `coverage-mrn000025` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000025` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-22T05:50:26+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000025` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-05-22T05:50:26+00:00` |
| recorded_date | `2026-05-22T05:50:26+00:00` |
| provenance_id | `provenance-mrn000025` |
| provenance_recorded | `2026-05-22T05:50:26+00:00` |
| source_identifier_value | `MSG000040` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000026 - Treutel, Lonzo

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000026` |
| MRN | `MRN000026` |
| SSN | `69240046280` |
| Name | `Treutel, Lonzo Addison` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1990-03-08` |
| Address | `764 E 9th Street, North Gabestead, WI 77163, USA` |
| Phone | `(975) 647-7617` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000026` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000026` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-28T11:13:46Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000026` |
| Diagnosis | `M79.3 - Fibromyalgia` |
| Diagnosis Text | `Fibromyalgia` |
| Onset | `2026-05-28T11:13:46Z` |
| Recorded Date | `2026-05-28T11:13:46Z` |
| Provenance ID | `provenance-mrn000026` |
| Provenance Recorded | `2026-05-28T11:13:46Z` |
| Source Message Control ID | `MSG000041` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000026` |
| mrn_value | `MRN000026` |
| family_name | `Treutel` |
| given_names | `['Lonzo', 'Addison']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1990-03-08` |
| telecom_phone | `(975) 647-7617` |
| address_line1 | `764 E 9th Street` |
| city | `North Gabestead` |
| state | `WI` |
| postal_code | `77163` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `69240046280` |
| coverage_id | `coverage-mrn000026` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000026` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-28T11:13:46+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000026` |
| diagnosis_code | `M79.3` |
| diagnosis_display | `Fibromyalgia` |
| diagnosis_text | `Fibromyalgia` |
| onset_datetime | `2026-05-28T11:13:46+00:00` |
| recorded_date | `2026-05-28T11:13:46+00:00` |
| provenance_id | `provenance-mrn000026` |
| provenance_recorded | `2026-05-28T11:13:46+00:00` |
| source_identifier_value | `MSG000041` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000027 - Koss-Crooks, Amir

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000027` |
| MRN | `MRN000027` |
| SSN | `29258056453` |
| Name | `Koss-Crooks, Amir Marlowe` |
| Suffix | `JR` |
| Gender | `male` |
| Birth Date | `1951-12-28` |
| Address | `81587 Predovic Shore, Gorczanyworth, SC 19068, USA` |
| Phone | `(931) 275-6002` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000027` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Blue Cross Blue Shield` |
| Coverage Group | `` |
| Coverage Plan | `BC001` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000027` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-22T02:58:11Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000027` |
| Diagnosis | `M79.3 - Fibromyalgia` |
| Diagnosis Text | `Fibromyalgia` |
| Onset | `2026-05-22T02:58:11Z` |
| Recorded Date | `2026-05-22T02:58:11Z` |
| Provenance ID | `provenance-mrn000027` |
| Provenance Recorded | `2026-05-22T02:58:11Z` |
| Source Message Control ID | `MSG000042` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000027` |
| mrn_value | `MRN000027` |
| family_name | `Koss-Crooks` |
| given_names | `['Amir', 'Marlowe']` |
| suffixes | `['JR']` |
| gender | `male` |
| birth_date | `1951-12-28` |
| telecom_phone | `(931) 275-6002` |
| address_line1 | `81587 Predovic Shore` |
| city | `Gorczanyworth` |
| state | `SC` |
| postal_code | `19068` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `29258056453` |
| coverage_id | `coverage-mrn000027` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Blue Cross Blue Shield` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `BC001` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000027` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-22T02:58:11+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000027` |
| diagnosis_code | `M79.3` |
| diagnosis_display | `Fibromyalgia` |
| diagnosis_text | `Fibromyalgia` |
| onset_datetime | `2026-05-22T02:58:11+00:00` |
| recorded_date | `2026-05-22T02:58:11+00:00` |
| provenance_id | `provenance-mrn000027` |
| provenance_recorded | `2026-05-22T02:58:11+00:00` |
| source_identifier_value | `MSG000042` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000028 - Schmidt, Abe

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000028` |
| MRN | `MRN000028` |
| SSN | `69231350379` |
| Name | `Schmidt, Abe Kennedy` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1959-01-31` |
| Address | `85423 Armstrong Streets, Fort Mariannacester, NM 62575-9770, USA` |
| Phone | `(186) 042-4301` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000028` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Anthem` |
| Coverage Group | `` |
| Coverage Plan | `AN007` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000028` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-11T09:41:56Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000028` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-06-11T09:41:56Z` |
| Recorded Date | `2026-06-11T09:41:56Z` |
| Provenance ID | `provenance-mrn000028` |
| Provenance Recorded | `2026-06-11T09:41:56Z` |
| Source Message Control ID | `MSG000043` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000028` |
| mrn_value | `MRN000028` |
| family_name | `Schmidt` |
| given_names | `['Abe', 'Kennedy']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1959-01-31` |
| telecom_phone | `(186) 042-4301` |
| address_line1 | `85423 Armstrong Streets` |
| city | `Fort Mariannacester` |
| state | `NM` |
| postal_code | `62575-9770` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `69231350379` |
| coverage_id | `coverage-mrn000028` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Anthem` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AN007` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000028` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-11T09:41:56+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000028` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-06-11T09:41:56+00:00` |
| recorded_date | `2026-06-11T09:41:56+00:00` |
| provenance_id | `provenance-mrn000028` |
| provenance_recorded | `2026-06-11T09:41:56+00:00` |
| source_identifier_value | `MSG000043` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000029 - Daugherty, Armani

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000029` |
| MRN | `MRN000029` |
| SSN | `84883577821` |
| Name | `Daugherty, Armani Austin` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1959-04-25` |
| Address | `34569 The Mount, Port Agnes, AK 85050-2819, USA` |
| Phone | `(845) 371-2281` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000029` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Blue Cross Blue Shield` |
| Coverage Group | `` |
| Coverage Plan | `BC001` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000029` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-08T08:14:13Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000029` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-06-08T08:14:13Z` |
| Recorded Date | `2026-06-08T08:14:13Z` |
| Provenance ID | `provenance-mrn000029` |
| Provenance Recorded | `2026-06-08T08:14:13Z` |
| Source Message Control ID | `MSG000044` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000029` |
| mrn_value | `MRN000029` |
| family_name | `Daugherty` |
| given_names | `['Armani', 'Austin']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1959-04-25` |
| telecom_phone | `(845) 371-2281` |
| address_line1 | `34569 The Mount` |
| city | `Port Agnes` |
| state | `AK` |
| postal_code | `85050-2819` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `84883577821` |
| coverage_id | `coverage-mrn000029` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Blue Cross Blue Shield` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `BC001` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000029` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-08T08:14:13+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000029` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-06-08T08:14:13+00:00` |
| recorded_date | `2026-06-08T08:14:13+00:00` |
| provenance_id | `provenance-mrn000029` |
| provenance_recorded | `2026-06-08T08:14:13+00:00` |
| source_identifier_value | `MSG000044` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000030 - Murphy, Melvina

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000030` |
| MRN | `MRN000030` |
| SSN | `39194892360` |
| Name | `Murphy, Melvina Quinn` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `2005-09-19` |
| Address | `8528 Wilderman Radial, Port Lauretta, VT 15556-9569, USA` |
| Phone | `(116) 129-3941` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000030` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000030` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-06T16:58:19Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000030` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-06-06T16:58:19Z` |
| Recorded Date | `2026-06-06T16:58:19Z` |
| Provenance ID | `provenance-mrn000030` |
| Provenance Recorded | `2026-06-06T16:58:19Z` |
| Source Message Control ID | `MSG000045` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000030` |
| mrn_value | `MRN000030` |
| family_name | `Murphy` |
| given_names | `['Melvina', 'Quinn']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `2005-09-19` |
| telecom_phone | `(116) 129-3941` |
| address_line1 | `8528 Wilderman Radial` |
| city | `Port Lauretta` |
| state | `VT` |
| postal_code | `15556-9569` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `39194892360` |
| coverage_id | `coverage-mrn000030` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000030` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-06T16:58:19+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000030` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-06-06T16:58:19+00:00` |
| recorded_date | `2026-06-06T16:58:19+00:00` |
| provenance_id | `provenance-mrn000030` |
| provenance_recorded | `2026-06-06T16:58:19+00:00` |
| source_identifier_value | `MSG000045` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000031 - Weber, Clay

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000031` |
| MRN | `MRN000031` |
| SSN | `04226190189` |
| Name | `Weber, Clay Parker` |
| Suffix | `SR` |
| Gender | `female` |
| Birth Date | `1990-06-21` |
| Address | `4242 9th Street, Schmidtside, NV 81067-4655, USA` |
| Phone | `(121) 422-2440` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000031` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000031` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-28T16:02:24Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000031` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-05-28T16:02:24Z` |
| Recorded Date | `2026-05-28T16:02:24Z` |
| Provenance ID | `provenance-mrn000031` |
| Provenance Recorded | `2026-05-28T16:02:24Z` |
| Source Message Control ID | `MSG000046` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000031` |
| mrn_value | `MRN000031` |
| family_name | `Weber` |
| given_names | `['Clay', 'Parker']` |
| suffixes | `['SR']` |
| gender | `female` |
| birth_date | `1990-06-21` |
| telecom_phone | `(121) 422-2440` |
| address_line1 | `4242 9th Street` |
| city | `Schmidtside` |
| state | `NV` |
| postal_code | `81067-4655` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `04226190189` |
| coverage_id | `coverage-mrn000031` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000031` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-28T16:02:24+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000031` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-05-28T16:02:24+00:00` |
| recorded_date | `2026-05-28T16:02:24+00:00` |
| provenance_id | `provenance-mrn000031` |
| provenance_recorded | `2026-05-28T16:02:24+00:00` |
| source_identifier_value | `MSG000046` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000032 - Streich, Laurence

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000032` |
| MRN | `MRN000032` |
| SSN | `80007943714` |
| Name | `Streich, Laurence Taylor` |
| Suffix | `` |
| Gender | `female` |
| Birth Date | `1953-06-10` |
| Address | `34579 Yasmine Glens, South Ezrafield, NY 62315-7156, USA` |
| Phone | `(092) 207-3209` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000032` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000032` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-31T09:31:32Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000032` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-05-31T09:31:32Z` |
| Recorded Date | `2026-05-31T09:31:32Z` |
| Provenance ID | `provenance-mrn000032` |
| Provenance Recorded | `2026-05-31T09:31:32Z` |
| Source Message Control ID | `MSG000047` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000032` |
| mrn_value | `MRN000032` |
| family_name | `Streich` |
| given_names | `['Laurence', 'Taylor']` |
| suffixes | `[]` |
| gender | `female` |
| birth_date | `1953-06-10` |
| telecom_phone | `(092) 207-3209` |
| address_line1 | `34579 Yasmine Glens` |
| city | `South Ezrafield` |
| state | `NY` |
| postal_code | `62315-7156` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `80007943714` |
| coverage_id | `coverage-mrn000032` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000032` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-31T09:31:32+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000032` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-05-31T09:31:32+00:00` |
| recorded_date | `2026-05-31T09:31:32+00:00` |
| provenance_id | `provenance-mrn000032` |
| provenance_recorded | `2026-05-31T09:31:32+00:00` |
| source_identifier_value | `MSG000047` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000033 - Lebsack, Leanna

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000033` |
| MRN | `MRN000033` |
| SSN | `08638395965` |
| Name | `Lebsack, Leanna Micah` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1981-09-27` |
| Address | `141 16th Street, Alexisborough, WV 65579-0018, USA` |
| Phone | `(459) 526-3034` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000033` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Anthem` |
| Coverage Group | `` |
| Coverage Plan | `AN007` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000033` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-05T05:54:58Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000033` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-05T05:54:58Z` |
| Recorded Date | `2026-06-05T05:54:58Z` |
| Provenance ID | `provenance-mrn000033` |
| Provenance Recorded | `2026-06-05T05:54:58Z` |
| Source Message Control ID | `MSG000048` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000033` |
| mrn_value | `MRN000033` |
| family_name | `Lebsack` |
| given_names | `['Leanna', 'Micah']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1981-09-27` |
| telecom_phone | `(459) 526-3034` |
| address_line1 | `141 16th Street` |
| city | `Alexisborough` |
| state | `WV` |
| postal_code | `65579-0018` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `08638395965` |
| coverage_id | `coverage-mrn000033` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Anthem` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AN007` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000033` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-05T05:54:58+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000033` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-05T05:54:58+00:00` |
| recorded_date | `2026-06-05T05:54:58+00:00` |
| provenance_id | `provenance-mrn000033` |
| provenance_recorded | `2026-06-05T05:54:58+00:00` |
| source_identifier_value | `MSG000048` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000034 - Schuster, Hillard

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000034` |
| MRN | `MRN000034` |
| SSN | `58665819448` |
| Name | `Schuster, Hillard Finley` |
| Suffix | `III` |
| Gender | `female` |
| Birth Date | `1999-03-08` |
| Address | `3928 Mount Street, Zboncakton, WI 31851-4984, USA` |
| Phone | `(940) 360-6052` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000034` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Anthem` |
| Coverage Group | `` |
| Coverage Plan | `AN007` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000034` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-07T05:42:02Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000034` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-06-07T05:42:02Z` |
| Recorded Date | `2026-06-07T05:42:02Z` |
| Provenance ID | `provenance-mrn000034` |
| Provenance Recorded | `2026-06-07T05:42:02Z` |
| Source Message Control ID | `MSG000049` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000034` |
| mrn_value | `MRN000034` |
| family_name | `Schuster` |
| given_names | `['Hillard', 'Finley']` |
| suffixes | `['III']` |
| gender | `female` |
| birth_date | `1999-03-08` |
| telecom_phone | `(940) 360-6052` |
| address_line1 | `3928 Mount Street` |
| city | `Zboncakton` |
| state | `WI` |
| postal_code | `31851-4984` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `58665819448` |
| coverage_id | `coverage-mrn000034` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Anthem` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AN007` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000034` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-07T05:42:02+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000034` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-06-07T05:42:02+00:00` |
| recorded_date | `2026-06-07T05:42:02+00:00` |
| provenance_id | `provenance-mrn000034` |
| provenance_recorded | `2026-06-07T05:42:02+00:00` |
| source_identifier_value | `MSG000049` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000035 - Hodkiewicz, Obie

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000035` |
| MRN | `MRN000035` |
| SSN | `17909169795` |
| Name | `Hodkiewicz, Obie Rory` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1958-07-05` |
| Address | `86298 Parisian Landing, Moenshire, MD 40909-2950, USA` |
| Phone | `(583) 474-1545` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000035` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000035` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-10T23:50:37Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000035` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-06-10T23:50:37Z` |
| Recorded Date | `2026-06-10T23:50:37Z` |
| Provenance ID | `provenance-mrn000035` |
| Provenance Recorded | `2026-06-10T23:50:37Z` |
| Source Message Control ID | `MSG000050` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000035` |
| mrn_value | `MRN000035` |
| family_name | `Hodkiewicz` |
| given_names | `['Obie', 'Rory']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1958-07-05` |
| telecom_phone | `(583) 474-1545` |
| address_line1 | `86298 Parisian Landing` |
| city | `Moenshire` |
| state | `MD` |
| postal_code | `40909-2950` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `17909169795` |
| coverage_id | `coverage-mrn000035` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000035` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-10T23:50:37+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000035` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-06-10T23:50:37+00:00` |
| recorded_date | `2026-06-10T23:50:37+00:00` |
| provenance_id | `provenance-mrn000035` |
| provenance_recorded | `2026-06-10T23:50:37+00:00` |
| source_identifier_value | `MSG000050` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000036 - Kozey, Kaycee

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000036` |
| MRN | `MRN000036` |
| SSN | `54706275760` |
| Name | `Kozey, Kaycee Shiloh` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1994-09-29` |
| Address | `5619 Donnelly Extensions, Lenexa, RI 87639, USA` |
| Phone | `(638) 579-8685` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000036` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000036` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-10T00:08:38Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000036` |
| Diagnosis | `M79.3 - Fibromyalgia` |
| Diagnosis Text | `Fibromyalgia` |
| Onset | `2026-06-10T00:08:38Z` |
| Recorded Date | `2026-06-10T00:08:38Z` |
| Provenance ID | `provenance-mrn000036` |
| Provenance Recorded | `2026-06-10T00:08:38Z` |
| Source Message Control ID | `MSG000051` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000036` |
| mrn_value | `MRN000036` |
| family_name | `Kozey` |
| given_names | `['Kaycee', 'Shiloh']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1994-09-29` |
| telecom_phone | `(638) 579-8685` |
| address_line1 | `5619 Donnelly Extensions` |
| city | `Lenexa` |
| state | `RI` |
| postal_code | `87639` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `54706275760` |
| coverage_id | `coverage-mrn000036` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000036` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-10T00:08:38+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000036` |
| diagnosis_code | `M79.3` |
| diagnosis_display | `Fibromyalgia` |
| diagnosis_text | `Fibromyalgia` |
| onset_datetime | `2026-06-10T00:08:38+00:00` |
| recorded_date | `2026-06-10T00:08:38+00:00` |
| provenance_id | `provenance-mrn000036` |
| provenance_recorded | `2026-06-10T00:08:38+00:00` |
| source_identifier_value | `MSG000051` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000037 - Braun, Theresa

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000037` |
| MRN | `MRN000037` |
| SSN | `93848539148` |
| Name | `Braun, Theresa Robin` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1982-08-24` |
| Address | `746 Clemmie Course, Port Carlottabury, RI 28593-7464, USA` |
| Phone | `(490) 359-4818` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000037` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000037` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-14T09:05:14Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000037` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-06-14T09:05:14Z` |
| Recorded Date | `2026-06-14T09:05:14Z` |
| Provenance ID | `provenance-mrn000037` |
| Provenance Recorded | `2026-06-14T09:05:14Z` |
| Source Message Control ID | `MSG000052` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000037` |
| mrn_value | `MRN000037` |
| family_name | `Braun` |
| given_names | `['Theresa', 'Robin']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1982-08-24` |
| telecom_phone | `(490) 359-4818` |
| address_line1 | `746 Clemmie Course` |
| city | `Port Carlottabury` |
| state | `RI` |
| postal_code | `28593-7464` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `93848539148` |
| coverage_id | `coverage-mrn000037` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000037` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-14T09:05:14+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000037` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-06-14T09:05:14+00:00` |
| recorded_date | `2026-06-14T09:05:14+00:00` |
| provenance_id | `provenance-mrn000037` |
| provenance_recorded | `2026-06-14T09:05:14+00:00` |
| source_identifier_value | `MSG000052` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000038 - Haag, Cecilia

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000038` |
| MRN | `MRN000038` |
| SSN | `24348218233` |
| Name | `Haag, Cecilia Brooklyn` |
| Suffix | `` |
| Gender | `male` |
| Birth Date | `2006-09-03` |
| Address | `613 Jaden Squares, Nathanfield, IN 77364, USA` |
| Phone | `(693) 124-8260` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000038` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000038` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-22T23:52:11Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000038` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-05-22T23:52:11Z` |
| Recorded Date | `2026-05-22T23:52:11Z` |
| Provenance ID | `provenance-mrn000038` |
| Provenance Recorded | `2026-05-22T23:52:11Z` |
| Source Message Control ID | `MSG000053` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000038` |
| mrn_value | `MRN000038` |
| family_name | `Haag` |
| given_names | `['Cecilia', 'Brooklyn']` |
| suffixes | `[]` |
| gender | `male` |
| birth_date | `2006-09-03` |
| telecom_phone | `(693) 124-8260` |
| address_line1 | `613 Jaden Squares` |
| city | `Nathanfield` |
| state | `IN` |
| postal_code | `77364` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `24348218233` |
| coverage_id | `coverage-mrn000038` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000038` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-22T23:52:11+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000038` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-05-22T23:52:11+00:00` |
| recorded_date | `2026-05-22T23:52:11+00:00` |
| provenance_id | `provenance-mrn000038` |
| provenance_recorded | `2026-05-22T23:52:11+00:00` |
| source_identifier_value | `MSG000053` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000039 - Denesik-Waelchi, Jolie

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000039` |
| MRN | `MRN000039` |
| SSN | `47104264233` |
| Name | `Denesik-Waelchi, Jolie Drew` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `2001-03-26` |
| Address | `989 Breitenberg Harbor, Schillerstead, DE 57547, USA` |
| Phone | `(203) 671-2802` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000039` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000039` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-15T22:48:37Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000039` |
| Diagnosis | `M79.3 - Fibromyalgia` |
| Diagnosis Text | `Fibromyalgia` |
| Onset | `2026-06-15T22:48:37Z` |
| Recorded Date | `2026-06-15T22:48:37Z` |
| Provenance ID | `provenance-mrn000039` |
| Provenance Recorded | `2026-06-15T22:48:37Z` |
| Source Message Control ID | `MSG000054` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000039` |
| mrn_value | `MRN000039` |
| family_name | `Denesik-Waelchi` |
| given_names | `['Jolie', 'Drew']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `2001-03-26` |
| telecom_phone | `(203) 671-2802` |
| address_line1 | `989 Breitenberg Harbor` |
| city | `Schillerstead` |
| state | `DE` |
| postal_code | `57547` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `47104264233` |
| coverage_id | `coverage-mrn000039` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000039` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-15T22:48:37+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000039` |
| diagnosis_code | `M79.3` |
| diagnosis_display | `Fibromyalgia` |
| diagnosis_text | `Fibromyalgia` |
| onset_datetime | `2026-06-15T22:48:37+00:00` |
| recorded_date | `2026-06-15T22:48:37+00:00` |
| provenance_id | `provenance-mrn000039` |
| provenance_recorded | `2026-06-15T22:48:37+00:00` |
| source_identifier_value | `MSG000054` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000040 - Pouros, Flo

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000040` |
| MRN | `MRN000040` |
| SSN | `15039031385` |
| Name | `Pouros, Flo Austin` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1939-05-27` |
| Address | `9173 The Square, North Dax, ID 96512-5606, USA` |
| Phone | `(152) 839-5455` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000040` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000040` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T22:39:27Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000040` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-05-21T22:39:27Z` |
| Recorded Date | `2026-05-21T22:39:27Z` |
| Provenance ID | `provenance-mrn000040` |
| Provenance Recorded | `2026-05-21T22:39:27Z` |
| Source Message Control ID | `MSG000055` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000040` |
| mrn_value | `MRN000040` |
| family_name | `Pouros` |
| given_names | `['Flo', 'Austin']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1939-05-27` |
| telecom_phone | `(152) 839-5455` |
| address_line1 | `9173 The Square` |
| city | `North Dax` |
| state | `ID` |
| postal_code | `96512-5606` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `15039031385` |
| coverage_id | `coverage-mrn000040` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000040` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T22:39:27+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000040` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-05-21T22:39:27+00:00` |
| recorded_date | `2026-05-21T22:39:27+00:00` |
| provenance_id | `provenance-mrn000040` |
| provenance_recorded | `2026-05-21T22:39:27+00:00` |
| source_identifier_value | `MSG000055` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000041 - Schuppe, Madge

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000041` |
| MRN | `MRN000041` |
| SSN | `64695703214` |
| Name | `Schuppe, Madge Arden` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1958-09-28` |
| Address | `468 Doyle Village, Wesley Chapel, NM 72722, USA` |
| Phone | `(998) 997-7059` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000041` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Blue Cross Blue Shield` |
| Coverage Group | `` |
| Coverage Plan | `BC001` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000041` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-05T21:11:33Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000041` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-05T21:11:33Z` |
| Recorded Date | `2026-06-05T21:11:33Z` |
| Provenance ID | `provenance-mrn000041` |
| Provenance Recorded | `2026-06-05T21:11:33Z` |
| Source Message Control ID | `MSG000056` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000041` |
| mrn_value | `MRN000041` |
| family_name | `Schuppe` |
| given_names | `['Madge', 'Arden']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1958-09-28` |
| telecom_phone | `(998) 997-7059` |
| address_line1 | `468 Doyle Village` |
| city | `Wesley Chapel` |
| state | `NM` |
| postal_code | `72722` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `64695703214` |
| coverage_id | `coverage-mrn000041` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Blue Cross Blue Shield` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `BC001` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000041` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-05T21:11:33+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000041` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-05T21:11:33+00:00` |
| recorded_date | `2026-06-05T21:11:33+00:00` |
| provenance_id | `provenance-mrn000041` |
| provenance_recorded | `2026-06-05T21:11:33+00:00` |
| source_identifier_value | `MSG000056` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000042 - Cummings, Nedra

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000042` |
| MRN | `MRN000042` |
| SSN | `59829606488` |
| Name | `Cummings, Nedra Shawn` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1948-04-06` |
| Address | `790 N Jackson Street, Fort Destin, WY 08650-9856, USA` |
| Phone | `(324) 380-6586` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000042` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000042` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-26T04:07:10Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000042` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-05-26T04:07:10Z` |
| Recorded Date | `2026-05-26T04:07:10Z` |
| Provenance ID | `provenance-mrn000042` |
| Provenance Recorded | `2026-05-26T04:07:10Z` |
| Source Message Control ID | `MSG000057` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000042` |
| mrn_value | `MRN000042` |
| family_name | `Cummings` |
| given_names | `['Nedra', 'Shawn']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1948-04-06` |
| telecom_phone | `(324) 380-6586` |
| address_line1 | `790 N Jackson Street` |
| city | `Fort Destin` |
| state | `WY` |
| postal_code | `08650-9856` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `59829606488` |
| coverage_id | `coverage-mrn000042` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000042` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-26T04:07:10+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000042` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-05-26T04:07:10+00:00` |
| recorded_date | `2026-05-26T04:07:10+00:00` |
| provenance_id | `provenance-mrn000042` |
| provenance_recorded | `2026-05-26T04:07:10+00:00` |
| source_identifier_value | `MSG000057` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000043 - Balistreri, Angelo

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000043` |
| MRN | `MRN000043` |
| SSN | `16371306467` |
| Name | `Balistreri, Angelo Jaden` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1976-07-31` |
| Address | `61737 W 1st Street, Muellerview, WV 51093-6175, USA` |
| Phone | `(755) 500-0377` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000043` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000043` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-08T02:50:53Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000043` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-08T02:50:53Z` |
| Recorded Date | `2026-06-08T02:50:53Z` |
| Provenance ID | `provenance-mrn000043` |
| Provenance Recorded | `2026-06-08T02:50:53Z` |
| Source Message Control ID | `MSG000058` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000043` |
| mrn_value | `MRN000043` |
| family_name | `Balistreri` |
| given_names | `['Angelo', 'Jaden']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1976-07-31` |
| telecom_phone | `(755) 500-0377` |
| address_line1 | `61737 W 1st Street` |
| city | `Muellerview` |
| state | `WV` |
| postal_code | `51093-6175` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `16371306467` |
| coverage_id | `coverage-mrn000043` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000043` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-08T02:50:53+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000043` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-08T02:50:53+00:00` |
| recorded_date | `2026-06-08T02:50:53+00:00` |
| provenance_id | `provenance-mrn000043` |
| provenance_recorded | `2026-06-08T02:50:53+00:00` |
| source_identifier_value | `MSG000058` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000044 - Bahringer, Stanford

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000044` |
| MRN | `MRN000044` |
| SSN | `29504627004` |
| Name | `Bahringer, Stanford Reign` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1952-02-28` |
| Address | `492 Cambridge Street, San Marcos, IN 14494-5975, USA` |
| Phone | `(330) 209-2611` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000044` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000044` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-17T07:00:20Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000044` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-06-17T07:00:20Z` |
| Recorded Date | `2026-06-17T07:00:20Z` |
| Provenance ID | `provenance-mrn000044` |
| Provenance Recorded | `2026-06-17T07:00:20Z` |
| Source Message Control ID | `MSG000059` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000044` |
| mrn_value | `MRN000044` |
| family_name | `Bahringer` |
| given_names | `['Stanford', 'Reign']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1952-02-28` |
| telecom_phone | `(330) 209-2611` |
| address_line1 | `492 Cambridge Street` |
| city | `San Marcos` |
| state | `IN` |
| postal_code | `14494-5975` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `29504627004` |
| coverage_id | `coverage-mrn000044` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000044` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-17T07:00:20+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000044` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-06-17T07:00:20+00:00` |
| recorded_date | `2026-06-17T07:00:20+00:00` |
| provenance_id | `provenance-mrn000044` |
| provenance_recorded | `2026-06-17T07:00:20+00:00` |
| source_identifier_value | `MSG000059` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000045 - Lindgren, Jerry

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000045` |
| MRN | `MRN000045` |
| SSN | `85083231920` |
| Name | `Lindgren, Jerry Kennedy` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1977-09-11` |
| Address | `85012 Wren Close, Port Travonport, NJ 83336, USA` |
| Phone | `(286) 729-5445` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000045` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000045` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-04T15:23:25Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000045` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-06-04T15:23:25Z` |
| Recorded Date | `2026-06-04T15:23:25Z` |
| Provenance ID | `provenance-mrn000045` |
| Provenance Recorded | `2026-06-04T15:23:25Z` |
| Source Message Control ID | `MSG000060` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000045` |
| mrn_value | `MRN000045` |
| family_name | `Lindgren` |
| given_names | `['Jerry', 'Kennedy']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1977-09-11` |
| telecom_phone | `(286) 729-5445` |
| address_line1 | `85012 Wren Close` |
| city | `Port Travonport` |
| state | `NJ` |
| postal_code | `83336` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `85083231920` |
| coverage_id | `coverage-mrn000045` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000045` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-04T15:23:25+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000045` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-06-04T15:23:25+00:00` |
| recorded_date | `2026-06-04T15:23:25+00:00` |
| provenance_id | `provenance-mrn000045` |
| provenance_recorded | `2026-06-04T15:23:25+00:00` |
| source_identifier_value | `MSG000060` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000046 - Kulas, Daisy

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000046` |
| MRN | `MRN000046` |
| SSN | `74590802537` |
| Name | `Kulas, Daisy Ellis` |
| Suffix | `SR` |
| Gender | `female` |
| Birth Date | `1960-05-29` |
| Address | `7233 Jacobi Terrace, Coeur d'Alene, MN 01451, USA` |
| Phone | `(399) 012-1165` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000046` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000046` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-13T10:09:12Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000046` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-06-13T10:09:12Z` |
| Recorded Date | `2026-06-13T10:09:12Z` |
| Provenance ID | `provenance-mrn000046` |
| Provenance Recorded | `2026-06-13T10:09:12Z` |
| Source Message Control ID | `MSG000061` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000046` |
| mrn_value | `MRN000046` |
| family_name | `Kulas` |
| given_names | `['Daisy', 'Ellis']` |
| suffixes | `['SR']` |
| gender | `female` |
| birth_date | `1960-05-29` |
| telecom_phone | `(399) 012-1165` |
| address_line1 | `7233 Jacobi Terrace` |
| city | `Coeur d'Alene` |
| state | `MN` |
| postal_code | `01451` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `74590802537` |
| coverage_id | `coverage-mrn000046` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000046` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-13T10:09:12+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000046` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-06-13T10:09:12+00:00` |
| recorded_date | `2026-06-13T10:09:12+00:00` |
| provenance_id | `provenance-mrn000046` |
| provenance_recorded | `2026-06-13T10:09:12+00:00` |
| source_identifier_value | `MSG000061` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000047 - Kunze, Ruthie

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000047` |
| MRN | `MRN000047` |
| SSN | `23491783106` |
| Name | `Kunze, Ruthie Marlowe` |
| Suffix | `SR` |
| Gender | `male` |
| Birth Date | `1974-09-20` |
| Address | `13164 Kiehn Radial, Garland, IL 87035-8906, USA` |
| Phone | `(927) 830-1285` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000047` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000047` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T22:20:25Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000047` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-05-21T22:20:25Z` |
| Recorded Date | `2026-05-21T22:20:25Z` |
| Provenance ID | `provenance-mrn000047` |
| Provenance Recorded | `2026-05-21T22:20:25Z` |
| Source Message Control ID | `MSG000062` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000047` |
| mrn_value | `MRN000047` |
| family_name | `Kunze` |
| given_names | `['Ruthie', 'Marlowe']` |
| suffixes | `['SR']` |
| gender | `male` |
| birth_date | `1974-09-20` |
| telecom_phone | `(927) 830-1285` |
| address_line1 | `13164 Kiehn Radial` |
| city | `Garland` |
| state | `IL` |
| postal_code | `87035-8906` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `23491783106` |
| coverage_id | `coverage-mrn000047` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000047` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T22:20:25+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000047` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-05-21T22:20:25+00:00` |
| recorded_date | `2026-05-21T22:20:25+00:00` |
| provenance_id | `provenance-mrn000047` |
| provenance_recorded | `2026-05-21T22:20:25+00:00` |
| source_identifier_value | `MSG000062` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000048 - Hammes, Cristian

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000048` |
| MRN | `MRN000048` |
| SSN | `29859182691` |
| Name | `Hammes, Cristian Skyler` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1974-09-04` |
| Address | `7851 Commercial Street, Bergnaumberg, RI 34420, USA` |
| Phone | `(370) 415-2956` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000048` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000048` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-24T16:28:08Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000048` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-05-24T16:28:08Z` |
| Recorded Date | `2026-05-24T16:28:08Z` |
| Provenance ID | `provenance-mrn000048` |
| Provenance Recorded | `2026-05-24T16:28:08Z` |
| Source Message Control ID | `MSG000063` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000048` |
| mrn_value | `MRN000048` |
| family_name | `Hammes` |
| given_names | `['Cristian', 'Skyler']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1974-09-04` |
| telecom_phone | `(370) 415-2956` |
| address_line1 | `7851 Commercial Street` |
| city | `Bergnaumberg` |
| state | `RI` |
| postal_code | `34420` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `29859182691` |
| coverage_id | `coverage-mrn000048` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000048` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-24T16:28:08+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000048` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-05-24T16:28:08+00:00` |
| recorded_date | `2026-05-24T16:28:08+00:00` |
| provenance_id | `provenance-mrn000048` |
| provenance_recorded | `2026-05-24T16:28:08+00:00` |
| source_identifier_value | `MSG000063` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000049 - Pacocha, Myrtie

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000049` |
| MRN | `MRN000049` |
| SSN | `20384261415` |
| Name | `Pacocha, Myrtie Marlowe` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1947-12-25` |
| Address | `185 Dion Inlet, Fort Loganhaven, KY 07584, USA` |
| Phone | `(269) 736-3754` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000049` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000049` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-25T03:35:43Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000049` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-05-25T03:35:43Z` |
| Recorded Date | `2026-05-25T03:35:43Z` |
| Provenance ID | `provenance-mrn000049` |
| Provenance Recorded | `2026-05-25T03:35:43Z` |
| Source Message Control ID | `MSG000064` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000049` |
| mrn_value | `MRN000049` |
| family_name | `Pacocha` |
| given_names | `['Myrtie', 'Marlowe']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1947-12-25` |
| telecom_phone | `(269) 736-3754` |
| address_line1 | `185 Dion Inlet` |
| city | `Fort Loganhaven` |
| state | `KY` |
| postal_code | `07584` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `20384261415` |
| coverage_id | `coverage-mrn000049` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000049` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-25T03:35:43+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000049` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-05-25T03:35:43+00:00` |
| recorded_date | `2026-05-25T03:35:43+00:00` |
| provenance_id | `provenance-mrn000049` |
| provenance_recorded | `2026-05-25T03:35:43+00:00` |
| source_identifier_value | `MSG000064` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000050 - Schuster, Octavia

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000050` |
| MRN | `MRN000050` |
| SSN | `20688647164` |
| Name | `Schuster, Octavia Skyler` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1959-07-16` |
| Address | `65986 Alexander Road, North Casper, DE 14238, USA` |
| Phone | `(541) 632-9007` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000050` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000050` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-10T04:50:07Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000050` |
| Diagnosis | `K21.9 - GERD` |
| Diagnosis Text | `GERD` |
| Onset | `2026-06-10T04:50:07Z` |
| Recorded Date | `2026-06-10T04:50:07Z` |
| Provenance ID | `provenance-mrn000050` |
| Provenance Recorded | `2026-06-10T04:50:07Z` |
| Source Message Control ID | `MSG000065` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000050` |
| mrn_value | `MRN000050` |
| family_name | `Schuster` |
| given_names | `['Octavia', 'Skyler']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1959-07-16` |
| telecom_phone | `(541) 632-9007` |
| address_line1 | `65986 Alexander Road` |
| city | `North Casper` |
| state | `DE` |
| postal_code | `14238` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `20688647164` |
| coverage_id | `coverage-mrn000050` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000050` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-10T04:50:07+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000050` |
| diagnosis_code | `K21.9` |
| diagnosis_display | `GERD` |
| diagnosis_text | `GERD` |
| onset_datetime | `2026-06-10T04:50:07+00:00` |
| recorded_date | `2026-06-10T04:50:07+00:00` |
| provenance_id | `provenance-mrn000050` |
| provenance_recorded | `2026-06-10T04:50:07+00:00` |
| source_identifier_value | `MSG000065` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000051 - Hauck, Lavada

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000051` |
| MRN | `MRN000051` |
| SSN | `63073813779` |
| Name | `Hauck, Lavada Jaden` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1949-02-28` |
| Address | `6793 Thiel Orchard, Jonesbury, OK 28519-4923, USA` |
| Phone | `(162) 272-9604` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000051` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000051` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-31T14:29:49Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000051` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-05-31T14:29:49Z` |
| Recorded Date | `2026-05-31T14:29:49Z` |
| Provenance ID | `provenance-mrn000051` |
| Provenance Recorded | `2026-05-31T14:29:49Z` |
| Source Message Control ID | `MSG000066` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000051` |
| mrn_value | `MRN000051` |
| family_name | `Hauck` |
| given_names | `['Lavada', 'Jaden']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1949-02-28` |
| telecom_phone | `(162) 272-9604` |
| address_line1 | `6793 Thiel Orchard` |
| city | `Jonesbury` |
| state | `OK` |
| postal_code | `28519-4923` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `63073813779` |
| coverage_id | `coverage-mrn000051` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000051` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-31T14:29:49+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000051` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-05-31T14:29:49+00:00` |
| recorded_date | `2026-05-31T14:29:49+00:00` |
| provenance_id | `provenance-mrn000051` |
| provenance_recorded | `2026-05-31T14:29:49+00:00` |
| source_identifier_value | `MSG000066` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000052 - Oberbrunner, Christelle

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000052` |
| MRN | `MRN000052` |
| SSN | `60887168950` |
| Name | `Oberbrunner, Christelle Billie` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1959-01-25` |
| Address | `42188 N Maple Street, Janesville, CT 46336, USA` |
| Phone | `(080) 639-9650` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000052` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000052` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-24T08:35:50Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000052` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-05-24T08:35:50Z` |
| Recorded Date | `2026-05-24T08:35:50Z` |
| Provenance ID | `provenance-mrn000052` |
| Provenance Recorded | `2026-05-24T08:35:50Z` |
| Source Message Control ID | `MSG000067` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000052` |
| mrn_value | `MRN000052` |
| family_name | `Oberbrunner` |
| given_names | `['Christelle', 'Billie']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1959-01-25` |
| telecom_phone | `(080) 639-9650` |
| address_line1 | `42188 N Maple Street` |
| city | `Janesville` |
| state | `CT` |
| postal_code | `46336` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `60887168950` |
| coverage_id | `coverage-mrn000052` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000052` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-24T08:35:50+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000052` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-05-24T08:35:50+00:00` |
| recorded_date | `2026-05-24T08:35:50+00:00` |
| provenance_id | `provenance-mrn000052` |
| provenance_recorded | `2026-05-24T08:35:50+00:00` |
| source_identifier_value | `MSG000067` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000053 - Huel, Melyssa

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000053` |
| MRN | `MRN000053` |
| SSN | `93129202600` |
| Name | `Huel, Melyssa Sasha` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1998-03-18` |
| Address | `18227 Moss Lane, New Lizeth, MS 34594-3453, USA` |
| Phone | `(593) 172-4555` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000053` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Cigna` |
| Coverage Group | `` |
| Coverage Plan | `CI004` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000053` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-02T00:56:04Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000053` |
| Diagnosis | `M79.3 - Fibromyalgia` |
| Diagnosis Text | `Fibromyalgia` |
| Onset | `2026-06-02T00:56:04Z` |
| Recorded Date | `2026-06-02T00:56:04Z` |
| Provenance ID | `provenance-mrn000053` |
| Provenance Recorded | `2026-06-02T00:56:04Z` |
| Source Message Control ID | `MSG000068` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000053` |
| mrn_value | `MRN000053` |
| family_name | `Huel` |
| given_names | `['Melyssa', 'Sasha']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1998-03-18` |
| telecom_phone | `(593) 172-4555` |
| address_line1 | `18227 Moss Lane` |
| city | `New Lizeth` |
| state | `MS` |
| postal_code | `34594-3453` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `93129202600` |
| coverage_id | `coverage-mrn000053` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Cigna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `CI004` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000053` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-02T00:56:04+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000053` |
| diagnosis_code | `M79.3` |
| diagnosis_display | `Fibromyalgia` |
| diagnosis_text | `Fibromyalgia` |
| onset_datetime | `2026-06-02T00:56:04+00:00` |
| recorded_date | `2026-06-02T00:56:04+00:00` |
| provenance_id | `provenance-mrn000053` |
| provenance_recorded | `2026-06-02T00:56:04+00:00` |
| source_identifier_value | `MSG000068` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000054 - Mohr, Caleb

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000054` |
| MRN | `MRN000054` |
| SSN | `89472314083` |
| Name | `Mohr, Caleb Anderson` |
| Suffix | `` |
| Gender | `male` |
| Birth Date | `1981-05-04` |
| Address | `90984 Donavon Views, Erdmanfurt, VA 28018-9602, USA` |
| Phone | `(238) 407-7954` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000054` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000054` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-02T11:20:19Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000054` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-02T11:20:19Z` |
| Recorded Date | `2026-06-02T11:20:19Z` |
| Provenance ID | `provenance-mrn000054` |
| Provenance Recorded | `2026-06-02T11:20:19Z` |
| Source Message Control ID | `MSG000069` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000054` |
| mrn_value | `MRN000054` |
| family_name | `Mohr` |
| given_names | `['Caleb', 'Anderson']` |
| suffixes | `[]` |
| gender | `male` |
| birth_date | `1981-05-04` |
| telecom_phone | `(238) 407-7954` |
| address_line1 | `90984 Donavon Views` |
| city | `Erdmanfurt` |
| state | `VA` |
| postal_code | `28018-9602` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `89472314083` |
| coverage_id | `coverage-mrn000054` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000054` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-02T11:20:19+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000054` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-02T11:20:19+00:00` |
| recorded_date | `2026-06-02T11:20:19+00:00` |
| provenance_id | `provenance-mrn000054` |
| provenance_recorded | `2026-06-02T11:20:19+00:00` |
| source_identifier_value | `MSG000069` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000055 - Greenholt, Justina

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000055` |
| MRN | `MRN000055` |
| SSN | `52835777023` |
| Name | `Greenholt, Justina Kai` |
| Suffix | `II` |
| Gender | `male` |
| Birth Date | `1964-05-06` |
| Address | `16390 Armstrong Trace, Lindsayport, DE 75653-7825, USA` |
| Phone | `(854) 669-4724` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000055` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000055` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T15:27:24Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000055` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-05-21T15:27:24Z` |
| Recorded Date | `2026-05-21T15:27:24Z` |
| Provenance ID | `provenance-mrn000055` |
| Provenance Recorded | `2026-05-21T15:27:24Z` |
| Source Message Control ID | `MSG000070` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000055` |
| mrn_value | `MRN000055` |
| family_name | `Greenholt` |
| given_names | `['Justina', 'Kai']` |
| suffixes | `['II']` |
| gender | `male` |
| birth_date | `1964-05-06` |
| telecom_phone | `(854) 669-4724` |
| address_line1 | `16390 Armstrong Trace` |
| city | `Lindsayport` |
| state | `DE` |
| postal_code | `75653-7825` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `52835777023` |
| coverage_id | `coverage-mrn000055` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000055` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T15:27:24+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000055` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-05-21T15:27:24+00:00` |
| recorded_date | `2026-05-21T15:27:24+00:00` |
| provenance_id | `provenance-mrn000055` |
| provenance_recorded | `2026-05-21T15:27:24+00:00` |
| source_identifier_value | `MSG000070` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000056 - Rowe, Brandon

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000056` |
| MRN | `MRN000056` |
| SSN | `87340533193` |
| Name | `Rowe, Brandon Kendall` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1953-01-24` |
| Address | `4741 S Washington Avenue, Florissant, MD 73255, USA` |
| Phone | `(559) 487-8128` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000056` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Cigna` |
| Coverage Group | `` |
| Coverage Plan | `CI004` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000056` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-19T01:24:53Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000056` |
| Diagnosis | `M79.3 - Fibromyalgia` |
| Diagnosis Text | `Fibromyalgia` |
| Onset | `2026-06-19T01:24:53Z` |
| Recorded Date | `2026-06-19T01:24:53Z` |
| Provenance ID | `provenance-mrn000056` |
| Provenance Recorded | `2026-06-19T01:24:53Z` |
| Source Message Control ID | `MSG000071` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000056` |
| mrn_value | `MRN000056` |
| family_name | `Rowe` |
| given_names | `['Brandon', 'Kendall']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1953-01-24` |
| telecom_phone | `(559) 487-8128` |
| address_line1 | `4741 S Washington Avenue` |
| city | `Florissant` |
| state | `MD` |
| postal_code | `73255` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `87340533193` |
| coverage_id | `coverage-mrn000056` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Cigna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `CI004` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000056` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-19T01:24:53+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000056` |
| diagnosis_code | `M79.3` |
| diagnosis_display | `Fibromyalgia` |
| diagnosis_text | `Fibromyalgia` |
| onset_datetime | `2026-06-19T01:24:53+00:00` |
| recorded_date | `2026-06-19T01:24:53+00:00` |
| provenance_id | `provenance-mrn000056` |
| provenance_recorded | `2026-06-19T01:24:53+00:00` |
| source_identifier_value | `MSG000071` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000057 - Wilkinson, Travon

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000057` |
| MRN | `MRN000057` |
| SSN | `21781930892` |
| Name | `Wilkinson, Travon Finley` |
| Suffix | `SR` |
| Gender | `male` |
| Birth Date | `1969-08-06` |
| Address | `7832 Vallie Village, Colleenchester, VA 55745-3409, USA` |
| Phone | `(756) 523-9808` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000057` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Kaiser Permanente` |
| Coverage Group | `` |
| Coverage Plan | `KP006` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000057` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-16T01:28:28Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000057` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-06-16T01:28:28Z` |
| Recorded Date | `2026-06-16T01:28:28Z` |
| Provenance ID | `provenance-mrn000057` |
| Provenance Recorded | `2026-06-16T01:28:28Z` |
| Source Message Control ID | `MSG000072` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000057` |
| mrn_value | `MRN000057` |
| family_name | `Wilkinson` |
| given_names | `['Travon', 'Finley']` |
| suffixes | `['SR']` |
| gender | `male` |
| birth_date | `1969-08-06` |
| telecom_phone | `(756) 523-9808` |
| address_line1 | `7832 Vallie Village` |
| city | `Colleenchester` |
| state | `VA` |
| postal_code | `55745-3409` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `21781930892` |
| coverage_id | `coverage-mrn000057` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Kaiser Permanente` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `KP006` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000057` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-16T01:28:28+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000057` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-06-16T01:28:28+00:00` |
| recorded_date | `2026-06-16T01:28:28+00:00` |
| provenance_id | `provenance-mrn000057` |
| provenance_recorded | `2026-06-16T01:28:28+00:00` |
| source_identifier_value | `MSG000072` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000058 - Dach, Lora

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000058` |
| MRN | `MRN000058` |
| SSN | `93796860693` |
| Name | `Dach, Lora August` |
| Suffix | `SR` |
| Gender | `male` |
| Birth Date | `1975-01-03` |
| Address | `517 Nicolas Crossroad, Binghamton, OK 52887, USA` |
| Phone | `(268) 070-6923` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000058` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Kaiser Permanente` |
| Coverage Group | `` |
| Coverage Plan | `KP006` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000058` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-23T18:11:03Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000058` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-05-23T18:11:03Z` |
| Recorded Date | `2026-05-23T18:11:03Z` |
| Provenance ID | `provenance-mrn000058` |
| Provenance Recorded | `2026-05-23T18:11:03Z` |
| Source Message Control ID | `MSG000073` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000058` |
| mrn_value | `MRN000058` |
| family_name | `Dach` |
| given_names | `['Lora', 'August']` |
| suffixes | `['SR']` |
| gender | `male` |
| birth_date | `1975-01-03` |
| telecom_phone | `(268) 070-6923` |
| address_line1 | `517 Nicolas Crossroad` |
| city | `Binghamton` |
| state | `OK` |
| postal_code | `52887` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `93796860693` |
| coverage_id | `coverage-mrn000058` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Kaiser Permanente` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `KP006` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000058` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-23T18:11:03+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000058` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-05-23T18:11:03+00:00` |
| recorded_date | `2026-05-23T18:11:03+00:00` |
| provenance_id | `provenance-mrn000058` |
| provenance_recorded | `2026-05-23T18:11:03+00:00` |
| source_identifier_value | `MSG000073` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000059 - Emmerich, Mariela

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000059` |
| MRN | `MRN000059` |
| SSN | `17631443339` |
| Name | `Emmerich, Mariela North` |
| Suffix | `III` |
| Gender | `female` |
| Birth Date | `1988-01-31` |
| Address | `7013 Bluebell Close, Victoria, GA 68771, USA` |
| Phone | `(141) 651-7866` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000059` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000059` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-11T11:43:00Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000059` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-06-11T11:43:00Z` |
| Recorded Date | `2026-06-11T11:43:00Z` |
| Provenance ID | `provenance-mrn000059` |
| Provenance Recorded | `2026-06-11T11:43:00Z` |
| Source Message Control ID | `MSG000074` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000059` |
| mrn_value | `MRN000059` |
| family_name | `Emmerich` |
| given_names | `['Mariela', 'North']` |
| suffixes | `['III']` |
| gender | `female` |
| birth_date | `1988-01-31` |
| telecom_phone | `(141) 651-7866` |
| address_line1 | `7013 Bluebell Close` |
| city | `Victoria` |
| state | `GA` |
| postal_code | `68771` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `17631443339` |
| coverage_id | `coverage-mrn000059` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000059` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-11T11:43:00+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000059` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-06-11T11:43:00+00:00` |
| recorded_date | `2026-06-11T11:43:00+00:00` |
| provenance_id | `provenance-mrn000059` |
| provenance_recorded | `2026-06-11T11:43:00+00:00` |
| source_identifier_value | `MSG000074` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000060 - Barrows, Felipe

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000060` |
| MRN | `MRN000060` |
| SSN | `90650479300` |
| Name | `Barrows, Felipe Sawyer` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1986-05-06` |
| Address | `259 Theodora Ferry, Ortizside, MN 09865, USA` |
| Phone | `(828) 684-8386` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000060` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000060` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-07T10:31:26Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000060` |
| Diagnosis | `K21.9 - GERD` |
| Diagnosis Text | `GERD` |
| Onset | `2026-06-07T10:31:26Z` |
| Recorded Date | `2026-06-07T10:31:26Z` |
| Provenance ID | `provenance-mrn000060` |
| Provenance Recorded | `2026-06-07T10:31:26Z` |
| Source Message Control ID | `MSG000075` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000060` |
| mrn_value | `MRN000060` |
| family_name | `Barrows` |
| given_names | `['Felipe', 'Sawyer']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1986-05-06` |
| telecom_phone | `(828) 684-8386` |
| address_line1 | `259 Theodora Ferry` |
| city | `Ortizside` |
| state | `MN` |
| postal_code | `09865` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `90650479300` |
| coverage_id | `coverage-mrn000060` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000060` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-07T10:31:26+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000060` |
| diagnosis_code | `K21.9` |
| diagnosis_display | `GERD` |
| diagnosis_text | `GERD` |
| onset_datetime | `2026-06-07T10:31:26+00:00` |
| recorded_date | `2026-06-07T10:31:26+00:00` |
| provenance_id | `provenance-mrn000060` |
| provenance_recorded | `2026-06-07T10:31:26+00:00` |
| source_identifier_value | `MSG000075` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000061 - Nienow, Marilou

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000061` |
| MRN | `MRN000061` |
| SSN | `09350697187` |
| Name | `Nienow, Marilou Taylor` |
| Suffix | `SR` |
| Gender | `male` |
| Birth Date | `1965-04-28` |
| Address | `7717 Manuel Stravenue, Dejaburgh, OH 45929-0622, USA` |
| Phone | `(777) 330-6310` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000061` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Anthem` |
| Coverage Group | `` |
| Coverage Plan | `AN007` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000061` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T13:48:28Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000061` |
| Diagnosis | `K21.9 - GERD` |
| Diagnosis Text | `GERD` |
| Onset | `2026-05-21T13:48:28Z` |
| Recorded Date | `2026-05-21T13:48:28Z` |
| Provenance ID | `provenance-mrn000061` |
| Provenance Recorded | `2026-05-21T13:48:28Z` |
| Source Message Control ID | `MSG000076` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000061` |
| mrn_value | `MRN000061` |
| family_name | `Nienow` |
| given_names | `['Marilou', 'Taylor']` |
| suffixes | `['SR']` |
| gender | `male` |
| birth_date | `1965-04-28` |
| telecom_phone | `(777) 330-6310` |
| address_line1 | `7717 Manuel Stravenue` |
| city | `Dejaburgh` |
| state | `OH` |
| postal_code | `45929-0622` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `09350697187` |
| coverage_id | `coverage-mrn000061` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Anthem` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AN007` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000061` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T13:48:28+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000061` |
| diagnosis_code | `K21.9` |
| diagnosis_display | `GERD` |
| diagnosis_text | `GERD` |
| onset_datetime | `2026-05-21T13:48:28+00:00` |
| recorded_date | `2026-05-21T13:48:28+00:00` |
| provenance_id | `provenance-mrn000061` |
| provenance_recorded | `2026-05-21T13:48:28+00:00` |
| source_identifier_value | `MSG000076` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000062 - Sauer, Philip

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000062` |
| MRN | `MRN000062` |
| SSN | `02344374191` |
| Name | `Sauer, Philip River` |
| Suffix | `` |
| Gender | `male` |
| Birth Date | `1967-12-29` |
| Address | `7541 Osborne Path, Twin Falls, FL 10258-5585, USA` |
| Phone | `(384) 616-8770` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000062` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Anthem` |
| Coverage Group | `` |
| Coverage Plan | `AN007` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000062` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-14T17:41:56Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000062` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-06-14T17:41:56Z` |
| Recorded Date | `2026-06-14T17:41:56Z` |
| Provenance ID | `provenance-mrn000062` |
| Provenance Recorded | `2026-06-14T17:41:56Z` |
| Source Message Control ID | `MSG000077` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000062` |
| mrn_value | `MRN000062` |
| family_name | `Sauer` |
| given_names | `['Philip', 'River']` |
| suffixes | `[]` |
| gender | `male` |
| birth_date | `1967-12-29` |
| telecom_phone | `(384) 616-8770` |
| address_line1 | `7541 Osborne Path` |
| city | `Twin Falls` |
| state | `FL` |
| postal_code | `10258-5585` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `02344374191` |
| coverage_id | `coverage-mrn000062` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Anthem` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AN007` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000062` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-14T17:41:56+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000062` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-06-14T17:41:56+00:00` |
| recorded_date | `2026-06-14T17:41:56+00:00` |
| provenance_id | `provenance-mrn000062` |
| provenance_recorded | `2026-06-14T17:41:56+00:00` |
| source_identifier_value | `MSG000077` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000063 - Keebler, Aric

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000063` |
| MRN | `MRN000063` |
| SSN | `68018944503` |
| Name | `Keebler, Aric Gray` |
| Suffix | `` |
| Gender | `female` |
| Birth Date | `1987-10-19` |
| Address | `97568 Chapel Close, Fort Harmonyfurt, NY 65965-9414, USA` |
| Phone | `(995) 318-0659` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000063` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Kaiser Permanente` |
| Coverage Group | `` |
| Coverage Plan | `KP006` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000063` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-08T12:06:02Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000063` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-06-08T12:06:02Z` |
| Recorded Date | `2026-06-08T12:06:02Z` |
| Provenance ID | `provenance-mrn000063` |
| Provenance Recorded | `2026-06-08T12:06:02Z` |
| Source Message Control ID | `MSG000078` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000063` |
| mrn_value | `MRN000063` |
| family_name | `Keebler` |
| given_names | `['Aric', 'Gray']` |
| suffixes | `[]` |
| gender | `female` |
| birth_date | `1987-10-19` |
| telecom_phone | `(995) 318-0659` |
| address_line1 | `97568 Chapel Close` |
| city | `Fort Harmonyfurt` |
| state | `NY` |
| postal_code | `65965-9414` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `68018944503` |
| coverage_id | `coverage-mrn000063` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Kaiser Permanente` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `KP006` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000063` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-08T12:06:02+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000063` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-06-08T12:06:02+00:00` |
| recorded_date | `2026-06-08T12:06:02+00:00` |
| provenance_id | `provenance-mrn000063` |
| provenance_recorded | `2026-06-08T12:06:02+00:00` |
| source_identifier_value | `MSG000078` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000064 - Emmerich, Emory

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000064` |
| MRN | `MRN000064` |
| SSN | `89938204100` |
| Name | `Emmerich, Emory Bailey` |
| Suffix | `SR` |
| Gender | `male` |
| Birth Date | `1986-09-15` |
| Address | `8011 The Coppice, Port Carolestead, MA 09182, USA` |
| Phone | `(222) 647-5760` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000064` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Cigna` |
| Coverage Group | `` |
| Coverage Plan | `CI004` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000064` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-18T17:47:05Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000064` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-06-18T17:47:05Z` |
| Recorded Date | `2026-06-18T17:47:05Z` |
| Provenance ID | `provenance-mrn000064` |
| Provenance Recorded | `2026-06-18T17:47:05Z` |
| Source Message Control ID | `MSG000079` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000064` |
| mrn_value | `MRN000064` |
| family_name | `Emmerich` |
| given_names | `['Emory', 'Bailey']` |
| suffixes | `['SR']` |
| gender | `male` |
| birth_date | `1986-09-15` |
| telecom_phone | `(222) 647-5760` |
| address_line1 | `8011 The Coppice` |
| city | `Port Carolestead` |
| state | `MA` |
| postal_code | `09182` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `89938204100` |
| coverage_id | `coverage-mrn000064` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Cigna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `CI004` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000064` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-18T17:47:05+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000064` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-06-18T17:47:05+00:00` |
| recorded_date | `2026-06-18T17:47:05+00:00` |
| provenance_id | `provenance-mrn000064` |
| provenance_recorded | `2026-06-18T17:47:05+00:00` |
| source_identifier_value | `MSG000079` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000065 - Haley, Wilhelmine

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000065` |
| MRN | `MRN000065` |
| SSN | `64312647122` |
| Name | `Haley, Wilhelmine Jaden` |
| Suffix | `JR` |
| Gender | `male` |
| Birth Date | `1951-11-12` |
| Address | `47906 Kaitlin Center, Weberborough, KY 59027-4080, USA` |
| Phone | `(287) 214-7723` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000065` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000065` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-08T16:03:28Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000065` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-06-08T16:03:28Z` |
| Recorded Date | `2026-06-08T16:03:28Z` |
| Provenance ID | `provenance-mrn000065` |
| Provenance Recorded | `2026-06-08T16:03:28Z` |
| Source Message Control ID | `MSG000080` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000065` |
| mrn_value | `MRN000065` |
| family_name | `Haley` |
| given_names | `['Wilhelmine', 'Jaden']` |
| suffixes | `['JR']` |
| gender | `male` |
| birth_date | `1951-11-12` |
| telecom_phone | `(287) 214-7723` |
| address_line1 | `47906 Kaitlin Center` |
| city | `Weberborough` |
| state | `KY` |
| postal_code | `59027-4080` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `64312647122` |
| coverage_id | `coverage-mrn000065` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000065` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-08T16:03:28+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000065` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-06-08T16:03:28+00:00` |
| recorded_date | `2026-06-08T16:03:28+00:00` |
| provenance_id | `provenance-mrn000065` |
| provenance_recorded | `2026-06-08T16:03:28+00:00` |
| source_identifier_value | `MSG000080` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000066 - Wolf, Tiana

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000066` |
| MRN | `MRN000066` |
| SSN | `16523483604` |
| Name | `Wolf, Tiana Blake` |
| Suffix | `III` |
| Gender | `female` |
| Birth Date | `1988-04-19` |
| Address | `37786 Lynch Mews, South Amely, MS 99334, USA` |
| Phone | `(846) 484-7755` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000066` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Blue Cross Blue Shield` |
| Coverage Group | `` |
| Coverage Plan | `BC001` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000066` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-08T14:16:53Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000066` |
| Diagnosis | `K21.9 - GERD` |
| Diagnosis Text | `GERD` |
| Onset | `2026-06-08T14:16:53Z` |
| Recorded Date | `2026-06-08T14:16:53Z` |
| Provenance ID | `provenance-mrn000066` |
| Provenance Recorded | `2026-06-08T14:16:53Z` |
| Source Message Control ID | `MSG000081` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000066` |
| mrn_value | `MRN000066` |
| family_name | `Wolf` |
| given_names | `['Tiana', 'Blake']` |
| suffixes | `['III']` |
| gender | `female` |
| birth_date | `1988-04-19` |
| telecom_phone | `(846) 484-7755` |
| address_line1 | `37786 Lynch Mews` |
| city | `South Amely` |
| state | `MS` |
| postal_code | `99334` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `16523483604` |
| coverage_id | `coverage-mrn000066` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Blue Cross Blue Shield` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `BC001` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000066` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-08T14:16:53+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000066` |
| diagnosis_code | `K21.9` |
| diagnosis_display | `GERD` |
| diagnosis_text | `GERD` |
| onset_datetime | `2026-06-08T14:16:53+00:00` |
| recorded_date | `2026-06-08T14:16:53+00:00` |
| provenance_id | `provenance-mrn000066` |
| provenance_recorded | `2026-06-08T14:16:53+00:00` |
| source_identifier_value | `MSG000081` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000067 - Lang, Tremayne

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000067` |
| MRN | `MRN000067` |
| SSN | `54294994581` |
| Name | `Lang, Tremayne Reagan` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1942-11-05` |
| Address | `502 Astrid Branch, Fort Myers, WA 24808, USA` |
| Phone | `(767) 735-6427` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000067` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000067` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-05T17:56:11Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000067` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-05T17:56:11Z` |
| Recorded Date | `2026-06-05T17:56:11Z` |
| Provenance ID | `provenance-mrn000067` |
| Provenance Recorded | `2026-06-05T17:56:11Z` |
| Source Message Control ID | `MSG000082` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000067` |
| mrn_value | `MRN000067` |
| family_name | `Lang` |
| given_names | `['Tremayne', 'Reagan']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1942-11-05` |
| telecom_phone | `(767) 735-6427` |
| address_line1 | `502 Astrid Branch` |
| city | `Fort Myers` |
| state | `WA` |
| postal_code | `24808` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `54294994581` |
| coverage_id | `coverage-mrn000067` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000067` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-05T17:56:11+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000067` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-05T17:56:11+00:00` |
| recorded_date | `2026-06-05T17:56:11+00:00` |
| provenance_id | `provenance-mrn000067` |
| provenance_recorded | `2026-06-05T17:56:11+00:00` |
| source_identifier_value | `MSG000082` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000068 - McCullough, Mireya

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000068` |
| MRN | `MRN000068` |
| SSN | `83501031684` |
| Name | `McCullough, Mireya Skyler` |
| Suffix | `SR` |
| Gender | `female` |
| Birth Date | `1942-02-28` |
| Address | `765 Runolfsdottir Knoll, Volkmanfurt, SD 83636-7724, USA` |
| Phone | `(346) 636-5579` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000068` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Kaiser Permanente` |
| Coverage Group | `` |
| Coverage Plan | `KP006` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000068` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-19T01:28:21Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000068` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-06-19T01:28:21Z` |
| Recorded Date | `2026-06-19T01:28:21Z` |
| Provenance ID | `provenance-mrn000068` |
| Provenance Recorded | `2026-06-19T01:28:21Z` |
| Source Message Control ID | `MSG000083` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000068` |
| mrn_value | `MRN000068` |
| family_name | `McCullough` |
| given_names | `['Mireya', 'Skyler']` |
| suffixes | `['SR']` |
| gender | `female` |
| birth_date | `1942-02-28` |
| telecom_phone | `(346) 636-5579` |
| address_line1 | `765 Runolfsdottir Knoll` |
| city | `Volkmanfurt` |
| state | `SD` |
| postal_code | `83636-7724` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `83501031684` |
| coverage_id | `coverage-mrn000068` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Kaiser Permanente` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `KP006` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000068` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-19T01:28:21+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000068` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-06-19T01:28:21+00:00` |
| recorded_date | `2026-06-19T01:28:21+00:00` |
| provenance_id | `provenance-mrn000068` |
| provenance_recorded | `2026-06-19T01:28:21+00:00` |
| source_identifier_value | `MSG000083` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000069 - Stiedemann-Streich, Ila

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000069` |
| MRN | `MRN000069` |
| SSN | `60764883895` |
| Name | `Stiedemann-Streich, Ila Sage` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `2000-07-14` |
| Address | `77716 Corwin Extension, Brooklynport, IN 97026-5628, USA` |
| Phone | `(756) 181-8741` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000069` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000069` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-02T08:23:06Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000069` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-06-02T08:23:06Z` |
| Recorded Date | `2026-06-02T08:23:06Z` |
| Provenance ID | `provenance-mrn000069` |
| Provenance Recorded | `2026-06-02T08:23:06Z` |
| Source Message Control ID | `MSG000084` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000069` |
| mrn_value | `MRN000069` |
| family_name | `Stiedemann-Streich` |
| given_names | `['Ila', 'Sage']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `2000-07-14` |
| telecom_phone | `(756) 181-8741` |
| address_line1 | `77716 Corwin Extension` |
| city | `Brooklynport` |
| state | `IN` |
| postal_code | `97026-5628` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `60764883895` |
| coverage_id | `coverage-mrn000069` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000069` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-02T08:23:06+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000069` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-06-02T08:23:06+00:00` |
| recorded_date | `2026-06-02T08:23:06+00:00` |
| provenance_id | `provenance-mrn000069` |
| provenance_recorded | `2026-06-02T08:23:06+00:00` |
| source_identifier_value | `MSG000084` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000070 - Mosciski-Conn, Jacynthe

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000070` |
| MRN | `MRN000070` |
| SSN | `97091938612` |
| Name | `Mosciski-Conn, Jacynthe Elliott` |
| Suffix | `SR` |
| Gender | `female` |
| Birth Date | `1943-01-14` |
| Address | `832 Mill Lane, Manteca, OK 46242-1681, USA` |
| Phone | `(251) 060-9369` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000070` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Kaiser Permanente` |
| Coverage Group | `` |
| Coverage Plan | `KP006` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000070` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-06T22:49:53Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000070` |
| Diagnosis | `K21.9 - GERD` |
| Diagnosis Text | `GERD` |
| Onset | `2026-06-06T22:49:53Z` |
| Recorded Date | `2026-06-06T22:49:53Z` |
| Provenance ID | `provenance-mrn000070` |
| Provenance Recorded | `2026-06-06T22:49:53Z` |
| Source Message Control ID | `MSG000085` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000070` |
| mrn_value | `MRN000070` |
| family_name | `Mosciski-Conn` |
| given_names | `['Jacynthe', 'Elliott']` |
| suffixes | `['SR']` |
| gender | `female` |
| birth_date | `1943-01-14` |
| telecom_phone | `(251) 060-9369` |
| address_line1 | `832 Mill Lane` |
| city | `Manteca` |
| state | `OK` |
| postal_code | `46242-1681` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `97091938612` |
| coverage_id | `coverage-mrn000070` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Kaiser Permanente` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `KP006` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000070` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-06T22:49:53+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000070` |
| diagnosis_code | `K21.9` |
| diagnosis_display | `GERD` |
| diagnosis_text | `GERD` |
| onset_datetime | `2026-06-06T22:49:53+00:00` |
| recorded_date | `2026-06-06T22:49:53+00:00` |
| provenance_id | `provenance-mrn000070` |
| provenance_recorded | `2026-06-06T22:49:53+00:00` |
| source_identifier_value | `MSG000085` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000071 - Tromp, Carey

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000071` |
| MRN | `MRN000071` |
| SSN | `63937322356` |
| Name | `Tromp, Carey River` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1943-10-08` |
| Address | `5283 Albert Road, Gradyburgh, TX 21715, USA` |
| Phone | `(818) 048-6562` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000071` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000071` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T08:00:12Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000071` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-05-21T08:00:12Z` |
| Recorded Date | `2026-05-21T08:00:12Z` |
| Provenance ID | `provenance-mrn000071` |
| Provenance Recorded | `2026-05-21T08:00:12Z` |
| Source Message Control ID | `MSG000086` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000071` |
| mrn_value | `MRN000071` |
| family_name | `Tromp` |
| given_names | `['Carey', 'River']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1943-10-08` |
| telecom_phone | `(818) 048-6562` |
| address_line1 | `5283 Albert Road` |
| city | `Gradyburgh` |
| state | `TX` |
| postal_code | `21715` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `63937322356` |
| coverage_id | `coverage-mrn000071` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000071` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T08:00:12+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000071` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-05-21T08:00:12+00:00` |
| recorded_date | `2026-05-21T08:00:12+00:00` |
| provenance_id | `provenance-mrn000071` |
| provenance_recorded | `2026-05-21T08:00:12+00:00` |
| source_identifier_value | `MSG000086` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000072 - Morissette, Ellen

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000072` |
| MRN | `MRN000072` |
| SSN | `86165339155` |
| Name | `Morissette, Ellen Sawyer` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1940-10-16` |
| Address | `43349 Chestnut Grove, Fort Pablo, SD 93411-2197, USA` |
| Phone | `(159) 975-4416` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000072` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000072` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-05T23:43:43Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000072` |
| Diagnosis | `K21.9 - GERD` |
| Diagnosis Text | `GERD` |
| Onset | `2026-06-05T23:43:43Z` |
| Recorded Date | `2026-06-05T23:43:43Z` |
| Provenance ID | `provenance-mrn000072` |
| Provenance Recorded | `2026-06-05T23:43:43Z` |
| Source Message Control ID | `MSG000087` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000072` |
| mrn_value | `MRN000072` |
| family_name | `Morissette` |
| given_names | `['Ellen', 'Sawyer']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1940-10-16` |
| telecom_phone | `(159) 975-4416` |
| address_line1 | `43349 Chestnut Grove` |
| city | `Fort Pablo` |
| state | `SD` |
| postal_code | `93411-2197` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `86165339155` |
| coverage_id | `coverage-mrn000072` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000072` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-05T23:43:43+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000072` |
| diagnosis_code | `K21.9` |
| diagnosis_display | `GERD` |
| diagnosis_text | `GERD` |
| onset_datetime | `2026-06-05T23:43:43+00:00` |
| recorded_date | `2026-06-05T23:43:43+00:00` |
| provenance_id | `provenance-mrn000072` |
| provenance_recorded | `2026-06-05T23:43:43+00:00` |
| source_identifier_value | `MSG000087` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000073 - Emard, German

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000073` |
| MRN | `MRN000073` |
| SSN | `01743619012` |
| Name | `Emard, German Sawyer` |
| Suffix | `III` |
| Gender | `female` |
| Birth Date | `1966-03-03` |
| Address | `1165 Oxford Street, New Daphneycester, AK 37166-3158, USA` |
| Phone | `(706) 214-9973` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000073` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000073` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T20:41:52Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000073` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-05-21T20:41:52Z` |
| Recorded Date | `2026-05-21T20:41:52Z` |
| Provenance ID | `provenance-mrn000073` |
| Provenance Recorded | `2026-05-21T20:41:52Z` |
| Source Message Control ID | `MSG000088` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000073` |
| mrn_value | `MRN000073` |
| family_name | `Emard` |
| given_names | `['German', 'Sawyer']` |
| suffixes | `['III']` |
| gender | `female` |
| birth_date | `1966-03-03` |
| telecom_phone | `(706) 214-9973` |
| address_line1 | `1165 Oxford Street` |
| city | `New Daphneycester` |
| state | `AK` |
| postal_code | `37166-3158` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `01743619012` |
| coverage_id | `coverage-mrn000073` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000073` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T20:41:52+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000073` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-05-21T20:41:52+00:00` |
| recorded_date | `2026-05-21T20:41:52+00:00` |
| provenance_id | `provenance-mrn000073` |
| provenance_recorded | `2026-05-21T20:41:52+00:00` |
| source_identifier_value | `MSG000088` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000074 - Bogan, Juwan

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000074` |
| MRN | `MRN000074` |
| SSN | `17896203069` |
| Name | `Bogan, Juwan Reagan` |
| Suffix | `` |
| Gender | `female` |
| Birth Date | `2004-07-06` |
| Address | `198 Darrel Forges, North Dannie, AK 49936-3197, USA` |
| Phone | `(051) 491-2190` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000074` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000074` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-06T19:25:28Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000074` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-06-06T19:25:28Z` |
| Recorded Date | `2026-06-06T19:25:28Z` |
| Provenance ID | `provenance-mrn000074` |
| Provenance Recorded | `2026-06-06T19:25:28Z` |
| Source Message Control ID | `MSG000089` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000074` |
| mrn_value | `MRN000074` |
| family_name | `Bogan` |
| given_names | `['Juwan', 'Reagan']` |
| suffixes | `[]` |
| gender | `female` |
| birth_date | `2004-07-06` |
| telecom_phone | `(051) 491-2190` |
| address_line1 | `198 Darrel Forges` |
| city | `North Dannie` |
| state | `AK` |
| postal_code | `49936-3197` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `17896203069` |
| coverage_id | `coverage-mrn000074` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000074` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-06T19:25:28+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000074` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-06-06T19:25:28+00:00` |
| recorded_date | `2026-06-06T19:25:28+00:00` |
| provenance_id | `provenance-mrn000074` |
| provenance_recorded | `2026-06-06T19:25:28+00:00` |
| source_identifier_value | `MSG000089` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000075 - Crooks, Alf

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000075` |
| MRN | `MRN000075` |
| SSN | `05235669614` |
| Name | `Crooks, Alf Harper` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1996-05-17` |
| Address | `771 Blanda Coves, East Hendersonville, SD 22601, USA` |
| Phone | `(368) 581-2388` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000075` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000075` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-23T14:15:15Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000075` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-05-23T14:15:15Z` |
| Recorded Date | `2026-05-23T14:15:15Z` |
| Provenance ID | `provenance-mrn000075` |
| Provenance Recorded | `2026-05-23T14:15:15Z` |
| Source Message Control ID | `MSG000090` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000075` |
| mrn_value | `MRN000075` |
| family_name | `Crooks` |
| given_names | `['Alf', 'Harper']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1996-05-17` |
| telecom_phone | `(368) 581-2388` |
| address_line1 | `771 Blanda Coves` |
| city | `East Hendersonville` |
| state | `SD` |
| postal_code | `22601` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `05235669614` |
| coverage_id | `coverage-mrn000075` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000075` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-23T14:15:15+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000075` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-05-23T14:15:15+00:00` |
| recorded_date | `2026-05-23T14:15:15+00:00` |
| provenance_id | `provenance-mrn000075` |
| provenance_recorded | `2026-05-23T14:15:15+00:00` |
| source_identifier_value | `MSG000090` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000076 - Schuppe, Angelica

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000076` |
| MRN | `MRN000076` |
| SSN | `52748383976` |
| Name | `Schuppe, Angelica Jordan` |
| Suffix | `JR` |
| Gender | `male` |
| Birth Date | `1961-07-24` |
| Address | `3057 Washington Road, Santosstad, RI 71321-2357, USA` |
| Phone | `(638) 654-6701` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000076` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000076` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-26T05:03:39Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000076` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-05-26T05:03:39Z` |
| Recorded Date | `2026-05-26T05:03:39Z` |
| Provenance ID | `provenance-mrn000076` |
| Provenance Recorded | `2026-05-26T05:03:39Z` |
| Source Message Control ID | `MSG000091` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000076` |
| mrn_value | `MRN000076` |
| family_name | `Schuppe` |
| given_names | `['Angelica', 'Jordan']` |
| suffixes | `['JR']` |
| gender | `male` |
| birth_date | `1961-07-24` |
| telecom_phone | `(638) 654-6701` |
| address_line1 | `3057 Washington Road` |
| city | `Santosstad` |
| state | `RI` |
| postal_code | `71321-2357` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `52748383976` |
| coverage_id | `coverage-mrn000076` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000076` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-26T05:03:39+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000076` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-05-26T05:03:39+00:00` |
| recorded_date | `2026-05-26T05:03:39+00:00` |
| provenance_id | `provenance-mrn000076` |
| provenance_recorded | `2026-05-26T05:03:39+00:00` |
| source_identifier_value | `MSG000091` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000077 - Douglas, Mohammad

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000077` |
| MRN | `MRN000077` |
| SSN | `17418842981` |
| Name | `Douglas, Mohammad Dakota` |
| Suffix | `` |
| Gender | `female` |
| Birth Date | `1954-09-13` |
| Address | `92781 Ashly Spur, Las Vegas, KY 17380, USA` |
| Phone | `(752) 504-7692` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000077` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000077` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-31T15:23:30Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000077` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-05-31T15:23:30Z` |
| Recorded Date | `2026-05-31T15:23:30Z` |
| Provenance ID | `provenance-mrn000077` |
| Provenance Recorded | `2026-05-31T15:23:30Z` |
| Source Message Control ID | `MSG000092` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000077` |
| mrn_value | `MRN000077` |
| family_name | `Douglas` |
| given_names | `['Mohammad', 'Dakota']` |
| suffixes | `[]` |
| gender | `female` |
| birth_date | `1954-09-13` |
| telecom_phone | `(752) 504-7692` |
| address_line1 | `92781 Ashly Spur` |
| city | `Las Vegas` |
| state | `KY` |
| postal_code | `17380` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `17418842981` |
| coverage_id | `coverage-mrn000077` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000077` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-31T15:23:30+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000077` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-05-31T15:23:30+00:00` |
| recorded_date | `2026-05-31T15:23:30+00:00` |
| provenance_id | `provenance-mrn000077` |
| provenance_recorded | `2026-05-31T15:23:30+00:00` |
| source_identifier_value | `MSG000092` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000078 - Lakin, Jo

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000078` |
| MRN | `MRN000078` |
| SSN | `22102186057` |
| Name | `Lakin, Jo Jaden` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1940-10-26` |
| Address | `93419 Bode Mall, New Lorena, AK 37300-1731, USA` |
| Phone | `(424) 590-9807` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000078` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000078` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-14T05:22:39Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000078` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-06-14T05:22:39Z` |
| Recorded Date | `2026-06-14T05:22:39Z` |
| Provenance ID | `provenance-mrn000078` |
| Provenance Recorded | `2026-06-14T05:22:39Z` |
| Source Message Control ID | `MSG000093` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000078` |
| mrn_value | `MRN000078` |
| family_name | `Lakin` |
| given_names | `['Jo', 'Jaden']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1940-10-26` |
| telecom_phone | `(424) 590-9807` |
| address_line1 | `93419 Bode Mall` |
| city | `New Lorena` |
| state | `AK` |
| postal_code | `37300-1731` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `22102186057` |
| coverage_id | `coverage-mrn000078` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000078` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-14T05:22:39+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000078` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-06-14T05:22:39+00:00` |
| recorded_date | `2026-06-14T05:22:39+00:00` |
| provenance_id | `provenance-mrn000078` |
| provenance_recorded | `2026-06-14T05:22:39+00:00` |
| source_identifier_value | `MSG000093` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000079 - Wolff, Vern

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000079` |
| MRN | `MRN000079` |
| SSN | `55479277129` |
| Name | `Wolff, Vern Rowan` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1955-02-14` |
| Address | `92967 Ebert Manors, Bartellworth, WY 96751-9998, USA` |
| Phone | `(553) 941-3066` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000079` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Cigna` |
| Coverage Group | `` |
| Coverage Plan | `CI004` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000079` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T02:10:52Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000079` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-05-21T02:10:52Z` |
| Recorded Date | `2026-05-21T02:10:52Z` |
| Provenance ID | `provenance-mrn000079` |
| Provenance Recorded | `2026-05-21T02:10:52Z` |
| Source Message Control ID | `MSG000094` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000079` |
| mrn_value | `MRN000079` |
| family_name | `Wolff` |
| given_names | `['Vern', 'Rowan']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1955-02-14` |
| telecom_phone | `(553) 941-3066` |
| address_line1 | `92967 Ebert Manors` |
| city | `Bartellworth` |
| state | `WY` |
| postal_code | `96751-9998` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `55479277129` |
| coverage_id | `coverage-mrn000079` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Cigna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `CI004` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000079` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T02:10:52+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000079` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-05-21T02:10:52+00:00` |
| recorded_date | `2026-05-21T02:10:52+00:00` |
| provenance_id | `provenance-mrn000079` |
| provenance_recorded | `2026-05-21T02:10:52+00:00` |
| source_identifier_value | `MSG000094` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000080 - Marvin, Kaylin

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000080` |
| MRN | `MRN000080` |
| SSN | `03300961052` |
| Name | `Marvin, Kaylin Finley` |
| Suffix | `` |
| Gender | `female` |
| Birth Date | `1950-03-10` |
| Address | `78173 Amara Bridge, Glen Burnie, ID 95545, USA` |
| Phone | `(570) 833-6729` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000080` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Kaiser Permanente` |
| Coverage Group | `` |
| Coverage Plan | `KP006` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000080` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-03T19:24:03Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000080` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-06-03T19:24:03Z` |
| Recorded Date | `2026-06-03T19:24:03Z` |
| Provenance ID | `provenance-mrn000080` |
| Provenance Recorded | `2026-06-03T19:24:03Z` |
| Source Message Control ID | `MSG000095` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000080` |
| mrn_value | `MRN000080` |
| family_name | `Marvin` |
| given_names | `['Kaylin', 'Finley']` |
| suffixes | `[]` |
| gender | `female` |
| birth_date | `1950-03-10` |
| telecom_phone | `(570) 833-6729` |
| address_line1 | `78173 Amara Bridge` |
| city | `Glen Burnie` |
| state | `ID` |
| postal_code | `95545` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `03300961052` |
| coverage_id | `coverage-mrn000080` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Kaiser Permanente` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `KP006` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000080` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-03T19:24:03+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000080` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-06-03T19:24:03+00:00` |
| recorded_date | `2026-06-03T19:24:03+00:00` |
| provenance_id | `provenance-mrn000080` |
| provenance_recorded | `2026-06-03T19:24:03+00:00` |
| source_identifier_value | `MSG000095` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000081 - Gleason, Linda

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000081` |
| MRN | `MRN000081` |
| SSN | `79135958238` |
| Name | `Gleason, Linda Reagan` |
| Suffix | `` |
| Gender | `male` |
| Birth Date | `2001-06-29` |
| Address | `9228 Nader Cove, Boganville, IL 10742, USA` |
| Phone | `(217) 877-1448` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000081` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000081` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-31T13:14:50Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000081` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-05-31T13:14:50Z` |
| Recorded Date | `2026-05-31T13:14:50Z` |
| Provenance ID | `provenance-mrn000081` |
| Provenance Recorded | `2026-05-31T13:14:50Z` |
| Source Message Control ID | `MSG000096` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000081` |
| mrn_value | `MRN000081` |
| family_name | `Gleason` |
| given_names | `['Linda', 'Reagan']` |
| suffixes | `[]` |
| gender | `male` |
| birth_date | `2001-06-29` |
| telecom_phone | `(217) 877-1448` |
| address_line1 | `9228 Nader Cove` |
| city | `Boganville` |
| state | `IL` |
| postal_code | `10742` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `79135958238` |
| coverage_id | `coverage-mrn000081` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000081` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-31T13:14:50+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000081` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-05-31T13:14:50+00:00` |
| recorded_date | `2026-05-31T13:14:50+00:00` |
| provenance_id | `provenance-mrn000081` |
| provenance_recorded | `2026-05-31T13:14:50+00:00` |
| source_identifier_value | `MSG000096` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000082 - Nolan, Erica

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000082` |
| MRN | `MRN000082` |
| SSN | `02955294411` |
| Name | `Nolan, Erica North` |
| Suffix | `III` |
| Gender | `female` |
| Birth Date | `1990-11-04` |
| Address | `989 Gloria Extensions, Lillyville, GA 73635, USA` |
| Phone | `(381) 516-5343` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000082` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000082` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-29T02:28:48Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000082` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-05-29T02:28:48Z` |
| Recorded Date | `2026-05-29T02:28:48Z` |
| Provenance ID | `provenance-mrn000082` |
| Provenance Recorded | `2026-05-29T02:28:48Z` |
| Source Message Control ID | `MSG000097` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000082` |
| mrn_value | `MRN000082` |
| family_name | `Nolan` |
| given_names | `['Erica', 'North']` |
| suffixes | `['III']` |
| gender | `female` |
| birth_date | `1990-11-04` |
| telecom_phone | `(381) 516-5343` |
| address_line1 | `989 Gloria Extensions` |
| city | `Lillyville` |
| state | `GA` |
| postal_code | `73635` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `02955294411` |
| coverage_id | `coverage-mrn000082` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000082` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-29T02:28:48+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000082` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-05-29T02:28:48+00:00` |
| recorded_date | `2026-05-29T02:28:48+00:00` |
| provenance_id | `provenance-mrn000082` |
| provenance_recorded | `2026-05-29T02:28:48+00:00` |
| source_identifier_value | `MSG000097` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000083 - Morar, Nickolas

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000083` |
| MRN | `MRN000083` |
| SSN | `59313608231` |
| Name | `Morar, Nickolas River` |
| Suffix | `JR` |
| Gender | `male` |
| Birth Date | `2008-06-14` |
| Address | `5236 Abshire Streets, Lakinshire, WI 28229, USA` |
| Phone | `(216) 550-4955` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000083` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000083` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-28T15:02:27Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000083` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-05-28T15:02:27Z` |
| Recorded Date | `2026-05-28T15:02:27Z` |
| Provenance ID | `provenance-mrn000083` |
| Provenance Recorded | `2026-05-28T15:02:27Z` |
| Source Message Control ID | `MSG000098` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000083` |
| mrn_value | `MRN000083` |
| family_name | `Morar` |
| given_names | `['Nickolas', 'River']` |
| suffixes | `['JR']` |
| gender | `male` |
| birth_date | `2008-06-14` |
| telecom_phone | `(216) 550-4955` |
| address_line1 | `5236 Abshire Streets` |
| city | `Lakinshire` |
| state | `WI` |
| postal_code | `28229` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `59313608231` |
| coverage_id | `coverage-mrn000083` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000083` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-28T15:02:27+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000083` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-05-28T15:02:27+00:00` |
| recorded_date | `2026-05-28T15:02:27+00:00` |
| provenance_id | `provenance-mrn000083` |
| provenance_recorded | `2026-05-28T15:02:27+00:00` |
| source_identifier_value | `MSG000098` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000084 - O'Connell, Gennaro

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000084` |
| MRN | `MRN000084` |
| SSN | `64137363392` |
| Name | `O'Connell, Gennaro Anderson` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `2004-12-01` |
| Address | `62714 Hilll Skyway, Vineland, MA 38195-0178, USA` |
| Phone | `(707) 431-7194` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000084` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Kaiser Permanente` |
| Coverage Group | `` |
| Coverage Plan | `KP006` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000084` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-03T14:49:03Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000084` |
| Diagnosis | `K21.9 - GERD` |
| Diagnosis Text | `GERD` |
| Onset | `2026-06-03T14:49:03Z` |
| Recorded Date | `2026-06-03T14:49:03Z` |
| Provenance ID | `provenance-mrn000084` |
| Provenance Recorded | `2026-06-03T14:49:03Z` |
| Source Message Control ID | `MSG000099` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000084` |
| mrn_value | `MRN000084` |
| family_name | `O'Connell` |
| given_names | `['Gennaro', 'Anderson']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `2004-12-01` |
| telecom_phone | `(707) 431-7194` |
| address_line1 | `62714 Hilll Skyway` |
| city | `Vineland` |
| state | `MA` |
| postal_code | `38195-0178` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `64137363392` |
| coverage_id | `coverage-mrn000084` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Kaiser Permanente` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `KP006` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000084` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-03T14:49:03+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000084` |
| diagnosis_code | `K21.9` |
| diagnosis_display | `GERD` |
| diagnosis_text | `GERD` |
| onset_datetime | `2026-06-03T14:49:03+00:00` |
| recorded_date | `2026-06-03T14:49:03+00:00` |
| provenance_id | `provenance-mrn000084` |
| provenance_recorded | `2026-06-03T14:49:03+00:00` |
| source_identifier_value | `MSG000099` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000085 - Schmitt, Cristian

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000085` |
| MRN | `MRN000085` |
| SSN | `78378949415` |
| Name | `Schmitt, Cristian Dakota` |
| Suffix | `II` |
| Gender | `male` |
| Birth Date | `1968-04-03` |
| Address | `2030 Martin Luther King Boulevard, New Johannahaven, HI 35386-8429, USA` |
| Phone | `(366) 808-3229` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000085` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Cigna` |
| Coverage Group | `` |
| Coverage Plan | `CI004` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000085` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-29T23:43:28Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000085` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-05-29T23:43:28Z` |
| Recorded Date | `2026-05-29T23:43:28Z` |
| Provenance ID | `provenance-mrn000085` |
| Provenance Recorded | `2026-05-29T23:43:28Z` |
| Source Message Control ID | `MSG000100` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000085` |
| mrn_value | `MRN000085` |
| family_name | `Schmitt` |
| given_names | `['Cristian', 'Dakota']` |
| suffixes | `['II']` |
| gender | `male` |
| birth_date | `1968-04-03` |
| telecom_phone | `(366) 808-3229` |
| address_line1 | `2030 Martin Luther King Boulevard` |
| city | `New Johannahaven` |
| state | `HI` |
| postal_code | `35386-8429` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `78378949415` |
| coverage_id | `coverage-mrn000085` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Cigna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `CI004` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000085` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-29T23:43:28+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000085` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-05-29T23:43:28+00:00` |
| recorded_date | `2026-05-29T23:43:28+00:00` |
| provenance_id | `provenance-mrn000085` |
| provenance_recorded | `2026-05-29T23:43:28+00:00` |
| source_identifier_value | `MSG000100` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000086 - Morar-Lind, Nickolas

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000086` |
| MRN | `MRN000086` |
| SSN | `59313608231` |
| Name | `Morar-Lind, Nickolas River` |
| Suffix | `JR` |
| Gender | `male` |
| Birth Date | `2008-06-14` |
| Address | `5236 Abshire Streets, Lakinshire, WI 28229, USA` |
| Phone | `(216) 550-4955` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000086` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000086` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-28T15:02:27Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000086` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-05-28T15:02:27Z` |
| Recorded Date | `2026-05-28T15:02:27Z` |
| Provenance ID | `provenance-mrn000086` |
| Provenance Recorded | `2026-05-28T15:02:27Z` |
| Source Message Control ID | `MSG000101` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000086` |
| mrn_value | `MRN000086` |
| family_name | `Morar-Lind` |
| given_names | `['Nickolas', 'River']` |
| suffixes | `['JR']` |
| gender | `male` |
| birth_date | `2008-06-14` |
| telecom_phone | `(216) 550-4955` |
| address_line1 | `5236 Abshire Streets` |
| city | `Lakinshire` |
| state | `WI` |
| postal_code | `28229` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `59313608231` |
| coverage_id | `coverage-mrn000086` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000086` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-28T15:02:27+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000086` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-05-28T15:02:27+00:00` |
| recorded_date | `2026-05-28T15:02:27+00:00` |
| provenance_id | `provenance-mrn000086` |
| provenance_recorded | `2026-05-28T15:02:27+00:00` |
| source_identifier_value | `MSG000101` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000087 - Stiedemann-Streich, Ila

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000087` |
| MRN | `MRN000087` |
| SSN | `60764883895` |
| Name | `Stiedemann-Streich, Ila` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `2000-07-14` |
| Address | `77716 Corwin Extension, Brooklynport, IN 97026-5628, USA` |
| Phone | `(756) 181-8741` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000087` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000087` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-02T08:23:06Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000087` |
| Diagnosis | `F41.9 - Anxiety disorder` |
| Diagnosis Text | `Anxiety disorder` |
| Onset | `2026-06-02T08:23:06Z` |
| Recorded Date | `2026-06-02T08:23:06Z` |
| Provenance ID | `provenance-mrn000087` |
| Provenance Recorded | `2026-06-02T08:23:06Z` |
| Source Message Control ID | `MSG000102` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000087` |
| mrn_value | `MRN000087` |
| family_name | `Stiedemann-Streich` |
| given_names | `['Ila']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `2000-07-14` |
| telecom_phone | `(756) 181-8741` |
| address_line1 | `77716 Corwin Extension` |
| city | `Brooklynport` |
| state | `IN` |
| postal_code | `97026-5628` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `60764883895` |
| coverage_id | `coverage-mrn000087` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000087` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-02T08:23:06+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000087` |
| diagnosis_code | `F41.9` |
| diagnosis_display | `Anxiety disorder` |
| diagnosis_text | `Anxiety disorder` |
| onset_datetime | `2026-06-02T08:23:06+00:00` |
| recorded_date | `2026-06-02T08:23:06+00:00` |
| provenance_id | `provenance-mrn000087` |
| provenance_recorded | `2026-06-02T08:23:06+00:00` |
| source_identifier_value | `MSG000102` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000088 - Mohr, Caleb

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000088` |
| MRN | `MRN000088` |
| SSN | `89472314083` |
| Name | `Mohr, Caleb` |
| Suffix | `` |
| Gender | `male` |
| Birth Date | `1981-05-04` |
| Address | `90984 Donavon Views, Erdmanfurt, VA 28018-9602, USA` |
| Phone | `(238) 407-7954` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000088` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000088` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-02T11:20:19Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000088` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-02T11:20:19Z` |
| Recorded Date | `2026-06-02T11:20:19Z` |
| Provenance ID | `provenance-mrn000088` |
| Provenance Recorded | `2026-06-02T11:20:19Z` |
| Source Message Control ID | `MSG000103` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000088` |
| mrn_value | `MRN000088` |
| family_name | `Mohr` |
| given_names | `['Caleb']` |
| suffixes | `[]` |
| gender | `male` |
| birth_date | `1981-05-04` |
| telecom_phone | `(238) 407-7954` |
| address_line1 | `90984 Donavon Views` |
| city | `Erdmanfurt` |
| state | `VA` |
| postal_code | `28018-9602` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `89472314083` |
| coverage_id | `coverage-mrn000088` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000088` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-02T11:20:19+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000088` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-02T11:20:19+00:00` |
| recorded_date | `2026-06-02T11:20:19+00:00` |
| provenance_id | `provenance-mrn000088` |
| provenance_recorded | `2026-06-02T11:20:19+00:00` |
| source_identifier_value | `MSG000103` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000089 - Schmidt-Gulgowski, Abe

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000089` |
| MRN | `MRN000089` |
| SSN | `69231350379` |
| Name | `Schmidt-Gulgowski, Abe Kennedy` |
| Suffix | `JR` |
| Gender | `female` |
| Birth Date | `1959-01-31` |
| Address | `85423 Armstrong Streets, Fort Mariannacester, NM 62575-9770, USA` |
| Phone | `(186) 042-4301` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000089` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Anthem` |
| Coverage Group | `` |
| Coverage Plan | `AN007` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000089` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-11T09:41:56Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000089` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-06-11T09:41:56Z` |
| Recorded Date | `2026-06-11T09:41:56Z` |
| Provenance ID | `provenance-mrn000089` |
| Provenance Recorded | `2026-06-11T09:41:56Z` |
| Source Message Control ID | `MSG000104` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000089` |
| mrn_value | `MRN000089` |
| family_name | `Schmidt-Gulgowski` |
| given_names | `['Abe', 'Kennedy']` |
| suffixes | `['JR']` |
| gender | `female` |
| birth_date | `1959-01-31` |
| telecom_phone | `(186) 042-4301` |
| address_line1 | `85423 Armstrong Streets` |
| city | `Fort Mariannacester` |
| state | `NM` |
| postal_code | `62575-9770` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `69231350379` |
| coverage_id | `coverage-mrn000089` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Anthem` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AN007` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000089` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-11T09:41:56+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000089` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-06-11T09:41:56+00:00` |
| recorded_date | `2026-06-11T09:41:56+00:00` |
| provenance_id | `provenance-mrn000089` |
| provenance_recorded | `2026-06-11T09:41:56+00:00` |
| source_identifier_value | `MSG000104` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000090 - Emmerich, Mariela

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000090` |
| MRN | `MRN000090` |
| SSN | `57173113790` |
| Name | `Emmerich, Mariela North` |
| Suffix | `III` |
| Gender | `female` |
| Birth Date | `1988-01-29` |
| Address | `7013 Bluebell Close, Victoria, GA 68771, USA` |
| Phone | `(141) 651-7866` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000090` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000090` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-11T11:43:00Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000090` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-06-11T11:43:00Z` |
| Recorded Date | `2026-06-11T11:43:00Z` |
| Provenance ID | `provenance-mrn000090` |
| Provenance Recorded | `2026-06-11T11:43:00Z` |
| Source Message Control ID | `MSG000105` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000090` |
| mrn_value | `MRN000090` |
| family_name | `Emmerich` |
| given_names | `['Mariela', 'North']` |
| suffixes | `['III']` |
| gender | `female` |
| birth_date | `1988-01-29` |
| telecom_phone | `(141) 651-7866` |
| address_line1 | `7013 Bluebell Close` |
| city | `Victoria` |
| state | `GA` |
| postal_code | `68771` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `57173113790` |
| coverage_id | `coverage-mrn000090` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000090` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-11T11:43:00+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000090` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-06-11T11:43:00+00:00` |
| recorded_date | `2026-06-11T11:43:00+00:00` |
| provenance_id | `provenance-mrn000090` |
| provenance_recorded | `2026-06-11T11:43:00+00:00` |
| source_identifier_value | `MSG000105` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000091 - Gerlach, Lonzo

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000091` |
| MRN | `MRN000091` |
| SSN | `56964660188` |
| Name | `Gerlach, Lonzo Addison` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1990-03-08` |
| Address | `764 E 9th Street, North Gabestead, WI 77163, USA` |
| Phone | `(975) 647-7617` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000091` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Humana` |
| Coverage Group | `` |
| Coverage Plan | `HU005` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000091` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-28T11:13:46Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000091` |
| Diagnosis | `M79.3 - Fibromyalgia` |
| Diagnosis Text | `Fibromyalgia` |
| Onset | `2026-05-28T11:13:46Z` |
| Recorded Date | `2026-05-28T11:13:46Z` |
| Provenance ID | `provenance-mrn000091` |
| Provenance Recorded | `2026-05-28T11:13:46Z` |
| Source Message Control ID | `MSG000106` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000091` |
| mrn_value | `MRN000091` |
| family_name | `Gerlach` |
| given_names | `['Lonzo', 'Addison']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1990-03-08` |
| telecom_phone | `(975) 647-7617` |
| address_line1 | `764 E 9th Street` |
| city | `North Gabestead` |
| state | `WI` |
| postal_code | `77163` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `56964660188` |
| coverage_id | `coverage-mrn000091` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Humana` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `HU005` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000091` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-28T11:13:46+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000091` |
| diagnosis_code | `M79.3` |
| diagnosis_display | `Fibromyalgia` |
| diagnosis_text | `Fibromyalgia` |
| onset_datetime | `2026-05-28T11:13:46+00:00` |
| recorded_date | `2026-05-28T11:13:46+00:00` |
| provenance_id | `provenance-mrn000091` |
| provenance_recorded | `2026-05-28T11:13:46+00:00` |
| source_identifier_value | `MSG000106` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000092 - Stehr, Alice

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000092` |
| MRN | `MRN000092` |
| SSN | `82262926659` |
| Name | `Stehr, Alice Kendall` |
| Suffix | `` |
| Gender | `male` |
| Birth Date | `1964-10-04` |
| Address | `320 Hayes Ports, Mikelport, AK 62976-9777, USA` |
| Phone | `(401) 225-7437` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000092` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000092` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-26T14:42:53Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000092` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-05-26T14:42:53Z` |
| Recorded Date | `2026-05-26T14:42:53Z` |
| Provenance ID | `provenance-mrn000092` |
| Provenance Recorded | `2026-05-26T14:42:53Z` |
| Source Message Control ID | `MSG000107` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000092` |
| mrn_value | `MRN000092` |
| family_name | `Stehr` |
| given_names | `['Alice', 'Kendall']` |
| suffixes | `[]` |
| gender | `male` |
| birth_date | `1964-10-04` |
| telecom_phone | `(401) 225-7437` |
| address_line1 | `320 Hayes Ports` |
| city | `Mikelport` |
| state | `AK` |
| postal_code | `62976-9777` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `82262926659` |
| coverage_id | `coverage-mrn000092` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000092` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-26T14:42:53+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000092` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-05-26T14:42:53+00:00` |
| recorded_date | `2026-05-26T14:42:53+00:00` |
| provenance_id | `provenance-mrn000092` |
| provenance_recorded | `2026-05-26T14:42:53+00:00` |
| source_identifier_value | `MSG000107` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000093 - Hodkiewicz, Obie

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000093` |
| MRN | `MRN000093` |
| SSN | `13160889835` |
| Name | `Hodkiewicz, Obie Rory` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1958-07-04` |
| Address | `86298 Parisian Landing, Moenshire, MD 40909-2950, USA` |
| Phone | `(583) 474-1545` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000093` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000093` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-10T23:50:37Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000093` |
| Diagnosis | `I10 - Essential hypertension` |
| Diagnosis Text | `Essential hypertension` |
| Onset | `2026-06-10T23:50:37Z` |
| Recorded Date | `2026-06-10T23:50:37Z` |
| Provenance ID | `provenance-mrn000093` |
| Provenance Recorded | `2026-06-10T23:50:37Z` |
| Source Message Control ID | `MSG000108` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000093` |
| mrn_value | `MRN000093` |
| family_name | `Hodkiewicz` |
| given_names | `['Obie', 'Rory']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1958-07-04` |
| telecom_phone | `(583) 474-1545` |
| address_line1 | `86298 Parisian Landing` |
| city | `Moenshire` |
| state | `MD` |
| postal_code | `40909-2950` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `13160889835` |
| coverage_id | `coverage-mrn000093` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000093` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-10T23:50:37+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000093` |
| diagnosis_code | `I10` |
| diagnosis_display | `Essential hypertension` |
| diagnosis_text | `Essential hypertension` |
| onset_datetime | `2026-06-10T23:50:37+00:00` |
| recorded_date | `2026-06-10T23:50:37+00:00` |
| provenance_id | `provenance-mrn000093` |
| provenance_recorded | `2026-06-10T23:50:37+00:00` |
| source_identifier_value | `MSG000108` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000094 - Christelle, Oberbrunner

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000094` |
| MRN | `MRN000094` |
| SSN | `43113773365` |
| Name | `Christelle, Oberbrunner Billie` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1959-01-25` |
| Address | `7576 Mayer Cove, West Gussie, VT 11852-1478, USA` |
| Phone | `(867) 104-7261` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000094` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `UnitedHealthcare` |
| Coverage Group | `` |
| Coverage Plan | `UH003` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000094` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-24T08:35:50Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000094` |
| Diagnosis | `J44.9 - COPD` |
| Diagnosis Text | `COPD` |
| Onset | `2026-05-24T08:35:50Z` |
| Recorded Date | `2026-05-24T08:35:50Z` |
| Provenance ID | `provenance-mrn000094` |
| Provenance Recorded | `2026-05-24T08:35:50Z` |
| Source Message Control ID | `MSG000109` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000094` |
| mrn_value | `MRN000094` |
| family_name | `Christelle` |
| given_names | `['Oberbrunner', 'Billie']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1959-01-25` |
| telecom_phone | `(867) 104-7261` |
| address_line1 | `7576 Mayer Cove` |
| city | `West Gussie` |
| state | `VT` |
| postal_code | `11852-1478` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `43113773365` |
| coverage_id | `coverage-mrn000094` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `UnitedHealthcare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `UH003` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000094` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-24T08:35:50+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000094` |
| diagnosis_code | `J44.9` |
| diagnosis_display | `COPD` |
| diagnosis_text | `COPD` |
| onset_datetime | `2026-05-24T08:35:50+00:00` |
| recorded_date | `2026-05-24T08:35:50+00:00` |
| provenance_id | `provenance-mrn000094` |
| provenance_recorded | `2026-05-24T08:35:50+00:00` |
| source_identifier_value | `MSG000109` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000095 - Jorge, Murphy

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000095` |
| MRN | `MRN000095` |
| SSN | `93567153551` |
| Name | `Jorge, Murphy Brooklyn` |
| Suffix | `II` |
| Gender | `male` |
| Birth Date | `1964-08-14` |
| Address | `4832 N Walnut Street, Naderview, OR 76320-7953, USA` |
| Phone | `(244) 825-8715` |
| Race | `2028-9 - Asian` |
| Coverage ID | `coverage-mrn000095` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000095` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-14T19:05:08Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000095` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-06-14T19:05:08Z` |
| Recorded Date | `2026-06-14T19:05:08Z` |
| Provenance ID | `provenance-mrn000095` |
| Provenance Recorded | `2026-06-14T19:05:08Z` |
| Source Message Control ID | `MSG000110` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000095` |
| mrn_value | `MRN000095` |
| family_name | `Jorge` |
| given_names | `['Murphy', 'Brooklyn']` |
| suffixes | `['II']` |
| gender | `male` |
| birth_date | `1964-08-14` |
| telecom_phone | `(244) 825-8715` |
| address_line1 | `4832 N Walnut Street` |
| city | `Naderview` |
| state | `OR` |
| postal_code | `76320-7953` |
| country | `USA` |
| race_code | `2028-9` |
| race_display | `Asian` |
| ssn_value | `93567153551` |
| coverage_id | `coverage-mrn000095` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000095` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-14T19:05:08+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000095` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-06-14T19:05:08+00:00` |
| recorded_date | `2026-06-14T19:05:08+00:00` |
| provenance_id | `provenance-mrn000095` |
| provenance_recorded | `2026-06-14T19:05:08+00:00` |
| source_identifier_value | `MSG000110` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000096 - Hae, Svnny

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000096` |
| MRN | `MRN000096` |
| SSN | `98558230837` |
| Name | `Hae, Svnny Jordan` |
| Suffix | `SR` |
| Gender | `male` |
| Birth Date | `1971-03-05` |
| Address | `8726 Moor Lane, Pomona, IN 10438-1057, USA` |
| Phone | `(662) 911-3658` |
| Race | `2106-3 - White` |
| Coverage ID | `coverage-mrn000096` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Aetna` |
| Coverage Group | `` |
| Coverage Plan | `AE002` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000096` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-05-21T03:29:48Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000096` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-05-21T03:29:48Z` |
| Recorded Date | `2026-05-21T03:29:48Z` |
| Provenance ID | `provenance-mrn000096` |
| Provenance Recorded | `2026-05-21T03:29:48Z` |
| Source Message Control ID | `MSG000111` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000096` |
| mrn_value | `MRN000096` |
| family_name | `Hae` |
| given_names | `['Svnny', 'Jordan']` |
| suffixes | `['SR']` |
| gender | `male` |
| birth_date | `1971-03-05` |
| telecom_phone | `(662) 911-3658` |
| address_line1 | `8726 Moor Lane` |
| city | `Pomona` |
| state | `IN` |
| postal_code | `10438-1057` |
| country | `USA` |
| race_code | `2106-3` |
| race_display | `White` |
| ssn_value | `98558230837` |
| coverage_id | `coverage-mrn000096` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Aetna` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AE002` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000096` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-05-21T03:29:48+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000096` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-05-21T03:29:48+00:00` |
| recorded_date | `2026-05-21T03:29:48+00:00` |
| provenance_id | `provenance-mrn000096` |
| provenance_recorded | `2026-05-21T03:29:48+00:00` |
| source_identifier_value | `MSG000111` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000097 - Daugherty, Armani

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000097` |
| MRN | `MRN000097` |
| SSN | `84883577821` |
| Name | `Daugherty, Armani Austin` |
| Suffix | `II` |
| Gender | `female` |
| Birth Date | `1959-04-25` |
| Address | `48655 Ernestina Cliffs, East Jadafurt, IN 35775-3384, USA` |
| Phone | `(057) 141-1518` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000097` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Blue Cross Blue Shield` |
| Coverage Group | `` |
| Coverage Plan | `BC001` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000097` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-13T04:45:14Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000097` |
| Diagnosis | `I25.10 - Coronary artery disease` |
| Diagnosis Text | `Coronary artery disease` |
| Onset | `2026-06-13T04:45:14Z` |
| Recorded Date | `2026-06-13T04:45:14Z` |
| Provenance ID | `provenance-mrn000097` |
| Provenance Recorded | `2026-06-13T04:45:14Z` |
| Source Message Control ID | `MSG000112` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000097` |
| mrn_value | `MRN000097` |
| family_name | `Daugherty` |
| given_names | `['Armani', 'Austin']` |
| suffixes | `['II']` |
| gender | `female` |
| birth_date | `1959-04-25` |
| telecom_phone | `(057) 141-1518` |
| address_line1 | `48655 Ernestina Cliffs` |
| city | `East Jadafurt` |
| state | `IN` |
| postal_code | `35775-3384` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `84883577821` |
| coverage_id | `coverage-mrn000097` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Blue Cross Blue Shield` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `BC001` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000097` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-13T04:45:14+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000097` |
| diagnosis_code | `I25.10` |
| diagnosis_display | `Coronary artery disease` |
| diagnosis_text | `Coronary artery disease` |
| onset_datetime | `2026-06-13T04:45:14+00:00` |
| recorded_date | `2026-06-13T04:45:14+00:00` |
| provenance_id | `provenance-mrn000097` |
| provenance_recorded | `2026-06-13T04:45:14+00:00` |
| source_identifier_value | `MSG000112` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000098 - Schuster, Hillard

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000098` |
| MRN | `MRN000098` |
| SSN | `58665819448` |
| Name | `Schuster, Hillard Finley` |
| Suffix | `III` |
| Gender | `female` |
| Birth Date | `1999-03-08` |
| Address | `709 Bergnaum Ways, Luellamouth, VT 56653, USA` |
| Phone | `(710) 480-2841` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000098` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Anthem` |
| Coverage Group | `` |
| Coverage Plan | `AN007` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000098` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-18T07:58:51Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000098` |
| Diagnosis | `N18.3 - Chronic kidney disease` |
| Diagnosis Text | `Chronic kidney disease` |
| Onset | `2026-06-18T07:58:51Z` |
| Recorded Date | `2026-06-18T07:58:51Z` |
| Provenance ID | `provenance-mrn000098` |
| Provenance Recorded | `2026-06-18T07:58:51Z` |
| Source Message Control ID | `MSG000113` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000098` |
| mrn_value | `MRN000098` |
| family_name | `Schuster` |
| given_names | `['Hillard', 'Finley']` |
| suffixes | `['III']` |
| gender | `female` |
| birth_date | `1999-03-08` |
| telecom_phone | `(710) 480-2841` |
| address_line1 | `709 Bergnaum Ways` |
| city | `Luellamouth` |
| state | `VT` |
| postal_code | `56653` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `58665819448` |
| coverage_id | `coverage-mrn000098` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Anthem` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `AN007` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000098` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-18T07:58:51+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000098` |
| diagnosis_code | `N18.3` |
| diagnosis_display | `Chronic kidney disease` |
| diagnosis_text | `Chronic kidney disease` |
| onset_datetime | `2026-06-18T07:58:51+00:00` |
| recorded_date | `2026-06-18T07:58:51+00:00` |
| provenance_id | `provenance-mrn000098` |
| provenance_recorded | `2026-06-18T07:58:51+00:00` |
| source_identifier_value | `MSG000113` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000099 - Morissette, Ellen

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000099` |
| MRN | `MRN000099` |
| SSN | `86165339155` |
| Name | `Morissette, Ellen Sawyer` |
| Suffix | `III` |
| Gender | `male` |
| Birth Date | `1940-10-16` |
| Address | `43349 Chestnut Grove, Fort Pablo, SD 93411-2197, USA` |
| Phone | `(159) 975-4416` |
| Race | `2054-5 - Black or African American` |
| Coverage ID | `coverage-mrn000099` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicaid` |
| Coverage Group | `` |
| Coverage Plan | `MD009` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000099` |
| Encounter Status | `in-progress` |
| Encounter Class | `EMER - emergency` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-12T18:27:15Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000099` |
| Diagnosis | `K21.9 - GERD` |
| Diagnosis Text | `GERD` |
| Onset | `2026-06-12T18:27:15Z` |
| Recorded Date | `2026-06-12T18:27:15Z` |
| Provenance ID | `provenance-mrn000099` |
| Provenance Recorded | `2026-06-12T18:27:15Z` |
| Source Message Control ID | `MSG000114` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000099` |
| mrn_value | `MRN000099` |
| family_name | `Morissette` |
| given_names | `['Ellen', 'Sawyer']` |
| suffixes | `['III']` |
| gender | `male` |
| birth_date | `1940-10-16` |
| telecom_phone | `(159) 975-4416` |
| address_line1 | `43349 Chestnut Grove` |
| city | `Fort Pablo` |
| state | `SD` |
| postal_code | `93411-2197` |
| country | `USA` |
| race_code | `2054-5` |
| race_display | `Black or African American` |
| ssn_value | `86165339155` |
| coverage_id | `coverage-mrn000099` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicaid` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MD009` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000099` |
| encounter_status | `in-progress` |
| class_code | `EMER` |
| class_display | `emergency` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-12T18:27:15+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000099` |
| diagnosis_code | `K21.9` |
| diagnosis_display | `GERD` |
| diagnosis_text | `GERD` |
| onset_datetime | `2026-06-12T18:27:15+00:00` |
| recorded_date | `2026-06-12T18:27:15+00:00` |
| provenance_id | `provenance-mrn000099` |
| provenance_recorded | `2026-06-12T18:27:15+00:00` |
| source_identifier_value | `MSG000114` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---

### MRN000100 - Haag, Cecilia

#### FHIR JSON Content

| Section | Value |
|---|---|
| Patient ID | `patient-mrn000100` |
| MRN | `MRN000100` |
| SSN | `24348218233` |
| Name | `Haag, Cecilia Brooklyn` |
| Suffix | `` |
| Gender | `male` |
| Birth Date | `2006-09-03` |
| Address | `613 Jaden Squares, Nathanfield, IN 77364, USA` |
| Phone | `(693) 124-8260` |
| Race | `2076-8 - Native Hawaiian or Other Pacific Islander` |
| Coverage ID | `coverage-mrn000100` |
| Coverage Status | `active` |
| Coverage Type Text | `` |
| Coverage Payor | `Medicare` |
| Coverage Group | `` |
| Coverage Plan | `MC008` |
| Coverage Subscriber ID | `` |
| Coverage Period Start | `None` |
| Encounter ID | `encounter-mrn000100` |
| Encounter Status | `in-progress` |
| Encounter Class | `IMP - inpatient encounter` |
| Encounter Type Text | `ADT A01 admission (A0)` |
| Encounter Start | `2026-06-13T02:07:14Z` |
| Encounter Location | `4W / 401 / 01` |
| Encounter Practitioners | `ROBERT A SMITH, MARY B JONES` |
| Condition ID | `condition-mrn000100` |
| Diagnosis | `E11.9 - Type 2 diabetes mellitus` |
| Diagnosis Text | `Type 2 diabetes mellitus` |
| Onset | `2026-06-13T02:07:14Z` |
| Recorded Date | `2026-06-13T02:07:14Z` |
| Provenance ID | `provenance-mrn000100` |
| Provenance Recorded | `2026-06-13T02:07:14Z` |
| Source Message Control ID | `MSG000115` |

#### PostgreSQL Joined Result

| Joined Column | Value |
|---|---|
| patient_id | `patient-mrn000100` |
| mrn_value | `MRN000100` |
| family_name | `Haag` |
| given_names | `['Cecilia', 'Brooklyn']` |
| suffixes | `[]` |
| gender | `male` |
| birth_date | `2006-09-03` |
| telecom_phone | `(693) 124-8260` |
| address_line1 | `613 Jaden Squares` |
| city | `Nathanfield` |
| state | `IN` |
| postal_code | `77364` |
| country | `USA` |
| race_code | `2076-8` |
| race_display | `Native Hawaiian or Other Pacific Islander` |
| ssn_value | `24348218233` |
| coverage_id | `coverage-mrn000100` |
| coverage_status | `active` |
| type_text | `` |
| payor_display | `Medicare` |
| relationship_code | `self` |
| group_value | `` |
| plan_value | `MC008` |
| subscriber_id | `` |
| period_start | `None` |
| encounter_id | `encounter-mrn000100` |
| encounter_status | `in-progress` |
| class_code | `IMP` |
| class_display | `inpatient encounter` |
| encounter_type_text | `ADT A01 admission (A0)` |
| encounter_period_start | `2026-06-13T02:07:14+00:00` |
| location_display | `4W / 401 / 01` |
| organization_id | `organization-hospital` |
| condition_id | `condition-mrn000100` |
| diagnosis_code | `E11.9` |
| diagnosis_display | `Type 2 diabetes mellitus` |
| diagnosis_text | `Type 2 diabetes mellitus` |
| onset_datetime | `2026-06-13T02:07:14+00:00` |
| recorded_date | `2026-06-13T02:07:14+00:00` |
| provenance_id | `provenance-mrn000100` |
| provenance_recorded | `2026-06-13T02:07:14+00:00` |
| source_identifier_value | `MSG000115` |

#### Data Present in FHIR JSON but Not Loaded into Relational Columns

| FHIR Element | Reason / Notes |
|---|---|
| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |
| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |
| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |
| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |
| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |
| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |
| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |
| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |

---
