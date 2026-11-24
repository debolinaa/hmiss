/**
 * HMIS - Doctor Portal View (Dr. Santorshi Ghosh)
 * Pages: Dashboard, My OPD, Patient Records, Diagnosis, Prescriptions,
 * IPD Patients, Clinical Follow-up, Discharge Summaries, Appointments
 */

window.HMIS_DOCTOR_VIEW = {
  render(subRoute = 'dashboard') {
    const store = window.HMIS_STORE;
    switch (subRoute) {
      case 'dashboard': return this.renderDashboard(store);
      case 'opd': return this.renderMyOPD(store);
      case 'patient-records': return this.renderPatientRecords(store);
      case 'diagnosis': return this.renderDiagnosis(store);
      case 'prescriptions': return this.renderPrescriptions(store);
      case 'ipd': return this.renderIPDPatients(store);
      case 'follow-up': return this.renderClinicalFollowUp(store);
      case 'discharge-summaries': return this.renderDischargeSummaries(store);
      case 'appointments': return this.renderAppointments(store);
      default: return this.renderDashboard(store);
    }
  },

  // 1. Doctor Dashboard
  renderDashboard(store) {
    const myApts = store.state.appointments.filter(a => a.doctorName.includes('Santorshi'));
    const waitingOPD = myApts.filter(a => a.status === 'Waiting' || a.status === 'Scheduled').length;
    const inConsultation = myApts.filter(a => a.status === 'In Consultation').length;
    const completedToday = myApts.filter(a => a.status === 'Completed').length;
    const ipdAssigned = store.state.admissions.filter(a => a.admittingDoctor.includes('Santorshi') && a.status === 'Admitted').length;

    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Doctor Consultation Dashboard</h1>
            <p class="page-subtitle">Attending Physician & Cardiologist: <strong>Dr. Santorshi Ghosh, MD</strong></p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary btn-sm" onclick="window.location.hash='#doctor/opd'">
              🩺 Open Live OPD Queue
            </button>
          </div>
        </div>

        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-icon amber">⏳</div>
            <div class="stat-info">
              <div class="stat-value">${waitingOPD}</div>
              <div class="stat-label">OPD Patients Waiting</div>
              <div class="stat-sub">Queued in waiting lounge</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon blue">🩺</div>
            <div class="stat-info">
              <div class="stat-value">${inConsultation}</div>
              <div class="stat-label">Currently in Consultation</div>
              <div class="stat-sub" style="color:#2563eb;">Inside Chamber 104</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon green">✅</div>
            <div class="stat-info">
              <div class="stat-value">${completedToday}</div>
              <div class="stat-label">Consultations Completed</div>
              <div class="stat-sub" style="color:#16a34a;">Rx & Diagnosis Saved</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon red">🛌</div>
            <div class="stat-info">
              <div class="stat-value">${ipdAssigned}</div>
              <div class="stat-label">Assigned IPD Patients</div>
              <div class="stat-sub">Under daily medical rounds</div>
            </div>
          </div>
        </div>

        <!-- Today's OPD Consultations Queue Snapshot -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Today's OPD Queue for Dr. Santorshi Ghosh</div>
              <div class="card-subtitle">Chamber 104 • OPD Block A • Real-time patient flow</div>
            </div>
            <a href="#doctor/opd" class="btn btn-outline btn-sm">Full OPD Workbench →</a>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Patient Name</th>
                  <th>UID</th>
                  <th>Time Slot</th>
                  <th>Visit Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${myApts.map(a => `
                  <tr>
                    <td><strong style="color:#1e40af;font-size:0.95rem;">${a.tokenNumber}</strong></td>
                    <td style="font-weight:700;color:#0f172a;">${a.patientName}</td>
                    <td><code style="font-size:0.75rem;">${a.patientUid}</code></td>
                    <td>${a.timeSlot}</td>
                    <td style="font-size:0.8rem;">${a.notes || a.type}</td>
                    <td>
                      <span class="badge ${a.status === 'Completed' ? 'badge-success' : (a.status === 'In Consultation' ? 'badge-primary' : 'badge-warning')}">
                        ${a.status}
                      </span>
                    </td>
                    <td>
                      ${a.status === 'Completed' ? `
                        <button class="btn btn-outline btn-sm" onclick="HMIS_DOCTOR_VIEW.viewPrescriptionForPatient('${a.patientUid}')">
                          View Rx
                        </button>
                      ` : `
                        <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openConsultationModal('${a.id}', '${a.patientUid}')">
                          Consult & Prescribe
                        </button>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 2. My OPD Workbench
  renderMyOPD(store) {
    const myApts = store.state.appointments.filter(a => a.doctorName.includes('Santorshi'));

    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">My OPD Consultation Room</h1>
            <p class="page-subtitle">Room 104 • Interactive Consultation Workbench & Patient Calling Screen</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-secondary btn-sm" onclick="window.HMIS_ROUTER.renderCurrentRoute()">🔄 Refresh Queue</button>
          </div>
        </div>

        <div class="queue-grid" style="margin-bottom:1.5rem;">
          ${myApts.map(a => `
            <div class="queue-card ${a.status === 'In Consultation' ? 'current' : ''}">
              <div class="queue-token-pill">
                <span>${a.tokenNumber}</span>
                <span class="badge ${a.status === 'Completed' ? 'badge-success' : (a.status === 'In Consultation' ? 'badge-primary' : 'badge-warning')}">
                  ${a.status}
                </span>
              </div>
              <div style="font-size:1.05rem;font-weight:700;color:#0f172a;">${a.patientName}</div>
              <div style="font-size:0.75rem;color:#64748b;">UID: <code>${a.patientUid}</code> • ${a.timeSlot}</div>
              <div style="font-size:0.8rem;color:#475569;background:#f8fafc;padding:0.4rem 0.6rem;border-radius:4px;border:1px solid #e2e8f0;">
                ${a.notes || 'Routine consultation'}
              </div>
              <div style="display:flex;gap:0.5rem;margin-top:0.35rem;">
                ${a.status === 'Waiting' || a.status === 'Scheduled' ? `
                  <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="HMIS_DOCTOR_VIEW.markInConsultation('${a.id}')">
                    Call Patient
                  </button>
                ` : ''}
                <button class="btn btn-primary btn-sm" style="flex:1;" onclick="HMIS_MODALS.openConsultationModal('${a.id}', '${a.patientUid}')">
                  ${a.status === 'Completed' ? 'Review / Update Rx' : 'Start Consultation'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  markInConsultation(aptId) {
    window.HMIS_STORE.updateAppointmentStatus(aptId, 'In Consultation', 'Dr. Santorshi Ghosh');
    HMIS_TOAST.info('Patient Called', 'Status updated to In Consultation.');
    window.HMIS_ROUTER.renderCurrentRoute();
  },

  // 3. Patient Records Repository
  renderPatientRecords(store) {
    const patients = store.state.patients;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Clinical Patient Records</h1>
            <p class="page-subtitle">Search complete medical histories, allergies, chronic conditions, and past consultations</p>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">Registered Patients (${patients.length})</div>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Patient UID</th>
                  <th>Full Name</th>
                  <th>Age / Gender</th>
                  <th>Blood Group</th>
                  <th>Known Allergies</th>
                  <th>Chronic Conditions</th>
                  <th>Insurance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${patients.map(p => `
                  <tr>
                    <td><code style="font-weight:700;color:#1e40af;">${p.uid}</code></td>
                    <td style="font-weight:700;color:#0f172a;">${p.name}</td>
                    <td>${p.age} Yrs / ${p.gender}</td>
                    <td><span class="badge badge-neutral">${p.bloodGroup}</span></td>
                    <td style="color:${p.allergies !== 'None' ? '#dc2626' : '#64748b'};font-weight:600;">${p.allergies}</td>
                    <td style="font-size:0.8rem;">${p.chronicConditions}</td>
                    <td style="font-size:0.75rem;">${p.insuranceProvider}</td>
                    <td>
                      <button class="btn btn-outline btn-sm" onclick="HMIS_DOCTOR_VIEW.viewPatientHistoryModal('${p.uid}')">
                        Clinical History
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  viewPatientHistoryModal(uid) {
    const store = window.HMIS_STORE;
    const patient = store.getPatientByUID(uid);
    if (!patient) return;

    const diagnoses = store.state.diagnoses.filter(d => d.patientUid === uid);
    const prescriptions = store.state.prescriptions.filter(p => p.patientUid === uid);
    const tests = store.state.testReports.filter(t => t.patientUid === uid);

    const body = `
      <div>
        <div style="background:#eff6ff;padding:1rem;border-radius:8px;border:1px solid #bfdbfe;margin-bottom:1.25rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h3 style="font-size:1.15rem;font-weight:800;color:#1e40af;">${patient.name}</h3>
              <div style="font-size:0.8rem;color:#1e3a8a;margin-top:0.2rem;">
                UID: <strong>${patient.uid}</strong> • ${patient.age} Yrs • ${patient.gender} • Blood: ${patient.bloodGroup}
              </div>
            </div>
            <div style="text-align:right;">
              <span class="badge badge-danger">Allergies: ${patient.allergies}</span>
            </div>
          </div>
        </div>

        <h4 style="font-size:0.85rem;color:#1e40af;font-weight:700;margin-bottom:0.5rem;text-transform:uppercase;">1. Clinical Diagnoses & Notes (${diagnoses.length})</h4>
        ${diagnoses.length === 0 ? '<p style="font-size:0.8rem;color:#94a3b8;">No past diagnoses recorded.</p>' : ''}
        ${diagnoses.map(d => `
          <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:0.75rem;border-radius:6px;margin-bottom:0.6rem;font-size:0.82rem;">
            <div style="display:flex;justify-content:space-between;font-weight:700;color:#0f172a;">
              <span>${d.primaryDiagnosis} (${d.icdCode})</span>
              <span style="color:#64748b;">${d.date}</span>
            </div>
            <div style="color:#475569;margin-top:0.25rem;">Complaints: ${d.chiefComplaints}</div>
            <div style="color:#1e40af;margin-top:0.2rem;">Vitals: BP ${d.vitals.bp}, Pulse ${d.vitals.pulse}, SpO2 ${d.vitals.spo2}</div>
          </div>
        `).join('')}

        <h4 style="font-size:0.85rem;color:#1e40af;font-weight:700;margin:1rem 0 0.5rem 0;text-transform:uppercase;">2. Issued Prescriptions (${prescriptions.length})</h4>
        ${prescriptions.map(rx => `
          <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:0.75rem;border-radius:6px;margin-bottom:0.6rem;font-size:0.82rem;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <strong>${rx.id} • ${rx.diagnosisName}</strong>
              <div style="color:#64748b;">Medicines: ${(rx.medicines || []).map(m => m.name).join(', ')}</div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="HMIS_DOCTOR_VIEW.viewPrescriptionModal('${rx.id}')">View Rx</button>
          </div>
        `).join('')}

        <h4 style="font-size:0.85rem;color:#1e40af;font-weight:700;margin:1rem 0 0.5rem 0;text-transform:uppercase;">3. Diagnostic Reports (${tests.length})</h4>
        ${tests.map(t => `
          <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:0.6rem;border-radius:6px;margin-bottom:0.4rem;font-size:0.8rem;display:flex;justify-content:space-between;">
            <div>
              <strong>${t.testName}</strong> (${t.category})
              <div style="color:#059669;">${t.impression}</div>
            </div>
            <span class="badge badge-success">${t.status}</span>
          </div>
        `).join('')}
      </div>
    `;

    HMIS_MODALS.open(`Medical Record — ${patient.name}`, body, `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Close</button>
      <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.close();HMIS_MODALS.openConsultationModal(null, '${patient.uid}')">New Consultation</button>
    `, 'modal-lg');
  },

  // 4. Diagnoses List
  renderDiagnosis(store) {
    const diagnoses = store.state.diagnoses;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Clinical Diagnoses Registry</h1>
            <p class="page-subtitle">Doctor-evaluated clinical conditions, ICD-10 coding, and recommended investigations</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openConsultationModal(null, 'HMIS-2026-0001')">
            + New Diagnosis
          </button>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Patient Name</th>
                  <th>UID</th>
                  <th>Primary Diagnosis</th>
                  <th>ICD-10 Code</th>
                  <th>Vital Signs</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody>
                ${diagnoses.map(d => `
                  <tr>
                    <td>${d.date}</td>
                    <td style="font-weight:700;color:#0f172a;">${d.patientName}</td>
                    <td><code>${d.patientUid}</code></td>
                    <td style="font-weight:600;color:#1e40af;">${d.primaryDiagnosis}</td>
                    <td><span class="badge badge-neutral">${d.icdCode}</span></td>
                    <td style="font-size:0.75rem;">BP: ${d.vitals.bp} | HR: ${d.vitals.pulse} | SpO2: ${d.vitals.spo2}</td>
                    <td>${d.doctorName}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 5. Prescriptions List
  renderPrescriptions(store) {
    const prescriptions = store.state.prescriptions;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Electronic Prescriptions (e-Rx)</h1>
            <p class="page-subtitle">Digitally signed outpatient and inpatient prescription orders</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Rx ID</th>
                  <th>Date</th>
                  <th>Patient Name</th>
                  <th>UID</th>
                  <th>Clinical Diagnosis</th>
                  <th>Medicines Count</th>
                  <th>Doctor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${prescriptions.map(rx => `
                  <tr>
                    <td><strong style="color:#1e40af;">${rx.id}</strong></td>
                    <td>${rx.date}</td>
                    <td style="font-weight:700;color:#0f172a;">${rx.patientName}</td>
                    <td><code>${rx.patientUid}</code></td>
                    <td>${rx.diagnosisName}</td>
                    <td><span class="badge badge-info">${(rx.medicines || []).length} Medicines</span></td>
                    <td>${rx.doctorName}</td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="HMIS_DOCTOR_VIEW.viewPrescriptionModal('${rx.id}')">
                        🖨️ View & Print Rx
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  viewPrescriptionModal(rxId) {
    const store = window.HMIS_STORE;
    const rx = store.state.prescriptions.find(p => p.id === rxId);
    if (!rx) return;
    const patient = store.getPatientByUID(rx.patientUid);
    const html = window.HMIS_PRINT.renderPrescription(rx, patient);
    window.HMIS_PRINT.openPrintModal(html, `Official Prescription — ${rx.patientName}`);
  },

  viewPrescriptionForPatient(uid) {
    const store = window.HMIS_STORE;
    const rx = store.state.prescriptions.find(p => p.patientUid === uid);
    if (rx) {
      this.viewPrescriptionModal(rx.id);
    } else {
      HMIS_TOAST.info('No Rx', 'No prescription found for this patient.');
    }
  },

  // 6. IPD In-Patients
  renderIPDPatients(store) {
    const admissions = store.state.admissions.filter(a => a.status === 'Admitted' || a.status === 'Discharge Prepared');
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">IPD Patients & Ward Rounds</h1>
            <p class="page-subtitle">In-patient medical monitoring, daily follow-up progress notes, and discharge preparation</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Admission ID</th>
                  <th>Patient</th>
                  <th>Ward & Bed</th>
                  <th>Admission Date</th>
                  <th>Reason / Diagnosis</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${admissions.map(adm => `
                  <tr>
                    <td><strong style="color:#1e40af;">${adm.id}</strong></td>
                    <td>
                      <div style="font-weight:700;color:#0f172a;">${adm.patientName}</div>
                      <div style="font-size:0.75rem;color:#64748b;">UID: ${adm.patientUid}</div>
                    </td>
                    <td><span class="badge badge-primary">${adm.bedNumber} (${adm.ward.split(' ')[0]})</span></td>
                    <td>${adm.admissionDate}</td>
                    <td style="font-size:0.8rem;">${adm.admissionReason}</td>
                    <td><span class="badge ${adm.status === 'Admitted' ? 'badge-danger' : 'badge-warning'}">${adm.status}</span></td>
                    <td>
                      <div style="display:flex;gap:0.4rem;">
                        <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.openFollowUpModal('${adm.id}')">
                          + Follow-Up
                        </button>
                        <button class="btn btn-success btn-sm" onclick="HMIS_MODALS.openDischargeSummaryModal('${adm.id}')">
                          Discharge Summary
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 7. Clinical Follow-up
  renderClinicalFollowUp(store) {
    const followUps = store.state.clinicalFollowUps;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Clinical Follow-up & Progress Notes</h1>
            <p class="page-subtitle">Chronological record of physician ward rounds and patient vital responses</p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="timeline">
              ${followUps.map(f => `
                <div class="timeline-item">
                  <div class="timeline-marker vital"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <div class="timeline-title">${f.roundType} — ${f.patientName} (${f.patientUid})</div>
                      <div class="timeline-date">${f.date}</div>
                    </div>
                    <div class="timeline-body">
                      <p><strong>Vitals:</strong> BP ${f.vitals.bp} | HR ${f.vitals.hr} | SpO2 ${f.vitals.spo2}</p>
                      <p style="margin-top:0.35rem;"><strong>Notes:</strong> ${f.progressNotes}</p>
                      ${f.treatmentAdjustments ? `<p style="margin-top:0.25rem;color:#1e40af;"><strong>Treatment Adjustment:</strong> ${f.treatmentAdjustments}</p>` : ''}
                      ${f.nurseInstructions ? `<p style="margin-top:0.25rem;color:#059669;"><strong>Nurse Note:</strong> ${f.nurseInstructions}</p>` : ''}
                      <div style="font-size:0.75rem;color:#94a3b8;margin-top:0.4rem;">Recorded by: ${f.doctorName}</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 8. Discharge Summaries
  renderDischargeSummaries(store) {
    const summaries = store.state.dischargeSummaries;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Discharge Summaries</h1>
            <p class="page-subtitle">Completed clinical summaries released for hospital billing clearance</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Summary ID</th>
                  <th>Patient Name</th>
                  <th>UID</th>
                  <th>Discharge Date</th>
                  <th>Final Diagnosis</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${summaries.map(dc => `
                  <tr>
                    <td><strong>${dc.id}</strong></td>
                    <td style="font-weight:700;color:#0f172a;">${dc.patientName}</td>
                    <td><code>${dc.patientUid}</code></td>
                    <td>${dc.dischargeDate}</td>
                    <td style="font-weight:600;color:#1e40af;">${dc.finalDiagnosis}</td>
                    <td>${dc.attendingDoctor}</td>
                    <td><span class="badge badge-success">${dc.status}</span></td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="HMIS_DOCTOR_VIEW.viewDischargeModal('${dc.id}')">
                        🖨️ View & Print Summary
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  viewDischargeModal(dcId) {
    const store = window.HMIS_STORE;
    const dc = store.state.dischargeSummaries.find(d => d.id === dcId);
    if (!dc) return;
    const patient = store.getPatientByUID(dc.patientUid);
    const html = window.HMIS_PRINT.renderDischargeSummary(dc, patient);
    window.HMIS_PRINT.openPrintModal(html, `Official Discharge Summary — ${dc.patientName}`);
  },

  // 9. Appointments
  renderAppointments(store) {
    const myApts = store.state.appointments.filter(a => a.doctorName.includes('Santorshi'));
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Doctor Consultation Schedule & Appointments</h1>
            <p class="page-subtitle">Full roster of scheduled patient appointments for Dr. Santorshi Ghosh</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Patient</th>
                  <th>UID</th>
                  <th>Visit Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${myApts.map(a => `
                  <tr>
                    <td><strong>${a.tokenNumber}</strong></td>
                    <td>${a.date}</td>
                    <td style="font-weight:600;color:#1e40af;">${a.timeSlot}</td>
                    <td style="font-weight:700;color:#0f172a;">${a.patientName}</td>
                    <td><code>${a.patientUid}</code></td>
                    <td>${a.type}</td>
                    <td><span class="badge ${a.status === 'Completed' ? 'badge-success' : 'badge-warning'}">${a.status}</span></td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openConsultationModal('${a.id}', '${a.patientUid}')">
                        ${a.status === 'Completed' ? 'Review Rx' : 'Consult'}
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
};
