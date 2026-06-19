const { faker } = require('@faker-js/faker');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

class HL7PatientGenerator {
  constructor() {
    this.patients = [];
    this.messageCounter = 1;
  }

  // Generate 100 patients with realistic variations
  generatePatients(count = 100) {
    const basePatients = this.generateBasePatients(85); // 85 unique patients
    const duplicates = this.generateDuplicates(basePatients, 15); // 15 duplicates
    
    this.patients = [...basePatients, ...duplicates];
    return this.patients;
  }

  generateBasePatients(count) {
    const patients = [];
    
    for (let i = 0; i < count; i++) {
      const patient = {
        mrn: `MRN${String(i + 1).padStart(6, '0')}`,
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        suffix: faker.helpers.arrayElement(['', 'JR', 'SR', 'II', 'III']),
        dob: faker.date.birthdate({ min: 18, max: 90, mode: 'age' }),
        sex: faker.helpers.arrayElement(['M', 'F']),
        race: faker.helpers.arrayElement([
          '2106-3', // White
          '2054-5', // Black
          '2028-9', // Asian
          '2076-8'  // Native Hawaiian
        ]),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state({ abbreviated: true }),
          zip: faker.location.zipCode()
        },
        phone: faker.phone.number('(###) ###-####'),
        ssn: faker.string.numeric('###-##-####'),
        insurance: this.generateInsurance(),
        admissionDate: faker.date.recent({ days: 30 }),
        admissionType: faker.helpers.arrayElement(['E', 'U', 'R', 'N']), // Emergency, Urgent, Routine, Newborn
        diagnosis: this.generateDiagnosis()
      };
      
      patients.push(patient);
    }
    
    return patients;
  }

  generateInsurance() {
    const carriers = [
      { id: 'BC001', name: 'Blue Cross Blue Shield', plan: 'PPO' },
      { id: 'AE002', name: 'Aetna', plan: 'HMO' },
      { id: 'UH003', name: 'UnitedHealthcare', plan: 'PPO' },
      { id: 'CI004', name: 'Cigna', plan: 'EPO' },
      { id: 'HU005', name: 'Humana', plan: 'HMO' },
      { id: 'KP006', name: 'Kaiser Permanente', plan: 'HMO' },
      { id: 'AN007', name: 'Anthem', plan: 'PPO' },
      { id: 'MC008', name: 'Medicare', plan: 'Part A' },
      { id: 'MD009', name: 'Medicaid', plan: 'Standard' }
    ];
    
    const carrier = faker.helpers.arrayElement(carriers);
    return {
      carrierId: carrier.id,
      carrierName: carrier.name,
      planType: carrier.plan,
      policyNumber: faker.string.alphanumeric(12).toUpperCase(),
      groupNumber: faker.string.alphanumeric(8).toUpperCase(),
      effectiveDate: faker.date.past({ years: 2 })
    };
  }

  generateDuplicates(basePatients, count) {
    const duplicates = [];
    
    // Create different types of duplicates with varying match levels
    const matchLevels = [
      { type: 'high', count: 4 },              // 90-100% matches
      { type: 'medium', count: 4 },            // 75-89% matches
      { type: 'low', count: 3 },               // 50-74% matches
      { type: 'address_change', count: 2 },    // Same person, moved addresses
      { type: 'reinrollment', count: 2 }       // Same person, insurance changed (reinrollment)
    ];
    
    let duplicateIndex = 0;
    for (const level of matchLevels) {
      for (let i = 0; i < level.count && duplicateIndex < count; i++) {
        const original = faker.helpers.arrayElement(basePatients);
        const duplicate = this.createVariation(original, level.type);
        duplicates.push(duplicate);
        duplicateIndex++;
      }
    }
    
    return duplicates;
  }

  createVariation(original, matchLevel = 'high') {
    const variation = JSON.parse(JSON.stringify(original)); // Deep clone
    variation.mrn = `MRN${String(this.messageCounter + 85).padStart(6, '0')}`;
    this.messageCounter++;

    if (matchLevel === 'high') {
      // High confidence matches (90-100%): Same SSN/DOB, minor name variations
      const variationType = faker.helpers.arrayElement([
        'name_typo',
        'nickname',
        'missing_middle',
        'hyphenated_name'
      ]);

      switch (variationType) {
        case 'name_typo':
          variation.lastName = this.introduceTypo(original.lastName);
          break;
        
        case 'nickname':
          const nicknames = {
            'William': 'Bill', 'Robert': 'Bob', 'Richard': 'Dick',
            'James': 'Jim', 'Michael': 'Mike', 'Elizabeth': 'Beth',
            'Jennifer': 'Jenny', 'Katherine': 'Kate', 'Christopher': 'Chris',
            'Matthew': 'Matt', 'Daniel': 'Dan', 'Joseph': 'Joe'
          };
          variation.firstName = nicknames[original.firstName] || original.firstName;
          break;
        
        case 'missing_middle':
          variation.middleName = '';
          break;
        
        case 'hyphenated_name':
          variation.lastName = `${original.lastName}-${faker.person.lastName()}`;
          break;
      }
      // Keep SSN and DOB the same for high confidence
      
    } else if (matchLevel === 'medium') {
      // Medium confidence matches (75-89%): Different SSN OR DOB, similar names
      const variationType = faker.helpers.arrayElement([
        'ssn_change',
        'dob_offset',
        'maiden_name',
        'address_phone_change'
      ]);

      switch (variationType) {
        case 'ssn_change':
          // Change SSN but keep everything else
          variation.ssn = faker.string.numeric('###-##-####');
          variation.lastName = this.introduceTypo(original.lastName);
          break;
        
        case 'dob_offset':
          // Slight DOB variation (off by a day or month)
          const originalDate = new Date(original.dob);
          originalDate.setDate(originalDate.getDate() + faker.number.int({ min: -5, max: 5 }));
          variation.dob = originalDate;
          variation.ssn = faker.string.numeric('###-##-####');
          break;
        
        case 'maiden_name':
          if (original.sex === 'F') {
            variation.lastName = faker.person.lastName();
            variation.ssn = faker.string.numeric('###-##-####');
          }
          break;
        
        case 'address_phone_change':
          variation.address = {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state({ abbreviated: true }),
            zip: faker.location.zipCode()
          };
          variation.phone = faker.phone.number('(###) ###-####');
          variation.ssn = faker.string.numeric('###-##-####');
          break;
      }
      
    } else if (matchLevel === 'address_change') {
      // Address change scenario: Same person moved to new address
      // Keep SSN, DOB, names, insurance the same - only change address and phone
      variation.address = {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        zip: faker.location.zipCode()
      };
      variation.phone = faker.phone.number('(###) ###-####');
      // Update admission date to be more recent (simulating a move)
      variation.admissionDate = faker.date.recent({ days: 7 });
      
    } else if (matchLevel === 'reinrollment') {
      // Reinrollment scenario: Same person, same insurer, but coverage changed
      // Keep SSN, DOB, names, address, phone the same
      // Change ONLY insurance Group Number, Plan Type, and Policy Number
      // This simulates a patient who stayed with the same insurance company
      // but got new coverage (e.g., changed jobs, annual renewal with plan change)
      
      // Keep the same insurance carrier but generate new policy details
      const newPlanTypes = ['PPO', 'HMO', 'EPO', 'POS'];
      const currentPlan = original.insurance.planType;
      // Pick a different plan type
      const availablePlans = newPlanTypes.filter(p => p !== currentPlan);
      
      variation.insurance = {
        carrierId: original.insurance.carrierId,        // Same carrier
        carrierName: original.insurance.carrierName,    // Same carrier name
        planType: faker.helpers.arrayElement(availablePlans),  // Different plan type
        policyNumber: faker.string.alphanumeric(12).toUpperCase(),  // New policy number
        groupNumber: faker.string.alphanumeric(8).toUpperCase(),    // New group number
        effectiveDate: faker.date.recent({ days: 30 })  // Recent effective date
      };
      
      // Update admission date to be more recent (after reinrollment)
      variation.admissionDate = faker.date.recent({ days: 14 });
      
    } else {
      // Low confidence matches (50-74%): Multiple differences
      variation.ssn = faker.string.numeric('###-##-####');
      variation.phone = faker.phone.number('(###) ###-####');
      variation.address = {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        zip: faker.location.zipCode()
      };
      
      // Add name variations
      const nameVariation = faker.helpers.arrayElement([
        'first_typo',
        'last_typo',
        'transposed',
        'both_typos'
      ]);
      
      switch (nameVariation) {
        case 'first_typo':
          variation.firstName = this.introduceTypo(original.firstName);
          break;
        case 'last_typo':
          variation.lastName = this.introduceTypo(original.lastName);
          break;
        case 'transposed':
          [variation.firstName, variation.lastName] = [variation.lastName, variation.firstName];
          break;
        case 'both_typos':
          variation.firstName = this.introduceTypo(original.firstName);
          variation.lastName = this.introduceTypo(original.lastName);
          break;
      }
    }

    return variation;
  }

  introduceTypo(name) {
    const typoTypes = ['swap', 'duplicate', 'omit', 'substitute'];
    const type = faker.helpers.arrayElement(typoTypes);
    const chars = name.split('');
    const pos = faker.number.int({ min: 1, max: Math.max(1, chars.length - 2) });

    switch (type) {
      case 'swap':
        if (pos + 1 < chars.length) {
          [chars[pos], chars[pos + 1]] = [chars[pos + 1], chars[pos]];
        }
        break;
      case 'duplicate':
        chars.splice(pos, 0, chars[pos]);
        break;
      case 'omit':
        chars.splice(pos, 1);
        break;
      case 'substitute':
        chars[pos] = String.fromCharCode(chars[pos].charCodeAt(0) + 1);
        break;
    }

    return chars.join('');
  }

  generateDiagnosis() {
    const diagnoses = [
      { code: 'I10', description: 'Essential hypertension' },
      { code: 'E11.9', description: 'Type 2 diabetes mellitus' },
      { code: 'J44.9', description: 'COPD' },
      { code: 'I25.10', description: 'Coronary artery disease' },
      { code: 'N18.3', description: 'Chronic kidney disease' },
      { code: 'F41.9', description: 'Anxiety disorder' },
      { code: 'M79.3', description: 'Fibromyalgia' },
      { code: 'K21.9', description: 'GERD' }
    ];
    
    return faker.helpers.arrayElement(diagnoses);
  }

  // Generate HL7 ADT^A01 message
  generateHL7Message(patient) {
    const timestamp = moment(patient.admissionDate).format('YYYYMMDDHHmmss');
    const dob = moment(patient.dob).format('YYYYMMDD');
    const effectiveDate = moment(patient.insurance.effectiveDate).format('YYYYMMDD');
    const msgId = `MSG${String(this.messageCounter).padStart(6, '0')}`;
    this.messageCounter++;

    const segments = [
      // MSH - Message Header
      `MSH|^~\\&|ADT_SYSTEM|HOSPITAL|RECEIVING_APP|RECEIVING_FACILITY|${timestamp}||ADT^A01|${msgId}|P|2.5`,
      
      // EVN - Event Type
      `EVN|A01|${timestamp}`,
      
      // PID - Patient Identification
      `PID|1||${patient.mrn}^^^HOSPITAL^MR||${patient.lastName}^${patient.firstName}^${patient.middleName}^^${patient.suffix}||${dob}|${patient.sex}||${patient.race}|${patient.address.street}^^${patient.address.city}^${patient.address.state}^${patient.address.zip}^USA||${patient.phone}|||S||${patient.accountNumber || ''}|${patient.ssn}`,
      
      // PV1 - Patient Visit
      `PV1|1|${patient.admissionType === 'E' ? 'E' : 'I'}|4W^401^01^HOSPITAL^^^^^NURSING UNIT||||123^SMITH^ROBERT^A^^^MD^^^^^NPI|456^JONES^MARY^B^^^MD^^^^^NPI|MED||||${patient.admissionType}|A0||||||||||||||||||||||||||${timestamp}`,
      
      // IN1 - Insurance
      `IN1|1|${patient.insurance.carrierId}|${patient.insurance.carrierId}|${patient.insurance.carrierName}||||||${patient.insurance.groupNumber}||||${effectiveDate}|||${patient.insurance.planType}|${patient.lastName}^${patient.firstName}^${patient.middleName}||SELF|${dob}|${patient.address.street}^^${patient.address.city}^${patient.address.state}^${patient.address.zip}||||||||||||||||${patient.insurance.policyNumber}`,
      
      // DG1 - Diagnosis
      `DG1|1||${patient.diagnosis.code}^${patient.diagnosis.description}^ICD10||${timestamp}|A`
    ];

    return segments.join('\r') + '\r';
  }

  // Generate all HL7 messages
  generateHL7File() {
    const patients = this.generatePatients(100);
    const messages = patients.map(p => this.generateHL7Message(p));
    return messages.join('\n');
  }

  // Export as JSON for testing
  exportJSON() {
    return JSON.stringify(this.patients, null, 2);
  }
}

// Main execution
if (require.main === module) {
  console.log('🏥 Generating HL7 Patient Data...\n');
  
  const generator = new HL7PatientGenerator();
  const hl7Messages = generator.generateHL7File();
  const jsonData = generator.exportJSON();
  
  // Create data directory if it doesn't exist
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Save to files
  fs.writeFileSync(path.join(dataDir, 'hospital-admissions.hl7'), hl7Messages);
  fs.writeFileSync(path.join(dataDir, 'patients.json'), jsonData);
  
  console.log('✅ Generated 100 HL7 ADT messages with 15 intentional duplicates');
  console.log(`📁 Files saved to: ${dataDir}`);
  console.log('   - hospital-admissions.hl7');
  console.log('   - patients.json\n');
}

module.exports = HL7PatientGenerator;

// Made with Bob
