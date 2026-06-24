const API_BASE = 'http://localhost:3001/api';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadMatchingResults();
    
    // Update threshold display
    const slider = document.getElementById('thresholdSlider');
    const display = document.getElementById('thresholdValue');
    slider.addEventListener('input', (e) => {
        display.textContent = e.target.value;
    });
});

// Load statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_BASE}/stats`);
        const stats = await response.json();
        
        document.getElementById('activePatients').textContent = stats.active_patients || 0;
        document.getElementById('mergedPatients').textContent = stats.merged_patients || 0;
        document.getElementById('pendingMatches').textContent = stats.pending_matches || 0;
        document.getElementById('totalAdmissions').textContent = stats.total_admissions || 0;
    } catch (error) {
        console.error('Error loading stats:', error);
        showAlert('Error loading statistics', 'error');
    }
}

// Upload HL7 file
async function uploadHL7File() {
    const fileInput = document.getElementById('hl7FileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        showAlert('Please select a file', 'error');
        return;
    }
    
    const formData = new FormData();
    formData.append('hl7file', file);
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/hl7/upload`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert(`Successfully processed ${result.count} patient records`, 'success');
            loadStats();
            fileInput.value = '';
        } else {
            showAlert('Error processing file', 'error');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        showAlert('Error uploading file: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Run matching algorithm
async function runMatching() {
    const threshold = parseFloat(document.getElementById('thresholdSlider').value);
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/matching/run`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ threshold })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert(`Found ${result.matchCount} potential duplicate pairs`, 'success');
            loadStats();
            loadMatchingResults();
        } else {
            showAlert('Error running matching algorithm', 'error');
        }
    } catch (error) {
        console.error('Error running matching:', error);
        showAlert('Error running matching: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Load matching results
async function loadMatchingResults() {
    try {
        const response = await fetch(`${API_BASE}/matching/results`);
        const matches = await response.json();
        
        const container = document.getElementById('resultsContainer');
        
        if (matches.length === 0) {
            container.innerHTML = '<p class="alert alert-info">No pending matches found. Upload HL7 data and run matching algorithm.</p>';
            return;
        }
        
        container.innerHTML = matches.map(match => createMatchCard(match)).join('');
    } catch (error) {
        console.error('Error loading results:', error);
        showAlert('Error loading matching results', 'error');
    }
}

// Create match card HTML
function createMatchCard(match) {
    const confidence = parseFloat(match.confidence);
    const confidencePercent = (confidence * 100).toFixed(1);
    
    let confidenceClass = 'confidence-low';
    if (confidence >= 0.9) confidenceClass = 'confidence-high';
    else if (confidence >= 0.75) confidenceClass = 'confidence-medium';
    
    // Parse breakdown if available
    let breakdownHTML = '';
    if (match.breakdown) {
        try {
            const breakdown = typeof match.breakdown === 'string' ? JSON.parse(match.breakdown) : match.breakdown;
            if (breakdown && breakdown.length > 0) {
                breakdownHTML = `
                    <div class="match-breakdown">
                        <h4>📊 Detailed Field Analysis</h4>
                        <table class="breakdown-table">
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Similarity</th>
                                    <th>Weight</th>
                                    <th>Contribution</th>
                                    <th>Status</th>
                                    <th>Phonetic</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${breakdown.map(item => `
                                    <tr>
                                        <td><strong>${item.field}</strong></td>
                                        <td>${item.similarity}</td>
                                        <td>${item.weight}</td>
                                        <td class="contribution">${item.contribution}</td>
                                        <td class="status-cell">${item.status}</td>
                                        <td class="phonetic-cell">${item.phonetic || '-'}</td>
                                    </tr>
                                    ${item.phoneticCode ? `
                                    <tr class="phonetic-detail">
                                        <td colspan="6"><small>Phonetic codes: ${item.phoneticCode}</small></td>
                                    </tr>
                                    ` : ''}
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        } catch (e) {
            console.error('Error parsing breakdown:', e);
        }
    }
    
    return `
        <div class="match-card">
            <div class="match-header">
                <h3>Potential Duplicate Match</h3>
                <span class="confidence-badge ${confidenceClass}">
                    ${confidencePercent}% Confidence
                </span>
            </div>
            
            <div class="patient-comparison">
                <div class="patient-info">
                    <h4>Patient 1</h4>
                    <p><strong>MRN:</strong> ${match.p1_mrn}</p>
                    <p><strong>Name:</strong> <a href="#" class="patient-name-link" onclick="showHL7Record(${match.patient1_id}, '${match.p1_first} ${match.p1_last}'); return false;">${match.p1_first} ${match.p1_last}</a></p>
                    <p><strong>DOB:</strong> ${match.p1_dob}</p>
                    <p><strong>SSN:</strong> ${match.p1_ssn || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${match.p1_phone || 'N/A'}</p>
                    <p><strong>Address:</strong> ${match.p1_city ? `${match.p1_city}, ${match.p1_state}` : 'N/A'}</p>
                    <p><strong>Insurance Carrier:</strong> ${match.p1_insurance || 'N/A'}</p>
                    <p><strong>Plan Type:</strong> ${match.p1_plan_type || 'N/A'}</p>
                    <p><strong>Policy Number:</strong> ${match.p1_policy_number || 'N/A'}</p>
                    <p><strong>Group Number:</strong> ${match.p1_group_number || 'N/A'}</p>
                </div>
                
                <div class="vs-divider">VS</div>
                
                <div class="patient-info">
                    <h4>Patient 2</h4>
                    <p><strong>MRN:</strong> ${match.p2_mrn}</p>
                    <p><strong>Name:</strong> ${match.p2_first} ${match.p2_last}</p>
                    <p><strong>DOB:</strong> ${match.p2_dob}</p>
                    <p><strong>SSN:</strong> ${match.p2_ssn || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${match.p2_phone || 'N/A'}</p>
                    <p><strong>Address:</strong> ${match.p2_city ? `${match.p2_city}, ${match.p2_state}` : 'N/A'}</p>
                    <p><strong>Insurance Carrier:</strong> ${match.p2_insurance || 'N/A'}</p>
                    <p><strong>Plan Type:</strong> ${match.p2_plan_type || 'N/A'}</p>
                    <p><strong>Policy Number:</strong> ${match.p2_policy_number || 'N/A'}</p>
                    <p><strong>Group Number:</strong> ${match.p2_group_number || 'N/A'}</p>
                </div>
            </div>
            
            <div class="reasoning">
                <strong>Matching Reasoning:</strong> ${match.reasoning}
            </div>
            
            ${breakdownHTML}
            
            <div class="match-actions">
                <button class="btn btn-approve" onclick="mergePatients(${match.patient1_id}, ${match.patient2_id}, ${match.id})">
                    ✓ Merge Records
                </button>
                <button class="btn btn-danger" onclick="rejectMatch(${match.id})">
                    ✗ Not a Match
                </button>
            </div>
        </div>
    `;
}

// Merge patients
async function mergePatients(keepId, mergeId, matchId) {
    if (!confirm('Are you sure you want to merge these patient records? This action cannot be undone.')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/patients/merge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keepId, mergeId, matchId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Patients merged successfully', 'success');
            loadStats();
            loadMatchingResults();
        } else {
            showAlert('Error merging patients', 'error');
        }
    } catch (error) {
        console.error('Error merging patients:', error);
        showAlert('Error merging patients: ' + error.message, 'error');
    }
}

// Reject match
async function rejectMatch(matchId) {
    try {
        const response = await fetch(`${API_BASE}/matching/reject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ matchId })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Match rejected', 'success');
            loadStats();
            loadMatchingResults();
        } else {
            showAlert('Error rejecting match', 'error');
        }
    } catch (error) {
        console.error('Error rejecting match:', error);
        showAlert('Error rejecting match: ' + error.message, 'error');
    }
}

// Load patients
async function loadPatients() {
    try {
        const response = await fetch(`${API_BASE}/patients`);
        const patients = await response.json();
        
        const container = document.getElementById('patientsContainer');
        
        if (patients.length === 0) {
            container.innerHTML = '<p class="alert alert-info">No patients found. Upload HL7 data to get started.</p>';
            return;
        }
        
        const table = `
            <table class="patient-table">
                <thead>
                    <tr>
                        <th>MRN</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Sex</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${patients.map(p => `
                        <tr>
                            <td>${p.mrn}</td>
                            <td>${p.first_name} ${p.middle_name || ''} ${p.last_name}</td>
                            <td>${p.dob}</td>
                            <td>${p.sex}</td>
                            <td>${p.phone || 'N/A'}</td>
                            <td>${p.city || 'N/A'}</td>
                            <td>${p.status}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        container.innerHTML = table;
    } catch (error) {
        console.error('Error loading patients:', error);
        showAlert('Error loading patients', 'error');
    }
}

// Show loading indicator
function showLoading(show) {
    const indicator = document.getElementById('loadingIndicator');
    indicator.style.display = show ? 'block' : 'none';
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Parse HL7 message into human-readable format
function parseHL7ToReadable(hl7Message) {
    const segments = hl7Message.split('\r');
    let html = '<div class="hl7-display">';
    
    for (const segment of segments) {
        if (!segment.trim()) continue;
        
        const fields = segment.split('|');
        const segmentType = fields[0];
        
        html += `<div class="hl7-segment">`;
        html += `<h4 class="hl7-segment-header">${segmentType} Segment</h4>`;
        html += `<table class="hl7-table">`;
        
        if (segmentType === 'MSH') {
            html += `
                <tr><td class="hl7-label">Encoding Characters:</td><td>${fields[1] || ''}</td></tr>
                <tr><td class="hl7-label">Sending Application:</td><td>${fields[2] || ''}</td></tr>
                <tr><td class="hl7-label">Sending Facility:</td><td>${fields[3] || ''}</td></tr>
                <tr><td class="hl7-label">Receiving Application:</td><td>${fields[4] || ''}</td></tr>
                <tr><td class="hl7-label">Receiving Facility:</td><td>${fields[5] || ''}</td></tr>
                <tr><td class="hl7-label">Message DateTime:</td><td>${fields[6] || ''}</td></tr>
                <tr><td class="hl7-label">Message Type:</td><td>${fields[8] || ''}</td></tr>
                <tr><td class="hl7-label">Message Control ID:</td><td>${fields[9] || ''}</td></tr>
                <tr><td class="hl7-label">Processing ID:</td><td>${fields[10] || ''}</td></tr>
                <tr><td class="hl7-label">Version ID:</td><td>${fields[11] || ''}</td></tr>
            `;
        } else if (segmentType === 'EVN') {
            html += `
                <tr><td class="hl7-label">Event Type Code:</td><td>${fields[1] || ''}</td></tr>
                <tr><td class="hl7-label">Recorded DateTime:</td><td>${fields[2] || ''}</td></tr>
            `;
        } else if (segmentType === 'PID') {
            const nameParts = fields[5]?.split('^') || [];
            const addressParts = fields[11]?.split('^') || [];
            html += `
                <tr><td class="hl7-label">Patient ID:</td><td>${fields[1] || ''}</td></tr>
                <tr><td class="hl7-label">Patient MRN:</td><td>${fields[3] || ''}</td></tr>
                <tr><td class="hl7-label">Patient Name:</td><td>${nameParts[1] || ''} ${nameParts[2] || ''} ${nameParts[0] || ''} ${nameParts[4] || ''}</td></tr>
                <tr><td class="hl7-label">Date of Birth:</td><td>${fields[7] || ''}</td></tr>
                <tr><td class="hl7-label">Sex:</td><td>${fields[8] || ''}</td></tr>
                <tr><td class="hl7-label">Race:</td><td>${fields[10] || ''}</td></tr>
                <tr><td class="hl7-label">Address:</td><td>${addressParts[0] || ''}, ${addressParts[2] || ''}, ${addressParts[3] || ''} ${addressParts[4] || ''}</td></tr>
                <tr><td class="hl7-label">Phone:</td><td>${fields[13] || ''}</td></tr>
                <tr><td class="hl7-label">SSN:</td><td>${fields[19] || ''}</td></tr>
            `;
        } else if (segmentType === 'PV1') {
            html += `
                <tr><td class="hl7-label">Patient Class:</td><td>${fields[2] || ''}</td></tr>
                <tr><td class="hl7-label">Assigned Patient Location:</td><td>${fields[3] || ''}</td></tr>
                <tr><td class="hl7-label">Admission Type:</td><td>${fields[4] || ''}</td></tr>
                <tr><td class="hl7-label">Attending Doctor:</td><td>${fields[7] || ''}</td></tr>
                <tr><td class="hl7-label">Referring Doctor:</td><td>${fields[8] || ''}</td></tr>
                <tr><td class="hl7-label">Hospital Service:</td><td>${fields[10] || ''}</td></tr>
                <tr><td class="hl7-label">Admit Source:</td><td>${fields[14] || ''}</td></tr>
                <tr><td class="hl7-label">Admission Date:</td><td>${fields[44] || ''}</td></tr>
            `;
        } else if (segmentType === 'IN1') {
            html += `
                <tr><td class="hl7-label">Set ID:</td><td>${fields[1] || ''}</td></tr>
                <tr><td class="hl7-label">Insurance Plan ID:</td><td>${fields[2] || ''}</td></tr>
                <tr><td class="hl7-label">Insurance Company ID:</td><td>${fields[3] || ''}</td></tr>
                <tr><td class="hl7-label">Insurance Company Name:</td><td>${fields[4] || ''}</td></tr>
                <tr><td class="hl7-label">Group Number:</td><td>${fields[10] || ''}</td></tr>
                <tr><td class="hl7-label">Plan Type:</td><td>${fields[17] || ''}</td></tr>
                <tr><td class="hl7-label">Policy Number:</td><td>${fields[fields.length - 1] || ''}</td></tr>
            `;
        } else if (segmentType === 'DG1') {
            const diagnosisParts = fields[3]?.split('^') || [];
            html += `
                <tr><td class="hl7-label">Set ID:</td><td>${fields[1] || ''}</td></tr>
                <tr><td class="hl7-label">Diagnosis Code:</td><td>${diagnosisParts[0] || ''}</td></tr>
                <tr><td class="hl7-label">Diagnosis Description:</td><td>${diagnosisParts[1] || ''}</td></tr>
                <tr><td class="hl7-label">Diagnosis Type:</td><td>${diagnosisParts[2] || ''}</td></tr>
                <tr><td class="hl7-label">Diagnosis DateTime:</td><td>${fields[5] || ''}</td></tr>
                <tr><td class="hl7-label">Diagnosis Type:</td><td>${fields[6] || ''}</td></tr>
            `;
        } else {
            // Generic display for unknown segments
            fields.forEach((field, index) => {
                if (index > 0 && field) {
                    html += `<tr><td class="hl7-label">Field ${index}:</td><td>${field}</td></tr>`;
                }
            });
        }
        
        html += `</table></div>`;
    }
    
    html += '</div>';
    return html;
}

// Show HL7 record in modal
async function showHL7Record(patientId, patientName) {
    try {
        const response = await fetch(`${API_BASE}/patients/${patientId}/hl7`);
        const data = await response.json();
        
        if (data.success) {
            const modal = document.getElementById('modal');
            const modalBody = document.getElementById('modalBody');
            
            const readableHL7 = parseHL7ToReadable(data.hl7_message);
            
            modalBody.innerHTML = `
                <div class="hl7-header">
                    <h3>📋 HL7 Admission Record</h3>
                    <div class="patient-summary">
                        <p><strong>Patient:</strong> ${patientName}</p>
                        <p><strong>MRN:</strong> ${data.patient_info.mrn}</p>
                        <p><strong>DOB:</strong> ${data.patient_info.dob}</p>
                        <p><strong>Admission Date:</strong> ${data.patient_info.admission_date || 'N/A'}</p>
                        <p><strong>Diagnosis:</strong> ${data.patient_info.diagnosis || 'N/A'}</p>
                    </div>
                </div>
                <div class="hl7-content">
                    <h4>Raw HL7 Message:</h4>
                    <pre class="hl7-raw">${data.hl7_message}</pre>
                    <h4>Human-Readable Format:</h4>
                    ${readableHL7}
                </div>
            `;
            
            modal.style.display = 'block';
        } else {
            showAlert('Error loading HL7 record', 'error');
        }
    } catch (error) {
        console.error('Error fetching HL7 record:', error);
        showAlert('Error fetching HL7 record: ' + error.message, 'error');
    }
}

// Modal functions
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function closeMergedPatientsModal() {
    document.getElementById('mergedPatientsModal').style.display = 'none';
}

// Show merged patients modal
async function showMergedPatientsModal() {
    try {
        const response = await fetch(`${API_BASE}/merged-patients`);
        const data = await response.json();
        
        const modal = document.getElementById('mergedPatientsModal');
        const modalBody = document.getElementById('mergedPatientsBody');
        
        if (data.mergedPatients.length === 0) {
            modalBody.innerHTML = '<p class="alert alert-info">No merged patients found.</p>';
        } else {
            let html = '<div class="merged-patients-list">';
            
            data.mergedPatients.forEach(patient => {
                const mergedDate = new Date(patient.merged_at).toLocaleDateString();
                html += `
                    <div class="merged-patient-card">
                        <div class="merged-patient-header">
                            <h3>🔗 ${patient.first_name} ${patient.middle_name || ''} ${patient.last_name}</h3>
                            <span class="merged-badge">Merged on ${mergedDate}</span>
                        </div>
                        <div class="merged-patient-details">
                            <div class="detail-section">
                                <h4>📋 Patient Information</h4>
                                <div class="detail-grid">
                                    <div class="detail-item">
                                        <span class="detail-label">MRN:</span>
                                        <span class="detail-value">${patient.mrn}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Date of Birth:</span>
                                        <span class="detail-value">${patient.dob}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Sex:</span>
                                        <span class="detail-value">${patient.sex}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">SSN:</span>
                                        <span class="detail-value">${patient.ssn || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="detail-section">
                                <h4>📞 Contact Information</h4>
                                <div class="detail-grid">
                                    <div class="detail-item">
                                        <span class="detail-label">Phone:</span>
                                        <span class="detail-value">${patient.phone || 'N/A'}</span>
                                    </div>
                                    <div class="detail-item full-width">
                                        <span class="detail-label">Address:</span>
                                        <span class="detail-value">${patient.street_address || 'N/A'}, ${patient.city || ''}, ${patient.state || ''} ${patient.zip || ''}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="detail-section">
                                <h4>🏥 Insurance Information</h4>
                                <div class="detail-grid">
                                    <div class="detail-item">
                                        <span class="detail-label">Carrier:</span>
                                        <span class="detail-value">${patient.insurance_carrier_name || 'N/A'}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Plan Type:</span>
                                        <span class="detail-value">${patient.insurance_plan_type || 'N/A'}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Policy Number:</span>
                                        <span class="detail-value">${patient.insurance_policy_number || 'N/A'}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Group Number:</span>
                                        <span class="detail-value">${patient.insurance_group_number || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            ${patient.merged_into_mrn ? `
                            <div class="detail-section merged-into-section">
                                <h4>➡️ Merged Into</h4>
                                <div class="merged-into-info">
                                    <p><strong>Master Record:</strong> ${patient.merged_into_name}</p>
                                    <p><strong>MRN:</strong> ${patient.merged_into_mrn}</p>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            modalBody.innerHTML = html;
        }
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching merged patients:', error);
        showAlert('Error fetching merged patients: ' + error.message, 'error');
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    const mergedModal = document.getElementById('mergedPatientsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === mergedModal) {
        mergedModal.style.display = 'none';
    }
}

// Made with Bob
