#!/usr/bin/env python3
"""
Standalone loader for hospital-admissions.fhir.json into PostgreSQL.

Artifacts used:
- Schema SQL:   ../database/fhir_schema.sql
- Source JSON:  ../data/hospital-admissions.fhir.json

This loader is intentionally separate from the production app.
It creates/uses the standalone fhir_demo schema only.
"""

import json
import os
import subprocess
from pathlib import Path
from typing import Any, Dict, List, Optional, Union

import psycopg2
from psycopg2.extras import Json


def parse_reference(reference: Any) -> Optional[str]:
    if not isinstance(reference, str) or not reference:
        return None
    return reference.split("/")[-1]


def get_nested(data: Union[Dict[str, Any], List[Any]], path: List[Any], default=None):
    current: Any = data
    for key in path:
        if isinstance(key, int):
            if not isinstance(current, list) or len(current) <= key:
                return default
            current = current[key]
        else:
            if not isinstance(current, dict) or key not in current:
                return default
            current = current[key]
    return current


def load_bundle(bundle_path: Path) -> Dict[str, Any]:
    with bundle_path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def apply_schema(schema_path: Path, db_config: Dict[str, str]) -> None:
    env = os.environ.copy()
    env["PGPASSWORD"] = db_config["password"]

    command = [
        "podman",
        "exec",
        "-i",
        "hl7-postgres",
        "psql",
        "-U",
        db_config["user"],
        "-d",
        db_config["dbname"],
    ]

    with schema_path.open("rb") as sql_file:
        result = subprocess.run(command, stdin=sql_file, env=env, capture_output=True, check=False)

    if result.returncode != 0:
        raise RuntimeError(
            "Failed to apply schema via podman/psql:\n"
            f"STDOUT:\n{result.stdout.decode()}\n"
            f"STDERR:\n{result.stderr.decode()}"
        )


def connect(db_config: Dict[str, str]):
    return psycopg2.connect(
        host=db_config["host"],
        port=db_config["port"],
        dbname=db_config["dbname"],
        user=db_config["user"],
        password=db_config["password"],
    )


def insert_bundle(cursor, bundle: Dict[str, Any]) -> None:
    cursor.execute(
        """
        INSERT INTO fhir_demo.bundle (
            bundle_id, identifier_system, identifier_value, bundle_type, bundle_timestamp, raw_json
        ) VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            bundle["id"],
            get_nested(bundle, ["identifier", "system"]),
            get_nested(bundle, ["identifier", "value"]),
            bundle["type"],
            bundle.get("timestamp"),
            Json(bundle),
        ),
    )


def insert_organization(cursor, bundle_id: str, resource: Dict[str, Any]) -> None:
    cursor.execute(
        """
        INSERT INTO fhir_demo.organization (
            organization_id, bundle_id, name, identifier_system, identifier_value, raw_json
        ) VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            resource["id"],
            bundle_id,
            resource.get("name"),
            get_nested(resource, ["identifier", 0, "system"]),
            get_nested(resource, ["identifier", 0, "value"]),
            Json(resource),
        ),
    )


def insert_patient(cursor, bundle_id: str, resource: Dict[str, Any]) -> None:
    cursor.execute(
        """
        INSERT INTO fhir_demo.patient (
            patient_id, bundle_id, mrn_system, mrn_value, ssn_system, ssn_value,
            family_name, given_names, suffixes, telecom_phone, gender, birth_date,
            address_line1, city, state, postal_code, country, race_code, race_display, raw_json
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            resource["id"],
            bundle_id,
            get_nested(resource, ["identifier", 0, "system"]),
            get_nested(resource, ["identifier", 0, "value"]),
            get_nested(resource, ["identifier", 1, "system"]),
            get_nested(resource, ["identifier", 1, "value"]),
            get_nested(resource, ["name", 0, "family"]),
            get_nested(resource, ["name", 0, "given"], []),
            get_nested(resource, ["name", 0, "suffix"], []),
            get_nested(resource, ["telecom", 0, "value"]),
            resource.get("gender"),
            resource.get("birthDate"),
            get_nested(resource, ["address", 0, "line", 0]),
            get_nested(resource, ["address", 0, "city"]),
            get_nested(resource, ["address", 0, "state"]),
            get_nested(resource, ["address", 0, "postalCode"]),
            get_nested(resource, ["address", 0, "country"]),
            get_nested(resource, ["extension", 0, "extension", 0, "valueCoding", "code"]),
            get_nested(resource, ["extension", 0, "extension", 0, "valueCoding", "display"]),
            Json(resource),
        ),
    )


def insert_practitioner(cursor, bundle_id: str, resource: Dict[str, Any]) -> None:
    cursor.execute(
        """
        INSERT INTO fhir_demo.practitioner (
            practitioner_id, bundle_id, npi_system, npi_value, family_name, given_names, prefixes, raw_json
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            resource["id"],
            bundle_id,
            get_nested(resource, ["identifier", 0, "system"]),
            get_nested(resource, ["identifier", 0, "value"]),
            get_nested(resource, ["name", 0, "family"]),
            get_nested(resource, ["name", 0, "given"], []),
            get_nested(resource, ["name", 0, "prefix"], []),
            Json(resource),
        ),
    )


def insert_coverage(cursor, bundle_id: str, resource: Dict[str, Any]) -> None:
    cursor.execute(
        """
        INSERT INTO fhir_demo.coverage (
            coverage_id, bundle_id, patient_id, status, type_text, payor_display,
            relationship_code, relationship_display, group_value, plan_value,
            subscriber_id, period_start, raw_json
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            resource["id"],
            bundle_id,
            parse_reference(get_nested(resource, ["beneficiary", "reference"])),
            resource.get("status"),
            get_nested(resource, ["type", "text"]),
            get_nested(resource, ["payor", 0, "display"]),
            get_nested(resource, ["relationship", "coding", 0, "code"]),
            get_nested(resource, ["relationship", "coding", 0, "display"]),
            get_nested(resource, ["class", 0, "value"]),
            get_nested(resource, ["class", 1, "value"]),
            resource.get("subscriberId"),
            get_nested(resource, ["period", "start"]),
            Json(resource),
        ),
    )


def insert_encounter(cursor, bundle_id: str, resource: Dict[str, Any]) -> None:
    cursor.execute(
        """
        INSERT INTO fhir_demo.encounter (
            encounter_id, bundle_id, patient_id, organization_id, status, class_system,
            class_code, class_display, type_text, period_start, location_display,
            reason_condition_id, raw_json
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            resource["id"],
            bundle_id,
            parse_reference(get_nested(resource, ["subject", "reference"])),
            parse_reference(get_nested(resource, ["serviceProvider", "reference"])),
            resource.get("status"),
            get_nested(resource, ["class", "system"]),
            get_nested(resource, ["class", "code"]),
            get_nested(resource, ["class", "display"]),
            get_nested(resource, ["type", 0, "text"]),
            get_nested(resource, ["period", "start"]),
            get_nested(resource, ["location", 0, "location", "display"]),
            parse_reference(get_nested(resource, ["reason", 0, "value", "reference"])),
            Json(resource),
        ),
    )

    participants = resource.get("participant", [])
    for order, participant in enumerate(participants, start=1):
        cursor.execute(
            """
            INSERT INTO fhir_demo.encounter_participant (
                encounter_id, practitioner_id, participant_order
            ) VALUES (%s, %s, %s)
            """,
            (
                resource["id"],
                parse_reference(get_nested(participant, ["individual", "reference"])),
                order,
            ),
        )


def insert_condition(cursor, bundle_id: str, resource: Dict[str, Any]) -> None:
    cursor.execute(
        """
        INSERT INTO fhir_demo.condition (
            condition_id, bundle_id, patient_id, encounter_id, clinical_status_code,
            verification_status_code, category_code, diagnosis_system, diagnosis_code,
            diagnosis_display, diagnosis_text, onset_datetime, recorded_date, raw_json
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            resource["id"],
            bundle_id,
            parse_reference(get_nested(resource, ["subject", "reference"])),
            parse_reference(get_nested(resource, ["encounter", "reference"])),
            get_nested(resource, ["clinicalStatus", "coding", 0, "code"]),
            get_nested(resource, ["verificationStatus", "coding", 0, "code"]),
            get_nested(resource, ["category", 0, "coding", 0, "code"]),
            get_nested(resource, ["code", "coding", 0, "system"]),
            get_nested(resource, ["code", "coding", 0, "code"]),
            get_nested(resource, ["code", "coding", 0, "display"]),
            get_nested(resource, ["code", "text"]),
            resource.get("onsetDateTime"),
            resource.get("recordedDate"),
            Json(resource),
        ),
    )


def insert_provenance(cursor, bundle_id: str, resource: Dict[str, Any]) -> None:
    cursor.execute(
        """
        INSERT INTO fhir_demo.provenance (
            provenance_id, bundle_id, recorded, activity_code,
            source_identifier_system, source_identifier_value, source_display, raw_json
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            resource["id"],
            bundle_id,
            resource.get("recorded"),
            get_nested(resource, ["activity", "coding", 0, "code"]),
            get_nested(resource, ["entity", 0, "what", "identifier", "system"]),
            get_nested(resource, ["entity", 0, "what", "identifier", "value"]),
            get_nested(resource, ["entity", 0, "what", "display"]),
            Json(resource),
        ),
    )

    for order, target in enumerate(resource.get("target", []), start=1):
        cursor.execute(
            """
            INSERT INTO fhir_demo.provenance_target (
                provenance_id, target_reference, target_order
            ) VALUES (%s, %s, %s)
            """,
            (
                resource["id"],
                target.get("reference"),
                order,
            ),
        )


def load_resources(cursor, bundle: Dict[str, Any]) -> None:
    bundle_id = bundle["id"]
    insert_bundle(cursor, bundle)

    for entry in bundle.get("entry", []):
        resource = entry["resource"]
        resource_type = resource["resourceType"]

        if resource_type == "Organization":
            insert_organization(cursor, bundle_id, resource)
        elif resource_type == "Patient":
            insert_patient(cursor, bundle_id, resource)
        elif resource_type == "Practitioner":
            insert_practitioner(cursor, bundle_id, resource)
        elif resource_type == "Coverage":
            insert_coverage(cursor, bundle_id, resource)
        elif resource_type == "Encounter":
            insert_encounter(cursor, bundle_id, resource)
        elif resource_type == "Condition":
            insert_condition(cursor, bundle_id, resource)
        elif resource_type == "Provenance":
            insert_provenance(cursor, bundle_id, resource)


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    schema_path = project_root / "database" / "fhir_schema.sql"
    bundle_path = project_root / "data" / "hospital-admissions.fhir.json"

    db_config = {
        "host": os.getenv("DB_HOST", "127.0.0.1"),
        "port": os.getenv("DB_PORT", "5432"),
        "dbname": os.getenv("DB_NAME", "hl7_matching"),
        "user": os.getenv("DB_USER", "postgres"),
        "password": os.getenv("DB_PASSWORD", "postgres"),
    }

    bundle = load_bundle(bundle_path)
    apply_schema(schema_path, db_config)

    with connect(db_config) as connection:
        with connection.cursor() as cursor:
            load_resources(cursor, bundle)
        connection.commit()

    print(f"Loaded bundle {bundle['id']} into schema fhir_demo from {bundle_path}")


if __name__ == "__main__":
    main()

# Made with Bob
