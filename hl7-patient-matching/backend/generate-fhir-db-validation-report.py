#!/usr/bin/env python3
"""
Standalone generator for the business-facing FHIR JSON to PostgreSQL validation report.

Purpose
=======
This utility creates a markdown document that lets a business user validate:
1. What exists in the generated FHIR JSON bundle
2. What was loaded into the standalone PostgreSQL schema
3. What the relational joins look like after load
4. What data was preserved in raw JSON but not flattened into relational columns

Architecture flow
=================

    hospital-admissions.fhir.json
                +
         PostgreSQL schema fhir_demo
                |
                v
    generate-fhir-db-validation-report.py
        - reads the FHIR Bundle JSON
        - groups resources by type and patient
        - queries PostgreSQL for joined relational results
        - compares source FHIR content to loaded DB content
        - emits a business-readable markdown report
                |
                v
    generated_md_docs/FHIR_DB_VALIDATION_REPORT.md

Standalone scope
================
This script does not modify the production app.
It only reads:
- ../data/hospital-admissions.fhir.json
- PostgreSQL schema fhir_demo in database hl7_matching

It writes:
- ../generated_md_docs/FHIR_DB_VALIDATION_REPORT.md

Developer maintenance notes
===========================
- If the FHIR JSON structure changes, update the resource extraction logic.
- If the PostgreSQL schema changes, update the SQL join query and markdown fields.
- If business users want different sections or formatting, update build_report_lines().
"""

import json
import os
import subprocess
from pathlib import Path
from typing import Any, Dict, List, Optional


def load_bundle(bundle_path: Path) -> Dict[str, Any]:
    """Load the generated FHIR Bundle JSON from disk."""
    with bundle_path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def ref_id(reference: Optional[str]) -> Optional[str]:
    """Convert a FHIR reference like 'Patient/patient-mrn000001' into 'patient-mrn000001'."""
    if not reference:
        return None
    return reference.split("/")[-1]


def group_resources(entries: List[Dict[str, Any]]) -> Dict[str, Dict[str, Dict[str, Any]]]:
    """
    Group Bundle.entry resources by resourceType and id.

    Result shape:
    {
      "Patient": {"patient-mrn000001": {...}},
      "Coverage": {"coverage-mrn000001": {...}},
      ...
    }
    """
    grouped: Dict[str, Dict[str, Dict[str, Any]]] = {}
    for entry in entries:
        resource = entry["resource"]
        resource_type = resource["resourceType"]
        grouped.setdefault(resource_type, {})
        grouped[resource_type][resource["id"]] = resource
    return grouped


def fetch_joined_rows() -> List[Dict[str, Any]]:
    """
    Query the standalone PostgreSQL schema and return one joined row per patient.

    The query intentionally mirrors the business validation view:
    patient + coverage + encounter + condition + provenance
    """
    sql = r"""
WITH joined AS (
  SELECT
    p.patient_id,
    p.mrn_value,
    p.family_name,
    p.given_names,
    p.suffixes,
    p.gender,
    p.birth_date,
    p.telecom_phone,
    p.address_line1,
    p.city,
    p.state,
    p.postal_code,
    p.country,
    p.race_code,
    p.race_display,
    p.ssn_value,
    cov.coverage_id,
    cov.status AS coverage_status,
    cov.type_text,
    cov.payor_display,
    cov.relationship_code,
    cov.group_value,
    cov.plan_value,
    cov.subscriber_id,
    cov.period_start,
    e.encounter_id,
    e.status AS encounter_status,
    e.class_code,
    e.class_display,
    e.type_text AS encounter_type_text,
    e.period_start AS encounter_period_start,
    e.location_display,
    e.organization_id,
    c.condition_id,
    c.diagnosis_code,
    c.diagnosis_display,
    c.diagnosis_text,
    c.onset_datetime,
    c.recorded_date,
    pr.provenance_id,
    pr.recorded AS provenance_recorded,
    pr.source_identifier_value
  FROM fhir_demo.patient p
  LEFT JOIN fhir_demo.coverage cov ON cov.patient_id = p.patient_id
  LEFT JOIN fhir_demo.encounter e ON e.patient_id = p.patient_id
  LEFT JOIN fhir_demo.condition c ON c.encounter_id = e.encounter_id
  LEFT JOIN fhir_demo.provenance pr
    ON pr.provenance_id = ('provenance-' || replace(lower(p.mrn_value), ' ', ''))
  ORDER BY p.mrn_value
)
SELECT row_to_json(joined) FROM joined;
"""

    command = [
        "podman",
        "exec",
        "-e",
        f"PGPASSWORD={os.getenv('DB_PASSWORD', 'postgres')}",
        "hl7-postgres",
        "psql",
        "-U",
        os.getenv("DB_USER", "postgres"),
        "-d",
        os.getenv("DB_NAME", "hl7_matching"),
        "-t",
        "-A",
        "-c",
        sql,
    ]

    result = subprocess.run(command, capture_output=True, text=True, check=True)
    return [json.loads(line) for line in result.stdout.splitlines() if line.strip()]


def build_summary_lines(grouped: Dict[str, Dict[str, Dict[str, Any]]], bundle: Dict[str, Any], bundle_path: Path) -> List[str]:
    """Build the report header and summary section."""
    lines: List[str] = []
    lines.append("# FHIR JSON to PostgreSQL Validation Report")
    lines.append("")
    lines.append("Standalone validation artifact for business review.")
    lines.append("")
    lines.append("## Scope")
    lines.append("")
    lines.append(f"- Source FHIR file: `{bundle_path}`")
    lines.append("- Database schema: `fhir_demo`")
    lines.append("- Database container: `hl7-postgres`")
    lines.append(f"- Bundle id: `{bundle['id']}`")
    lines.append(f"- Bundle type: `{bundle['type']}`")
    lines.append(f"- Bundle timestamp: `{bundle.get('timestamp')}`")
    lines.append(f"- Patient records reviewed: `{len(grouped.get('Patient', {}))}`")
    lines.append("")
    lines.append("## Summary Counts")
    lines.append("")
    lines.append("| Resource/Table | Count |")
    lines.append("|---|---:|")
    lines.append(f"| Patient | {len(grouped.get('Patient', {}))} |")
    lines.append(f"| Practitioner | {len(grouped.get('Practitioner', {}))} |")
    lines.append(f"| Coverage | {len(grouped.get('Coverage', {}))} |")
    lines.append(f"| Encounter | {len(grouped.get('Encounter', {}))} |")
    lines.append(f"| Condition | {len(grouped.get('Condition', {}))} |")
    lines.append(f"| Provenance | {len(grouped.get('Provenance', {}))} |")
    lines.append("")
    lines.append("## Record-by-Record Validation")
    lines.append("")
    return lines


def build_report_lines(bundle: Dict[str, Any], grouped: Dict[str, Dict[str, Dict[str, Any]]], db_rows: List[Dict[str, Any]]) -> List[str]:
    """
    Build the full markdown report.

    For each patient:
    - show source FHIR JSON values
    - show resulting PostgreSQL joined values
    - show what was not flattened into relational columns
    """
    patients = grouped.get("Patient", {})
    practitioners = grouped.get("Practitioner", {})
    coverages = grouped.get("Coverage", {})
    encounters = grouped.get("Encounter", {})
    conditions = grouped.get("Condition", {})
    provenances = grouped.get("Provenance", {})

    db_by_patient = {row["patient_id"]: row for row in db_rows}
    lines = build_summary_lines(grouped, bundle, Path("../data/hospital-admissions.fhir.json"))

    for patient_id in sorted(patients):
        patient = patients[patient_id]
        mrn = patient["identifier"][0]["value"]
        coverage = coverages.get(f"coverage-{mrn.lower()}")
        encounter = encounters.get(f"encounter-{mrn.lower()}")
        condition = conditions.get(f"condition-{mrn.lower()}")
        provenance = provenances.get(f"provenance-{mrn.lower()}")
        db_row = db_by_patient.get(patient_id)

        practitioner_names: List[str] = []
        if encounter:
            for participant in encounter.get("participant", []):
                practitioner_id = ref_id(participant.get("individual", {}).get("reference"))
                practitioner = practitioners.get(practitioner_id) if practitioner_id else None
                if practitioner:
                    name = practitioner.get("name", [{}])[0]
                    practitioner_names.append(
                        " ".join([*(name.get("given") or []), name.get("family", "")]).strip()
                    )

        patient_name = patient["name"][0]
        lines.append(
            f"### {mrn} - {patient_name.get('family', '')}, {(patient_name.get('given') or [''])[0]}"
        )
        lines.append("")
        lines.append("#### FHIR JSON Content")
        lines.append("")
        lines.append("| Section | Value |")
        lines.append("|---|---|")
        lines.append(f"| Patient ID | `{patient_id}` |")
        lines.append(f"| MRN | `{mrn}` |")
        lines.append(f"| SSN | `{patient['identifier'][1].get('value')}` |")
        lines.append(
            f"| Name | `{patient_name.get('family')}, {' '.join(patient_name.get('given', []))}` |"
        )
        lines.append(f"| Suffix | `{', '.join(patient_name.get('suffix', []))}` |")
        lines.append(f"| Gender | `{patient.get('gender')}` |")
        lines.append(f"| Birth Date | `{patient.get('birthDate')}` |")

        address = patient.get("address", [{}])[0]
        lines.append(
            f"| Address | `{', '.join(address.get('line', []))}, {address.get('city')}, "
            f"{address.get('state')} {address.get('postalCode')}, {address.get('country')}` |"
        )
        lines.append(f"| Phone | `{patient.get('telecom', [{}])[0].get('value')}` |")

        race_extensions = patient.get("extension", [{}])[0].get("extension", [])
        race_code = race_extensions[0].get("valueCoding", {}).get("code") if race_extensions else ""
        race_display = race_extensions[0].get("valueCoding", {}).get("display") if race_extensions else ""
        lines.append(f"| Race | `{race_code} - {race_display}` |")

        if coverage:
            lines.append(f"| Coverage ID | `{coverage.get('id')}` |")
            lines.append(f"| Coverage Status | `{coverage.get('status')}` |")
            lines.append(f"| Coverage Type Text | `{coverage.get('type', {}).get('text')}` |")
            lines.append(f"| Coverage Payor | `{coverage.get('payor', [{}])[0].get('display')}` |")
            lines.append(f"| Coverage Group | `{coverage.get('class', [{}])[0].get('value')}` |")
            lines.append(
                f"| Coverage Plan | `{coverage.get('class', [{}, {}])[1].get('value') if len(coverage.get('class', [])) > 1 else ''}` |"
            )
            lines.append(f"| Coverage Subscriber ID | `{coverage.get('subscriberId')}` |")
            lines.append(f"| Coverage Period Start | `{coverage.get('period', {}).get('start')}` |")

        if encounter:
            lines.append(f"| Encounter ID | `{encounter.get('id')}` |")
            lines.append(f"| Encounter Status | `{encounter.get('status')}` |")
            lines.append(
                f"| Encounter Class | `{encounter.get('class', {}).get('code')} - {encounter.get('class', {}).get('display')}` |"
            )
            lines.append(f"| Encounter Type Text | `{encounter.get('type', [{}])[0].get('text')}` |")
            lines.append(f"| Encounter Start | `{encounter.get('period', {}).get('start')}` |")
            lines.append(
                f"| Encounter Location | `{encounter.get('location', [{}])[0].get('location', {}).get('display')}` |"
            )
            lines.append(f"| Encounter Practitioners | `{', '.join(practitioner_names)}` |")

        if condition:
            lines.append(f"| Condition ID | `{condition.get('id')}` |")
            lines.append(
                f"| Diagnosis | `{condition.get('code', {}).get('coding', [{}])[0].get('code')} - "
                f"{condition.get('code', {}).get('coding', [{}])[0].get('display')}` |"
            )
            lines.append(f"| Diagnosis Text | `{condition.get('code', {}).get('text')}` |")
            lines.append(f"| Onset | `{condition.get('onsetDateTime')}` |")
            lines.append(f"| Recorded Date | `{condition.get('recordedDate')}` |")

        if provenance:
            lines.append(f"| Provenance ID | `{provenance.get('id')}` |")
            lines.append(f"| Provenance Recorded | `{provenance.get('recorded')}` |")
            lines.append(
                f"| Source Message Control ID | `{provenance.get('entity', [{}])[0].get('what', {}).get('identifier', {}).get('value')}` |"
            )

        lines.append("")
        lines.append("#### PostgreSQL Joined Result")
        lines.append("")
        lines.append("| Joined Column | Value |")
        lines.append("|---|---|")

        if db_row:
            ordered_keys = [
                "patient_id",
                "mrn_value",
                "family_name",
                "given_names",
                "suffixes",
                "gender",
                "birth_date",
                "telecom_phone",
                "address_line1",
                "city",
                "state",
                "postal_code",
                "country",
                "race_code",
                "race_display",
                "ssn_value",
                "coverage_id",
                "coverage_status",
                "type_text",
                "payor_display",
                "relationship_code",
                "group_value",
                "plan_value",
                "subscriber_id",
                "period_start",
                "encounter_id",
                "encounter_status",
                "class_code",
                "class_display",
                "encounter_type_text",
                "encounter_period_start",
                "location_display",
                "organization_id",
                "condition_id",
                "diagnosis_code",
                "diagnosis_display",
                "diagnosis_text",
                "onset_datetime",
                "recorded_date",
                "provenance_id",
                "provenance_recorded",
                "source_identifier_value",
            ]
            for key in ordered_keys:
                lines.append(f"| {key} | `{db_row.get(key)}` |")
        else:
            lines.append("| status | `No joined database row found` |")

        lines.append("")
        lines.append("#### Data Present in FHIR JSON but Not Loaded into Relational Columns")
        lines.append("")
        lines.append("| FHIR Element | Reason / Notes |")
        lines.append("|---|---|")
        lines.append("| `Bundle.entry.fullUrl` | Preserved only in source JSON, not normalized into relational tables |")
        lines.append("| Full raw resource structure | Preserved in each table `raw_json` column rather than flattened completely |")
        lines.append("| Practitioner participant role semantics | Participant order loaded, but no explicit role column exists in current schema |")
        lines.append("| Provenance target references as typed FHIR references | Stored in `provenance_target.target_reference`, not decomposed by resource type |")
        lines.append("| Additional nested arrays not explicitly modeled | Available in `raw_json` for audit and future schema expansion |")

        if coverage and not coverage.get("type", {}).get("text"):
            lines.append("| Coverage type text | Source FHIR JSON contains blank value; nothing additional was available to load |")
        if coverage and not coverage.get("subscriberId"):
            lines.append("| Coverage subscriberId | Source FHIR JSON contains blank value; nothing additional was available to load |")
        if encounter and "A0" in (encounter.get("type", [{}])[0].get("text") or ""):
            lines.append("| Encounter type display | Loaded exactly as present in FHIR JSON; current source mapping appears to carry `A0` instead of a business-friendly admit type |")

        lines.append("")
        lines.append("---")
        lines.append("")

    return lines


def main() -> None:
    """
    Orchestration flow:
    1. Read the generated FHIR Bundle JSON
    2. Group resources by type/id for fast lookup
    3. Query PostgreSQL for joined relational results
    4. Build markdown lines for business validation
    5. Write the standalone markdown report to generated_md_docs
    """
    project_root = Path(__file__).resolve().parents[1]
    bundle_path = project_root / "data" / "hospital-admissions.fhir.json"
    output_path = project_root / "generated_md_docs" / "FHIR_DB_VALIDATION_REPORT.md"

    bundle = load_bundle(bundle_path)
    grouped = group_resources(bundle["entry"])
    db_rows = fetch_joined_rows()
    lines = build_report_lines(bundle, grouped, db_rows)

    output_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()

# Made with Bob
