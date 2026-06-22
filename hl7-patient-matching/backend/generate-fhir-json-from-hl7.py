#!/usr/bin/env python3
"""
Standalone HL7 v2 ADT -> FHIR JSON generator.

Architecture flow diagram
=========================

    hospital-admissions.hl7
              |
              v
    parse_hl7_messages()
      - normalizes segment separators
      - splits the file into one HL7 message per MSH segment
              |
              v
    convert_message_to_resources()
      - reads MSH / EVN / PID / PV1 / IN1 / DG1
      - extracts patient, visit, insurance, and diagnosis data
      - transforms one HL7 message into a small FHIR resource set
              |
              +--> Patient
              +--> Practitioner (attending)
              +--> Practitioner (referring)
              +--> Coverage
              +--> Encounter
              +--> Condition
              +--> Provenance
              |
              v
    build_bundle()
      - wraps all generated resources in one FHIR Bundle
      - adds a shared Organization resource for the hospital
              |
              v
    hospital-admissions.fhir.json

Developer modification notes
============================

1. If the HL7 feed changes:
   - update field indexes inside convert_message_to_resources()
   - add support for new segments before building resources

2. If the FHIR target changes:
   - update the resource builders in convert_message_to_resources()
   - add or remove resources from the returned list

3. If the output packaging changes:
   - update build_bundle()
   - update main() if you want transaction bundles, NDJSON, or one file per patient

4. This script is intentionally standalone:
   - it does not modify the production app
   - it reads from data/hospital-admissions.hl7
   - it writes to data/hospital-admissions.fhir.json
"""
import json
import uuid
from pathlib import Path
from typing import Optional


RACE_MAP = {
    "2106-3": {"code": "2106-3", "display": "White"},
    "2054-5": {"code": "2054-5", "display": "Black or African American"},
    "2028-9": {"code": "2028-9", "display": "Asian"},
    "2076-8": {"code": "2076-8", "display": "Native Hawaiian or Other Pacific Islander"},
}

PATIENT_CLASS_MAP = {
    "I": {"code": "IMP", "display": "inpatient encounter"},
    "E": {"code": "EMER", "display": "emergency"},
}

ADMISSION_TYPE_MAP = {
    "R": {"code": "ROUTINE", "display": "Routine"},
    "E": {"code": "EMER", "display": "Emergency"},
    "U": {"code": "URGENT", "display": "Urgent"},
    "N": {"code": "ELECT", "display": "Elective"},
}


# HL7 timestamps are commonly YYYYMMDD or YYYYMMDDHHMMSS.
# This helper converts those compact HL7 values into FHIR-friendly ISO-like strings.
# If a future feed includes timezone offsets or fractional seconds, extend this function first.
def ts(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    if len(value) == 8:
        return f"{value[0:4]}-{value[4:6]}-{value[6:8]}"
    if len(value) >= 14:
        return f"{value[0:4]}-{value[4:6]}-{value[6:8]}T{value[8:10]}:{value[10:12]}:{value[12:14]}Z"
    return value


# HL7 fields often contain component values separated by "^".
# Example:
#   PID-5 = Bashirian^Julianne^Austin^^II
# becomes:
#   [family, given, middle, prefix, suffix]
def split_components(field: str) -> list[str]:
    return field.split("^") if field else []


# The source file contains many HL7 messages concatenated together.
# Each message starts with MSH, so we split on that boundary after normalizing line endings.
# If a future source uses a different framing strategy, replace this parser before touching
# the downstream transformation logic.
def parse_hl7_messages(text: str) -> list[str]:
    raw = text.replace("\n", "\r")
    chunks = [chunk.strip() for chunk in raw.split("MSH|") if chunk.strip()]
    return [f"MSH|{chunk}" for chunk in chunks]


# Creates the top-level FHIR Bundle container.
# Current choice: Bundle.type = "collection" because this is a standalone export artifact.
# If a downstream system expects transaction or batch semantics, change the type here and
# add request metadata to each entry in main().
def build_bundle() -> dict:
    return {
        "resourceType": "Bundle",
        "id": str(uuid.uuid4()),
        "identifier": {
            "system": "urn:ietf:rfc:3986",
            "value": f"urn:uuid:{uuid.uuid4()}",
        },
        "type": "collection",
        "entry": [],
    }


# Shared Organization resource referenced by all Encounter resources.
# Keeping this centralized avoids duplicating the same hospital object 100 times.
def build_organization() -> dict:
    return {
        "resourceType": "Organization",
        "id": "organization-hospital",
        "identifier": [
            {
                "system": "urn:id:facility",
                "value": "HOSPITAL",
            }
        ],
        "name": "HOSPITAL",
    }


# Core transformation function.
#
# HL7 -> FHIR mapping summary used in this script:
#   MSH -> Provenance metadata, message timestamp, control id
#   EVN -> Encounter event timing fallback
#   PID -> Patient demographics and identifiers
#   PV1 -> Encounter class, participants, and location
#   IN1 -> Coverage / insurance details
#   DG1 -> Condition / diagnosis
#
# This function is the primary place a developer should edit when:
#   - HL7 field positions change
#   - new FHIR resources are needed
#   - existing mappings need to be corrected or enriched
def convert_message_to_resources(message: str, index: int) -> list[dict]:
    # Build a segment dictionary so each HL7 segment can be accessed by name.
    # Example: segments["PID"][0] is the first PID segment in the message.
    segments = {}
    for segment in [s for s in message.split("\r") if s.strip()]:
        parts = segment.split("|")
        segments.setdefault(parts[0], []).append(parts)

    msh = segments["MSH"][0]
    evn = segments.get("EVN", [["EVN", "", msh[6]]])[0]
    pid = segments["PID"][0]
    pv1 = segments["PV1"][0]
    in1 = segments["IN1"][0]
    dg1 = segments["DG1"][0]

    # Message-level metadata used for traceability and timestamps.
    message_control_id = msh[9]
    message_time = ts(msh[6])
    event_time = ts(evn[2]) if len(evn) > 2 else message_time

    # PID-3 usually carries the MRN and assigning authority.
    # We use that to create stable Patient/Coverage/Encounter/Condition ids.
    pid3 = split_components(pid[3])
    mrn = pid3[0]
    mrn_assigner = pid3[3] if len(pid3) > 3 else "HOSPITAL"

    patient_name = split_components(pid[5])
    patient_address = split_components(pid[11])
    race = RACE_MAP.get(pid[10], {"code": pid[10], "display": pid[10]})
    gender = {"M": "male", "F": "female"}.get(pid[8], "unknown")

    patient_id = f"patient-{mrn.lower()}"
    coverage_id = f"coverage-{mrn.lower()}"
    encounter_id = f"encounter-{mrn.lower()}"
    condition_id = f"condition-{mrn.lower()}"
    attending_practitioner_id = f"practitioner-attending-{index}"
    referring_practitioner_id = f"practitioner-referring-{index}"

    # Patient resource:
    # - PID-3 -> identifier (MRN)
    # - PID-19 -> SSN
    # - PID-5 -> name
    # - PID-7 -> birthDate
    # - PID-8 -> gender
    # - PID-10 -> race extension
    # - PID-11 -> address
    # - PID-13 -> telecom
    patient = {
        "resourceType": "Patient",
        "id": patient_id,
        "identifier": [
            {
                "use": "usual",
                "type": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                            "code": "MR",
                            "display": "Medical record number",
                        }
                    ]
                },
                "system": f"urn:id:{mrn_assigner.lower()}",
                "value": mrn,
            },
            {
                "type": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                            "code": "SS",
                            "display": "Social Security number",
                        }
                    ]
                },
                "system": "http://hl7.org/fhir/sid/us-ssn",
                "value": pid[19],
            },
        ],
        "name": [
            {
                "use": "official",
                "family": patient_name[0] if len(patient_name) > 0 else "",
                "given": [value for value in patient_name[1:3] if value],
                **({"suffix": [patient_name[4]]} if len(patient_name) > 4 and patient_name[4] else {}),
            }
        ],
        "telecom": [
            {
                "system": "phone",
                "value": pid[13],
                "use": "home",
            }
        ],
        "gender": gender,
        "birthDate": ts(pid[7]),
        "address": [
            {
                "use": "home",
                "line": [patient_address[0]] if len(patient_address) > 0 and patient_address[0] else [],
                "city": patient_address[2] if len(patient_address) > 2 else "",
                "state": patient_address[3] if len(patient_address) > 3 else "",
                "postalCode": patient_address[4] if len(patient_address) > 4 else "",
                "country": patient_address[5] if len(patient_address) > 5 else "",
            }
        ],
        "extension": [
            {
                "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
                "extension": [
                    {
                        "url": "ombCategory",
                        "valueCoding": {
                            "system": "urn:oid:2.16.840.1.113883.6.238",
                            "code": race["code"],
                            "display": race["display"],
                        },
                    },
                    {
                        "url": "text",
                        "valueString": race["display"],
                    },
                ],
            }
        ],
    }

    # PV1-7 and PV1-8 contain provider references.
    # This script materializes them as Practitioner resources so Encounter.participant
    # can reference concrete FHIR resources instead of plain text.
    attending = split_components(pv1[7])
    referring = split_components(pv1[8])

    attending_practitioner = {
        "resourceType": "Practitioner",
        "id": attending_practitioner_id,
        "identifier": [
            {
                "system": "http://hl7.org/fhir/sid/us-npi",
                "value": attending[12] if len(attending) > 12 and attending[12] else attending[0],
            }
        ],
        "name": [
            {
                "family": attending[1] if len(attending) > 1 else "",
                "given": [value for value in attending[2:4] if value],
                "prefix": [attending[5]] if len(attending) > 5 and attending[5] else [],
            }
        ],
    }

    referring_practitioner = {
        "resourceType": "Practitioner",
        "id": referring_practitioner_id,
        "identifier": [
            {
                "system": "http://hl7.org/fhir/sid/us-npi",
                "value": referring[12] if len(referring) > 12 and referring[12] else referring[0],
            }
        ],
        "name": [
            {
                "family": referring[1] if len(referring) > 1 else "",
                "given": [value for value in referring[2:4] if value],
                "prefix": [referring[5]] if len(referring) > 5 and referring[5] else [],
            }
        ],
    }

    # Coverage resource:
    # sourced from IN1 insurance data.
    #
    # Important developer note:
    # HL7 IN1 indexing is implementation-sensitive and this file may need refinement
    # if the source feed changes. If insurance values look misaligned in output,
    # verify the exact IN1 field positions against the sending system's HL7 profile.
    coverage = {
        "resourceType": "Coverage",
        "id": coverage_id,
        "status": "active",
        "type": {
            "text": in1[15],
        },
        "subscriber": {
            "reference": f"Patient/{patient_id}",
        },
        "beneficiary": {
            "reference": f"Patient/{patient_id}",
        },
        "relationship": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
                    "code": "self",
                    "display": "Self",
                }
            ]
        },
        "payor": [
            {
                "display": in1[4],
            }
        ],
        "class": [
            {
                "type": {"text": "group"},
                "value": in1[8],
            },
            {
                "type": {"text": "plan"},
                "value": in1[2],
            },
        ],
        "subscriberId": in1[36],
        "period": {
            "start": ts(in1[12]),
        },
    }

    # Encounter and Condition are derived from PV1 and DG1.
    # Encounter represents the admission/visit.
    # Condition represents the diagnosis associated with that visit.
    diagnosis = split_components(dg1[3])
    patient_class = PATIENT_CLASS_MAP.get(pv1[2], {"code": "AMB", "display": "ambulatory"})
    admission_type = ADMISSION_TYPE_MAP.get(pv1[14], {"code": pv1[14], "display": pv1[14]})
    location = split_components(pv1[3])

    # Encounter resource:
    # - PV1-2  -> encounter class
    # - PV1-3  -> location
    # - PV1-7/8 -> participants
    # - PV1-14 -> admission type mapping used in display text
    # - EVN/MSH -> timing
    encounter = {
        "resourceType": "Encounter",
        "id": encounter_id,
        "status": "in-progress",
        "class": {
            "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            "code": patient_class["code"],
            "display": patient_class["display"],
        },
        "type": [
            {
                "text": f"ADT A01 admission ({admission_type['display']})",
            }
        ],
        "subject": {
            "reference": f"Patient/{patient_id}",
        },
        "participant": [
            {
                "individual": {
                    "reference": f"Practitioner/{attending_practitioner_id}",
                }
            },
            {
                "individual": {
                    "reference": f"Practitioner/{referring_practitioner_id}",
                }
            },
        ],
        "period": {
            "start": event_time or message_time,
        },
        "location": [
            {
                "location": {
                    "display": " / ".join([value for value in location[:3] if value]),
                }
            }
        ],
        "serviceProvider": {
            "reference": "Organization/organization-hospital",
        },
        "reason": [
            {
                "value": {
                    "reference": f"Condition/{condition_id}",
                }
            }
        ],
    }

    # Condition resource:
    # - DG1-3 -> diagnosis code and display
    # - DG1-5 -> onset date/time
    # - linked back to Patient and Encounter
    condition = {
        "resourceType": "Condition",
        "id": condition_id,
        "clinicalStatus": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                    "code": "active",
                }
            ]
        },
        "verificationStatus": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                    "code": "confirmed",
                }
            ]
        },
        "category": [
            {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                        "code": "encounter-diagnosis",
                    }
                ]
            }
        ],
        "code": {
            "coding": [
                {
                    "system": "http://hl7.org/fhir/sid/icd-10-cm",
                    "code": diagnosis[0],
                    "display": diagnosis[1] if len(diagnosis) > 1 else "",
                }
            ],
            "text": diagnosis[1] if len(diagnosis) > 1 else diagnosis[0],
        },
        "subject": {
            "reference": f"Patient/{patient_id}",
        },
        "encounter": {
            "reference": f"Encounter/{encounter_id}",
        },
        "onsetDateTime": ts(dg1[5]) or event_time or message_time,
        "recordedDate": event_time or message_time,
    }

    # Provenance resource:
    # preserves the relationship back to the original HL7 message control id.
    # This is useful when debugging transformations or reconciling source data.
    provenance = {
        "resourceType": "Provenance",
        "id": f"provenance-{mrn.lower()}",
        "recorded": message_time,
        "target": [
            {"reference": f"Patient/{patient_id}"},
            {"reference": f"Coverage/{coverage_id}"},
            {"reference": f"Encounter/{encounter_id}"},
            {"reference": f"Condition/{condition_id}"},
        ],
        "activity": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-DataOperation",
                    "code": "CREATE",
                }
            ]
        },
        "entity": [
            {
                "role": "source",
                "what": {
                    "identifier": {
                        "system": "urn:id:hl7-message-control",
                        "value": message_control_id,
                    },
                    "display": "HL7 v2 ADT^A01 source message",
                },
            }
        ],
    }

    return [
        patient,
        attending_practitioner,
        referring_practitioner,
        coverage,
        encounter,
        condition,
        provenance,
    ]


# Orchestration entry point.
#
# Runtime flow:
#   1. Resolve input/output paths
#   2. Parse all HL7 messages from the source file
#   3. Create the Bundle shell
#   4. Add the shared Organization
#   5. Transform each HL7 message into FHIR resources
#   6. Append all resources into the Bundle
#   7. Write the final JSON file
#
# To change output location or naming conventions, start here.
def main() -> None:
    workspace_root = Path(__file__).resolve().parents[1]
    source_path = workspace_root / "data" / "hospital-admissions.hl7"
    output_path = workspace_root / "data" / "hospital-admissions.fhir.json"

    messages = parse_hl7_messages(source_path.read_text())

    bundle = build_bundle()
    bundle["timestamp"] = ts("20260622172051")

    organization = build_organization()
    bundle["entry"].append(
        {
            "fullUrl": "urn:uuid:organization-hospital",
            "resource": organization,
        }
    )

    for index, message in enumerate(messages, start=1):
        resources = convert_message_to_resources(message, index)
        for resource in resources:
            bundle["entry"].append(
                {
                    "fullUrl": f"urn:uuid:{resource['id']}",
                    "resource": resource,
                }
            )

    output_path.write_text(json.dumps(bundle, indent=2))
    print(f"messages={len(messages)} entries={len(bundle['entry'])} wrote={output_path}")


if __name__ == "__main__":
    main()

# Made with Bob
