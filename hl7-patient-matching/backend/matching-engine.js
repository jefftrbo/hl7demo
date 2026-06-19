const natural = require('natural');
const stringSimilarity = require('string-similarity');

class PatientMatchingEngine {
  constructor() {
    this.metaphone = natural.Metaphone;
    this.levenshtein = natural.LevenshteinDistance;
  }

  // Deterministic matching (exact match)
  deterministicMatch(patient1, patient2) {
    const exactMatches = {
      ssn: patient1.ssn === patient2.ssn && patient1.ssn !== '',
      dob: patient1.dob === patient2.dob,
      firstName: patient1.first_name?.toLowerCase() === patient2.first_name?.toLowerCase(),
      lastName: patient1.last_name?.toLowerCase() === patient2.last_name?.toLowerCase()
    };

    // Build breakdown for deterministic matches
    const breakdown = [];
    if (exactMatches.ssn) {
      breakdown.push({
        field: 'SSN',
        similarity: '100.0%',
        weight: '30%',
        contribution: '30.0%',
        status: '✓ Match',
        phonetic: null
      });
    }
    if (exactMatches.dob) {
      breakdown.push({
        field: 'Date of Birth',
        similarity: '100.0%',
        weight: '25%',
        contribution: '25.0%',
        status: '✓ Match',
        phonetic: null
      });
    }
    if (exactMatches.firstName) {
      breakdown.push({
        field: 'First Name',
        similarity: '100.0%',
        weight: '15%',
        contribution: '15.0%',
        status: '✓ Match',
        phonetic: null
      });
    }
    if (exactMatches.lastName) {
      breakdown.push({
        field: 'Last Name',
        similarity: '100.0%',
        weight: '15%',
        contribution: '15.0%',
        status: '✓ Match',
        phonetic: null
      });
    }

    // If SSN and DOB match, it's a definite match
    if (exactMatches.ssn && exactMatches.dob) {
      return {
        match: true,
        confidence: 1.0,
        method: 'deterministic',
        reasoning: 'Exact match on SSN and Date of Birth',
        breakdown: breakdown,
        fieldScores: {}
      };
    }

    // If full name and DOB match
    if (exactMatches.firstName && exactMatches.lastName && exactMatches.dob) {
      return {
        match: true,
        confidence: 0.95,
        method: 'deterministic',
        reasoning: 'Exact match on full name and Date of Birth',
        breakdown: breakdown,
        fieldScores: {}
      };
    }

    return {
      match: false,
      confidence: 0.0,
      method: 'deterministic',
      reasoning: 'No exact matches found',
      breakdown: [],
      fieldScores: {}
    };
  }

  // Probabilistic matching (Fellegi-Sunter)
  probabilisticMatch(patient1, patient2) {
    const weights = {
      ssn: 0.25,
      dob: 0.20,
      firstName: 0.15,
      lastName: 0.15,
      phone: 0.08,
      address: 0.07,
      insurance: 0.10
    };

    const fieldScores = {};
    let totalScore = 0;
    let insuranceException = null;

    // SSN comparison
    if (patient1.ssn && patient2.ssn) {
      const ssnSimilarity = this.calculateStringSimilarity(patient1.ssn, patient2.ssn);
      fieldScores.ssn = {
        similarity: ssnSimilarity,
        weight: weights.ssn,
        contribution: ssnSimilarity * weights.ssn,
        match: ssnSimilarity === 1.0
      };
      totalScore += ssnSimilarity * weights.ssn;
    }

    // DOB comparison
    if (patient1.dob && patient2.dob) {
      const dobMatch = patient1.dob === patient2.dob ? 1.0 : 0.0;
      fieldScores.dob = {
        similarity: dobMatch,
        weight: weights.dob,
        contribution: dobMatch * weights.dob,
        match: dobMatch === 1.0
      };
      totalScore += dobMatch * weights.dob;
    }

    // First name comparison (phonetic + string similarity)
    if (patient1.first_name && patient2.first_name) {
      const firstNameScore = this.calculateNameSimilarity(
        patient1.first_name,
        patient2.first_name
      );
      const phonetic1 = this.metaphone.process(patient1.first_name.toLowerCase());
      const phonetic2 = this.metaphone.process(patient2.first_name.toLowerCase());
      fieldScores.firstName = {
        similarity: firstNameScore,
        weight: weights.firstName,
        contribution: firstNameScore * weights.firstName,
        match: firstNameScore > 0.8,
        phonetic: phonetic1 === phonetic2,
        phoneticCode: `${phonetic1} vs ${phonetic2}`
      };
      totalScore += firstNameScore * weights.firstName;
    }

    // Last name comparison (phonetic + string similarity)
    if (patient1.last_name && patient2.last_name) {
      const lastNameScore = this.calculateNameSimilarity(
        patient1.last_name,
        patient2.last_name
      );
      const phonetic1 = this.metaphone.process(patient1.last_name.toLowerCase());
      const phonetic2 = this.metaphone.process(patient2.last_name.toLowerCase());
      fieldScores.lastName = {
        similarity: lastNameScore,
        weight: weights.lastName,
        contribution: lastNameScore * weights.lastName,
        match: lastNameScore > 0.8,
        phonetic: phonetic1 === phonetic2,
        phoneticCode: `${phonetic1} vs ${phonetic2}`
      };
      totalScore += lastNameScore * weights.lastName;
    }

    // Phone comparison
    if (patient1.phone && patient2.phone) {
      const phoneSimilarity = this.calculateStringSimilarity(
        this.normalizePhone(patient1.phone),
        this.normalizePhone(patient2.phone)
      );
      fieldScores.phone = {
        similarity: phoneSimilarity,
        weight: weights.phone,
        contribution: phoneSimilarity * weights.phone,
        match: phoneSimilarity === 1.0
      };
      totalScore += phoneSimilarity * weights.phone;
    }

    // Address comparison
    if (patient1.city && patient2.city) {
      const citySimilarity = this.calculateStringSimilarity(
        patient1.city.toLowerCase(),
        patient2.city.toLowerCase()
      );
      fieldScores.address = {
        similarity: citySimilarity,
        weight: weights.address,
        contribution: citySimilarity * weights.address,
        match: citySimilarity > 0.8
      };
      totalScore += citySimilarity * weights.address;
    }

    // Insurance carrier comparison with detailed policy checking
    if (patient1.insurance_carrier_name && patient2.insurance_carrier_name) {
      const insuranceSimilarity = this.calculateStringSimilarity(
        patient1.insurance_carrier_name.toLowerCase(),
        patient2.insurance_carrier_name.toLowerCase()
      );
      
      // Check if insurance details changed (reinrollment scenario)
      const sameCarrier = insuranceSimilarity > 0.9;
      const differentPolicy = patient1.insurance_policy_number !== patient2.insurance_policy_number;
      const differentGroup = patient1.insurance_group_number !== patient2.insurance_group_number;
      const differentPlan = patient1.insurance_plan_type !== patient2.insurance_plan_type;
      
      // Detect reinrollment: same carrier but different policy/group/plan
      if (sameCarrier && (differentPolicy || differentGroup || differentPlan)) {
        const changedFields = [];
        if (differentPolicy) changedFields.push('Policy Number');
        if (differentGroup) changedFields.push('Group Number');
        if (differentPlan) changedFields.push('Plan Type');
        
        insuranceException = {
          type: 'REINROLLMENT',
          message: `Same insurance carrier (${patient1.insurance_carrier_name}) but ${changedFields.join(', ')} changed`,
          details: {
            carrier: patient1.insurance_carrier_name,
            patient1: {
              policyNumber: patient1.insurance_policy_number,
              groupNumber: patient1.insurance_group_number,
              planType: patient1.insurance_plan_type
            },
            patient2: {
              policyNumber: patient2.insurance_policy_number,
              groupNumber: patient2.insurance_group_number,
              planType: patient2.insurance_plan_type
            },
            changedFields: changedFields
          }
        };
      }
      
      fieldScores.insurance = {
        similarity: insuranceSimilarity,
        weight: weights.insurance,
        contribution: insuranceSimilarity * weights.insurance,
        match: insuranceSimilarity > 0.9,
        exception: insuranceException
      };
      totalScore += insuranceSimilarity * weights.insurance;
    }

    const isMatch = totalScore >= 0.75;

    return {
      match: isMatch,
      confidence: totalScore,
      method: 'probabilistic',
      reasoning: this.generateReasoning(patient1, patient2, totalScore, insuranceException),
      fieldScores: fieldScores,
      breakdown: this.generateBreakdown(fieldScores, totalScore),
      exception: insuranceException
    };
  }

  // Generate detailed breakdown of matching scores
  generateBreakdown(fieldScores, totalScore) {
    const breakdown = [];
    
    for (const [field, scores] of Object.entries(fieldScores)) {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
      breakdown.push({
        field: fieldName,
        similarity: (scores.similarity * 100).toFixed(1) + '%',
        weight: (scores.weight * 100).toFixed(0) + '%',
        contribution: (scores.contribution * 100).toFixed(1) + '%',
        status: scores.match ? '✓ Match' : scores.similarity > 0.5 ? '~ Partial' : '✗ No Match',
        phonetic: scores.phonetic !== undefined ? (scores.phonetic ? '✓ Sounds alike' : '✗ Different sound') : null,
        phoneticCode: scores.phoneticCode || null
      });
    }
    
    return breakdown;
  }

  // Calculate name similarity using phonetic and string matching
  calculateNameSimilarity(name1, name2) {
    const n1 = name1.toLowerCase().trim();
    const n2 = name2.toLowerCase().trim();

    // Exact match
    if (n1 === n2) return 1.0;

    // Phonetic match (sounds alike)
    const phonetic1 = this.metaphone.process(n1);
    const phonetic2 = this.metaphone.process(n2);
    const phoneticMatch = phonetic1 === phonetic2 ? 0.9 : 0.0;

    // String similarity (handles typos)
    const stringSim = stringSimilarity.compareTwoStrings(n1, n2);

    // Return the higher score
    return Math.max(phoneticMatch, stringSim);
  }

  // Calculate string similarity
  calculateStringSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;
    return stringSimilarity.compareTwoStrings(
      str1.toLowerCase(),
      str2.toLowerCase()
    );
  }

  // Normalize phone number
  normalizePhone(phone) {
    return phone.replace(/\D/g, '');
  }

  // Generate reasoning for the match
  generateReasoning(patient1, patient2, score, insuranceException = null) {
    const reasons = [];

    if (patient1.ssn === patient2.ssn && patient1.ssn) {
      reasons.push('SSN match');
    }

    if (patient1.dob === patient2.dob) {
      reasons.push('DOB match');
    }

    const firstNameSim = this.calculateNameSimilarity(
      patient1.first_name || '',
      patient2.first_name || ''
    );
    if (firstNameSim > 0.8) {
      reasons.push(`First name similarity: ${(firstNameSim * 100).toFixed(0)}%`);
    }

    const lastNameSim = this.calculateNameSimilarity(
      patient1.last_name || '',
      patient2.last_name || ''
    );
    if (lastNameSim > 0.8) {
      reasons.push(`Last name similarity: ${(lastNameSim * 100).toFixed(0)}%`);
    }

    // Add insurance exception warning
    if (insuranceException) {
      reasons.push(`⚠️ ${insuranceException.message}`);
    }

    if (reasons.length === 0) {
      return `Low confidence match (${(score * 100).toFixed(0)}%)`;
    }

    return reasons.join(', ') + ` - Overall confidence: ${(score * 100).toFixed(0)}%`;
  }

  // Composite matching engine
  async match(patient1, patient2) {
    // Use probabilistic matching for all comparisons to get varied confidence scores
    // This allows us to see confidence ranges from 50-100% instead of just binary 0% or 100%
    const probabilisticResult = this.probabilisticMatch(patient1, patient2);
    
    // Only use deterministic as a fallback for exact SSN+DOB matches that probabilistic might miss
    // But still return the probabilistic score for better granularity
    const deterministicResult = this.deterministicMatch(patient1, patient2);
    if (deterministicResult.match && deterministicResult.confidence === 1.0) {
      // Even for exact matches, use probabilistic score if it's close
      // This gives us 95-100% range instead of just 100%
      if (probabilisticResult.confidence >= 0.95) {
        return probabilisticResult;
      }
      return deterministicResult;
    }

    return probabilisticResult;
  }

  // Batch matching - find all potential matches for a patient
  async findMatches(targetPatient, allPatients, threshold = 0.75) {
    const matches = [];

    for (const patient of allPatients) {
      // Skip self-comparison
      if (patient.id === targetPatient.id) continue;

      const result = await this.match(targetPatient, patient);
      
      if (result.match && result.confidence >= threshold) {
        matches.push({
          patient: patient,
          ...result
        });
      }
    }

    // Sort by confidence descending
    matches.sort((a, b) => b.confidence - a.confidence);

    return matches;
  }

  // Find all duplicate pairs in a dataset
  async findAllDuplicates(patients, threshold = 0.75) {
    const duplicatePairs = [];
    const processed = new Set();

    for (let i = 0; i < patients.length; i++) {
      for (let j = i + 1; j < patients.length; j++) {
        const pairKey = `${Math.min(patients[i].id, patients[j].id)}-${Math.max(patients[i].id, patients[j].id)}`;
        
        if (processed.has(pairKey)) continue;
        processed.add(pairKey);

        const result = await this.match(patients[i], patients[j]);
        
        if (result.match && result.confidence >= threshold) {
          duplicatePairs.push({
            patient1: patients[i],
            patient2: patients[j],
            ...result
          });
        }
      }
    }

    // Sort by confidence descending
    duplicatePairs.sort((a, b) => b.confidence - a.confidence);

    return duplicatePairs;
  }
}

module.exports = PatientMatchingEngine;

// Made with Bob
