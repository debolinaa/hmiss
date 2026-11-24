/**
 * HMIS - Patient Portal View (Debolina Dey)
 * Pages: Dashboard, My Profile, Appointments, Medical Records, Prescriptions,
 * Test Reports, Treatment History, Bills & Payments, Feedback
 *
 * Enforces Read-Only protection on doctor-entered clinical data,
 * supports online bill payment, duplicate bill requests, and feedback submission.
 */

window.HMIS_PATIENT_VIEW = {
  render(subRoute = 'dashboard') {
    const store = window.HMIS_STORE;
    const currentUser = window.HMIS_AUTH.getCurrentUser();
    // Default to Debolina Dey's UID if logged in as patient demo
    const patientUid = (currentUser && currentUser.patientUid) ? currentUser.patientUid : 'HMIS-2026-0001';
    const patient = store.getPatientByUID(patientUid) || store.state.patients[0];

    switch (subRoute) {
      case 'dashboard': return this.renderDashboard(store, patient);
      case 'profile': return this.renderProfile(store, patient);
      case 'appointments': return this.renderAppointments(store, patient);
      case 'medical-records': return this.renderMedicalRecords(store, patient);
      case 'prescriptions': return this.renderPrescriptions(store, patient);
      case 'test-reports': return this.renderTestReports(store, patient);
      case 'treatment-history': return this.renderTreatmentHistory(store, patient);
      case 'bills': return this.renderBills(store, patient);
      case 'feedback': return this.renderFeedback(store, patient);
      default: return this.renderDashboard(store, patient);
    }
  },

  // 1. Patient Dashboard
  renderDashboard(store, patient) {
    const apts = store.state.appointments.filter(a => a.patientUid === patient.uid);
    const upcomingApt = apts.find(a => a.status === 'Scheduled' || a.status === 'Waiting');
    const prescriptions = store.state.prescriptions.filter(p => p.patientUid === patient.uid);
    const latestRx = prescriptions[0];
    const diagnoses = store.state.diagnoses.filter(d => d.patientUid === patient.uid);
    const latestDiag = diagnoses[0];
    const myBills = store.state.bills.filter(b => b.patientUid === patient.uid);
    const pendingBill = myBills.find(b => b.balanceDue > 0);

    return `
      <div>
        <!-- Compact Balanced Patient Welcome Hero -->
        <div class="patient-hero-banner">
          <div>
            <div class="hero-greeting-sub">
              Patient Portal • MEDICORE HMIS
            </div>
            <h1 class="hero-patient-name">
              Welcome, ${patient.name}
            </h1>
            <div class="hero-patient-meta">
              <span>Age: <strong>${patient.age} Yrs</strong></span>
              <span>•</span>
              <span>Gender: <strong>${patient.gender}</strong></span>
              <span>•</span>
              <span>Blood Group: <strong style="color:#fde047;">${patient.bloodGroup}</strong></span>
              <span>•</span>
              <span>Insurance: <strong>${patient.insuranceProvider}</strong></span>
            </div>
          </div>
          <div class="hero-uid-box">
            <div class="hero-uid-label">Patient UID</div>
            <div class="hero-uid-value">${patient.uid}</div>
          </div>
        </div>

        <!-- 3 Balanced Cards in Viewport Row -->
        <div class="dashboard-triplet-grid">
          <!-- Card 1: Upcoming Appointment -->
          <div class="card" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div class="card-header">
                <div class="card-title">📅 Upcoming Appointment</div>
                ${upcomingApt ? `<span class="badge badge-primary">${upcomingApt.tokenNumber}</span>` : ''}
              </div>
              <div class="card-body">
                ${upcomingApt ? `
                  <div style="font-weight:700;color:#1e40af;font-size:0.98rem;line-height:1.3;">${upcomingApt.doctorName}</div>
                  <div style="color:#64748b;font-size:0.78rem;margin-top:0.15rem;">${upcomingApt.department}</div>
                  <div class="card-meta-box">
                    <span>🗓️ <strong>${upcomingApt.date}</strong></span>
                    <span>•</span>
                    <span>🕒 <strong>${upcomingApt.timeSlot}</strong></span>
                  </div>
                ` : `
                  <div style="color:#64748b;font-size:0.82rem;padding:0.5rem 0;">No upcoming appointments scheduled.</div>
                `}
              </div>
            </div>
            <div class="card-footer" style="background:transparent;border-top:none;padding-top:0;">
              <a href="#patient/appointments" class="btn btn-primary btn-sm btn-block">
                ${upcomingApt ? 'Manage Appointments' : 'Book Appointment Now'}
              </a>
            </div>
          </div>

          <!-- Card 2: Active Prescription -->
          <div class="card" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div class="card-header">
                <div class="card-title">💊 Active Prescriptions</div>
                ${latestRx ? `<span class="badge badge-info">${(latestRx.medicines || []).length} Meds</span>` : ''}
              </div>
              <div class="card-body">
                ${latestRx ? `
                  <div style="font-weight:700;color:#0f766e;font-size:0.98rem;line-height:1.3;">${latestRx.diagnosisName}</div>
                  <div style="color:#64748b;font-size:0.78rem;margin-top:0.15rem;">By ${latestRx.doctorName} (${latestRx.date})</div>
                  <div class="card-meta-box" style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${(latestRx.medicines || []).map(m => m.name).join(', ')}">
                    💊 ${(latestRx.medicines || []).map(m => m.name.split(' ')[1] || m.name).join(', ')}
                  </div>
                ` : `
                  <div style="color:#64748b;font-size:0.82rem;padding:0.5rem 0;">No active prescriptions on file.</div>
                `}
              </div>
            </div>
            <div class="card-footer" style="background:transparent;border-top:none;padding-top:0;">
              ${latestRx ? `
                <button class="btn btn-outline btn-sm btn-block" onclick="HMIS_DOCTOR_VIEW.viewPrescriptionModal('${latestRx.id}')">
                  🖨️ View & Print Official Rx
                </button>
              ` : `
                <a href="#patient/prescriptions" class="btn btn-outline btn-sm btn-block">
                  View Prescriptions
                </a>
              `}
            </div>
          </div>

          <!-- Card 3: Hospital Invoices -->
          <div class="card" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div class="card-header">
                <div class="card-title">💳 Hospital Invoices</div>
                ${pendingBill ? `<span class="badge badge-danger">Unpaid</span>` : `<span class="badge badge-success">Settled</span>`}
              </div>
              <div class="card-body">
                ${pendingBill ? `
                  <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.25rem;">
                    <div style="font-weight:700;color:#dc2626;font-size:1.15rem;">₹ ${pendingBill.balanceDue.toLocaleString('en-IN')}</div>
                    <div style="font-size:0.72rem;color:#64748b;font-family:var(--font-mono);">${pendingBill.billNumber}</div>
                  </div>
                  <div style="color:#64748b;font-size:0.78rem;margin-top:0.15rem;">${pendingBill.billType}</div>
                  <div class="card-meta-box" style="background:#f0fdf4;border-color:#bbf7d0;color:#059669;">
                    ✓ Insurance Paid: ₹ ${pendingBill.insuranceCovered.toLocaleString('en-IN')}
                  </div>
                ` : `
                  <div style="color:#059669;font-weight:700;font-size:0.98rem;">✓ All Bills Settled</div>
                  <div style="color:#64748b;font-size:0.78rem;margin-top:0.15rem;">No outstanding balance due.</div>
                  <div class="card-meta-box">
                    All past hospital claims processed.
                  </div>
                `}
              </div>
            </div>
            <div class="card-footer" style="background:transparent;border-top:none;padding-top:0;">
              ${pendingBill ? `
                <button class="btn btn-success btn-sm btn-block" onclick="HMIS_MODALS.openPaymentModal('${pendingBill.id}')">
                  💳 Pay Outstanding Bill Now
                </button>
              ` : `
                <a href="#patient/bills" class="btn btn-outline btn-sm btn-block">
                  View Payment History & Invoices
                </a>
              `}
            </div>
          </div>
        </div>

        <!-- Quick Patient Self-Service Bar -->
        <div class="card" style="margin-top:1.15rem;margin-bottom:0;">
          <div class="card-header">
            <div class="card-title" style="font-size:0.88rem;">⚡ Quick Self-Service Shortcuts</div>
          </div>
          <div class="quick-actions-bar">
            <a href="#patient/appointments" class="btn btn-primary btn-sm quick-action-btn">📅 Book Appointment</a>
            <a href="#patient/prescriptions" class="btn btn-secondary btn-sm quick-action-btn">💊 View Prescriptions</a>
            <a href="#patient/test-reports" class="btn btn-secondary btn-sm quick-action-btn">🧪 Diagnostic Reports</a>
            <a href="#patient/medical-records" class="btn btn-secondary btn-sm quick-action-btn">📁 Medical Records</a>
            <a href="#patient/bills" class="btn btn-secondary btn-sm quick-action-btn">🧾 Invoices & Duplicate Bills</a>
            <a href="#patient/feedback" class="btn btn-outline btn-sm quick-action-btn">⭐ Submit Feedback</a>
          </div>
        </div>
      </div>
    `;
  },

  // 2. My Profile
  renderProfile(store, patient) {
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">My Patient Profile & Medical Information</h1>
            <p class="page-subtitle">Your personal contact information, emergency contacts, and insurance details</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="HMIS_PATIENT_VIEW.saveProfileChanges('${patient.uid}')">
            💾 Save Profile Updates
          </button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Personal Particulars</div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" value="${patient.name}" disabled>
                <div class="form-hint">Name is locked to official hospital UID record.</div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Permanent UID</label>
                  <input type="text" class="form-control" value="${patient.uid}" disabled>
                </div>
                <div class="form-group">
                  <label class="form-label">Blood Group</label>
                  <input type="text" class="form-control" value="${patient.bloodGroup}" disabled>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Age / Gender</label>
                  <input type="text" class="form-control" value="${patient.age} Yrs / ${patient.gender}" disabled>
                </div>
                <div class="form-group">
                  <label class="form-label">Registration Date</label>
                  <input type="text" class="form-control" value="${patient.registrationDate}" disabled>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-title">Contact & Emergency Details (Editable)</div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label required">Contact Phone</label>
                <input type="tel" class="form-control" id="prof-phone" value="${patient.phone}">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" id="prof-email" value="${patient.email}">
              </div>
              <div class="form-group">
                <label class="form-label required">Residential Address</label>
                <input type="text" class="form-control" id="prof-address" value="${patient.address}">
              </div>
              <div class="form-group">
                <label class="form-label">Emergency Contact Name & Phone</label>
                <input type="text" class="form-control" id="prof-emergency" value="${patient.emergencyContact}">
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">Medical Background & Insurance (Read-Only)</div>
          </div>
          <div class="card-body" style="font-size:0.85rem;line-height:1.6;">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Recorded Allergies</label>
                <input type="text" class="form-control" value="${patient.allergies}" disabled style="color:#dc2626;font-weight:600;">
              </div>
              <div class="form-group">
                <label class="form-label">Chronic Medical Conditions</label>
                <input type="text" class="form-control" value="${patient.chronicConditions}" disabled>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Insurance Provider</label>
                <input type="text" class="form-control" value="${patient.insuranceProvider}" disabled>
              </div>
              <div class="form-group">
                <label class="form-label">Insurance Policy / Member ID</label>
                <input type="text" class="form-control" value="${patient.insurancePolicyNo}" disabled>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  saveProfileChanges(uid) {
    const phone = document.getElementById('prof-phone').value;
    const email = document.getElementById('prof-email').value;
    const address = document.getElementById('prof-address').value;
    const emergencyContact = document.getElementById('prof-emergency').value;

    window.HMIS_STORE.updatePatientProfile(uid, { phone, email, address, emergencyContact });
    HMIS_TOAST.success('Profile Saved', 'Your contact particulars have been updated.');
  },

  // 3. Appointments
  renderAppointments(store, patient) {
    const apts = store.state.appointments.filter(a => a.patientUid === patient.uid);
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">My Doctor Appointments</h1>
            <p class="page-subtitle">View your upcoming consultations and book appointments online</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openBookAppointmentModal('${patient.uid}')">
            + Book New Appointment
          </button>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Token No</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Reason / Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${apts.length === 0 ? '<tr><td colspan="7" style="text-align:center;color:#64748b;">No appointments booked yet.</td></tr>' : ''}
                ${apts.map(a => `
                  <tr>
                    <td><strong style="color:#1e40af;font-size:1rem;">${a.tokenNumber}</strong></td>
                    <td>${a.date}</td>
                    <td style="font-weight:600;color:#1e40af;">${a.timeSlot}</td>
                    <td style="font-weight:700;color:#0f172a;">${a.doctorName}</td>
                    <td>${a.department}</td>
                    <td>${a.notes || a.type}</td>
                    <td>
                      <span class="badge ${a.status === 'Completed' ? 'badge-success' : (a.status === 'In Consultation' ? 'badge-primary' : 'badge-warning')}">
                        ${a.status}
                      </span>
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

  // 4. Medical Records (Protected Read-Only)
  renderMedicalRecords(store, patient) {
    const diagnoses = store.state.diagnoses.filter(d => d.patientUid === patient.uid);
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">My Electronic Medical Records</h1>
            <p class="page-subtitle">Verified clinical diagnoses, physician evaluations, and vital signs history</p>
          </div>
          <span class="badge badge-info" style="font-size:0.75rem;">🔒 Doctor-Entered Read-Only Clinical Data</span>
        </div>

        ${diagnoses.length === 0 ? `
          <div class="card"><div class="card-body" style="text-align:center;color:#64748b;">No diagnosis records currently on file.</div></div>
        ` : ''}

        ${diagnoses.map(d => `
          <div class="card">
            <div class="card-header">
              <div>
                <div class="card-title" style="color:#1e40af;">${d.primaryDiagnosis}</div>
                <div class="card-subtitle">Diagnosed on ${d.date} by <strong>${d.doctorName}</strong> • ICD-10 Code: <code>${d.icdCode}</code></div>
              </div>
              <span class="badge badge-success">Verified Diagnosis</span>
            </div>
            <div class="card-body" style="font-size:0.85rem;line-height:1.6;">
              <div style="background:#f8fafc;padding:0.75rem;border-radius:6px;border:1px solid #e2e8f0;margin-bottom:0.75rem;">
                <strong style="color:#0f172a;">Recorded Vital Signs:</strong>
                <div style="display:flex;gap:1.5rem;margin-top:0.3rem;flex-wrap:wrap;">
                  <span>BP: <strong>${d.vitals.bp}</strong></span>
                  <span>Pulse: <strong>${d.vitals.pulse} bpm</strong></span>
                  <span>Temp: <strong>${d.vitals.temp}</strong></span>
                  <span>SpO2: <strong>${d.vitals.spo2}</strong></span>
                  <span>Weight: <strong>${d.vitals.weight || '60 kg'}</strong></span>
                </div>
              </div>

              <div style="margin-bottom:0.6rem;">
                <strong style="color:#475569;">Chief Symptoms:</strong>
                <p style="color:#0f172a;margin-top:0.15rem;">${d.chiefComplaints}</p>
              </div>

              <div style="margin-bottom:0.6rem;">
                <strong style="color:#475569;">Clinical Examination & Findings:</strong>
                <p style="color:#0f172a;margin-top:0.15rem;">${d.clinicalFindings || 'Examination within expected parameters.'}</p>
              </div>

              <div>
                <strong style="color:#475569;">Doctor's Lifestyle & Medical Advice:</strong>
                <p style="color:#1e40af;margin-top:0.15rem;font-weight:600;">${d.advice || 'Follow prescription as advised.'}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 5. Prescriptions
  renderPrescriptions(store, patient) {
    const prescriptions = store.state.prescriptions.filter(p => p.patientUid === patient.uid);
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">My Electronic Prescriptions (e-Rx)</h1>
            <p class="page-subtitle">Official doctor-prescribed medications, dosage instructions, and digital signatures</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Rx ID</th>
                  <th>Date</th>
                  <th>Condition / Diagnosis</th>
                  <th>Doctor</th>
                  <th>Medicines Count</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${prescriptions.length === 0 ? '<tr><td colspan="6" style="text-align:center;color:#64748b;">No prescriptions recorded.</td></tr>' : ''}
                ${prescriptions.map(rx => `
                  <tr>
                    <td><strong style="color:#1e40af;">${rx.id}</strong></td>
                    <td>${rx.date}</td>
                    <td style="font-weight:700;color:#0f172a;">${rx.diagnosisName}</td>
                    <td>${rx.doctorName}</td>
                    <td><span class="badge badge-info">${(rx.medicines || []).length} Medicines</span></td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="HMIS_DOCTOR_VIEW.viewPrescriptionModal('${rx.id}')">
                        🖨️ View & Print Official Rx
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

  // 6. Test Reports
  renderTestReports(store, patient) {
    const tests = store.state.testReports.filter(t => t.patientUid === patient.uid);
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Diagnostic Test Reports & Pathology</h1>
            <p class="page-subtitle">Laboratory investigations, blood tests, and radiology imaging results</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Category</th>
                  <th>Ordered By</th>
                  <th>Date Reported</th>
                  <th>Clinical Impression</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                ${tests.length === 0 ? '<tr><td colspan="7" style="text-align:center;color:#64748b;">No diagnostic tests on record.</td></tr>' : ''}
                ${tests.map(t => `
                  <tr>
                    <td style="font-weight:700;color:#0f172a;">${t.testName}</td>
                    <td><span class="badge badge-neutral">${t.category}</span></td>
                    <td>${t.orderedBy}</td>
                    <td>${t.dateReported}</td>
                    <td style="font-size:0.8rem;color:#059669;">${t.impression}</td>
                    <td><span class="badge badge-success">${t.status}</span></td>
                    <td>
                      <button class="btn btn-outline btn-sm" onclick="HMIS_PATIENT_VIEW.viewTestReportModal('${t.id}')">
                        View Report
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

  viewTestReportModal(testId) {
    const test = window.HMIS_STORE.state.testReports.find(t => t.id === testId);
    if (!test) return;

    const resRows = (test.results || []).map(r => `
      <tr>
        <td style="font-weight:600;">${r.parameter}</td>
        <td style="font-weight:700;color:#1e40af;">${r.value}</td>
        <td>${r.normalRange}</td>
        <td><span class="badge ${r.flag === 'Normal' ? 'badge-success' : 'badge-warning'}">${r.flag}</span></td>
      </tr>
    `).join('');

    const body = `
      <div class="document-paper" style="border:none;box-shadow:none;padding:1rem;">
        <div class="document-header">
          <div class="document-hospital-info">
            <h2>MEDICORE DIAGNOSTICS & LAB SERVICES</h2>
            <p>124 Health City Avenue, Kolkata - 700091</p>
          </div>
          <div class="document-badge">
            <div class="document-title">${test.testName}</div>
            <div style="font-size:0.8rem;color:#64748b;">Report ID: <strong>${test.id}</strong></div>
          </div>
        </div>

        <div class="document-meta-grid">
          <div class="document-meta-item">
            <span class="document-meta-label">Patient:</span>
            <span class="document-meta-value">${test.patientName}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Patient UID:</span>
            <span class="document-meta-value">${test.patientUid}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Referred By:</span>
            <span class="document-meta-value">${test.orderedBy}</span>
          </div>
          <div class="document-meta-item">
            <span class="document-meta-label">Date:</span>
            <span class="document-meta-value">${test.dateReported}</span>
          </div>
        </div>

        <table class="data-table" style="margin-bottom:1.5rem;">
          <thead>
            <tr>
              <th>Investigation Parameter</th>
              <th>Observed Value</th>
              <th>Biological Reference Range</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            ${resRows}
          </tbody>
        </table>

        <div style="background:#f8fafc;padding:0.85rem;border-radius:6px;border:1px solid #e2e8f0;font-size:0.85rem;">
          <strong>Diagnostic Impression:</strong>
          <p style="margin-top:0.25rem;color:#059669;font-weight:600;">${test.impression}</p>
        </div>

        <div class="doctor-signature" style="margin-top:2rem;">
          <div class="signature-box">
            <div class="signature-name">${test.consultantPathologist}</div>
            <div class="signature-title">Consultant Pathologist / Radiologist</div>
          </div>
        </div>
      </div>
    `;

    HMIS_MODALS.open(`Diagnostic Report — ${test.testName}`, body, `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Close</button>
      <button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ Print Report</button>
    `, 'modal-lg');
  },

  // 7. Treatment History Timeline
  renderTreatmentHistory(store, patient) {
    const diagnoses = store.state.diagnoses.filter(d => d.patientUid === patient.uid);
    const admissions = store.state.admissions.filter(a => a.patientUid === patient.uid);

    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">My Complete Treatment History</h1>
            <p class="page-subtitle">Chronological timeline of all consultations, diagnoses, and hospital visits</p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="timeline">
              ${diagnoses.map(d => `
                <div class="timeline-item">
                  <div class="timeline-marker diagnosis"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <div class="timeline-title">OPD Consultation — ${d.primaryDiagnosis}</div>
                      <div class="timeline-date">${d.date}</div>
                    </div>
                    <div class="timeline-body">
                      <p><strong>Attending Physician:</strong> ${d.doctorName}</p>
                      <p style="margin-top:0.25rem;"><strong>Complaints:</strong> ${d.chiefComplaints}</p>
                      <p style="margin-top:0.25rem;"><strong>Vitals:</strong> BP ${d.vitals.bp}, Pulse ${d.vitals.pulse}, SpO2 ${d.vitals.spo2}</p>
                      <p style="margin-top:0.25rem;color:#1e40af;"><strong>Advice:</strong> ${d.advice}</p>
                    </div>
                  </div>
                </div>
              `).join('')}

              ${admissions.map(adm => `
                <div class="timeline-item">
                  <div class="timeline-marker discharge"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <div class="timeline-title">IPD Hospitalization — ${adm.ward} (${adm.bedNumber})</div>
                      <div class="timeline-date">${adm.admissionDate}</div>
                    </div>
                    <div class="timeline-body">
                      <p><strong>Reason:</strong> ${adm.admissionReason}</p>
                      <p><strong>Admitting Doctor:</strong> ${adm.admittingDoctor}</p>
                      <p style="color:${adm.status === 'Discharged' ? '#059669' : '#dc2626'};font-weight:600;">Status: ${adm.status}</p>
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

  // 8. Bills & Online Payments
  renderBills(store, patient) {
    const myBills = store.state.bills.filter(b => b.patientUid === patient.uid);
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">My Hospital Bills & Payments</h1>
            <p class="page-subtitle">View invoices, settle outstanding balances online, and request official duplicate bills</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Bill Description</th>
                  <th>Grand Total</th>
                  <th>Insurance Covered</th>
                  <th>Amount Paid</th>
                  <th>Balance Due</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${myBills.length === 0 ? '<tr><td colspan="9" style="text-align:center;color:#64748b;">No bills recorded.</td></tr>' : ''}
                ${myBills.map(b => `
                  <tr>
                    <td><strong style="color:#1e40af;">${b.billNumber}</strong></td>
                    <td>${b.date}</td>
                    <td style="font-size:0.8rem;">${b.billType}</td>
                    <td style="font-weight:700;">₹ ${b.grandTotal.toLocaleString('en-IN')}</td>
                    <td style="color:#0284c7;">- ₹ ${b.insuranceCovered.toLocaleString('en-IN')}</td>
                    <td style="color:#059669;font-weight:600;">₹ ${b.amountPaid.toLocaleString('en-IN')}</td>
                    <td style="color:#dc2626;font-weight:700;">₹ ${b.balanceDue.toLocaleString('en-IN')}</td>
                    <td>
                      <span class="badge ${b.paymentStatus === 'Paid' ? 'badge-success' : 'badge-danger'}">
                        ${b.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <div style="display:flex;gap:0.35rem;">
                        ${b.balanceDue > 0 ? `
                          <button class="btn btn-success btn-sm" onclick="HMIS_MODALS.openPaymentModal('${b.id}')">
                            💳 Pay Online
                          </button>
                        ` : ''}
                        <button class="btn btn-primary btn-sm" onclick="HMIS_RECEPTIONIST_VIEW.printOriginalBill('${b.id}')">
                          View Bill
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="HMIS_RECEPTIONIST_VIEW.printDuplicateBill('${b.id}')">
                          Duplicate Bill
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

  // 9. Feedback
  renderFeedback(store, patient) {
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Submit Hospital Experience Feedback</h1>
            <p class="page-subtitle">Your reviews help Administrator Abhinaba Giri improve clinical service quality</p>
          </div>
        </div>

        <div class="card" style="max-width:700px;margin:0 auto;">
          <div class="card-header">
            <div class="card-title">Patient Satisfaction Survey</div>
          </div>
          <div class="card-body">
            <form id="form-patient-feedback">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label required">Department Visited</label>
                  <select class="form-control" name="department" required>
                    <option value="Cardiology & General Medicine">Cardiology & General Medicine</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Emergency & Trauma">Emergency & Trauma</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label required">Attending Doctor</label>
                  <select class="form-control" name="doctorName" required>
                    <option value="Dr. Santorshi Ghosh">Dr. Santorshi Ghosh</option>
                    <option value="Dr. Arindam Roy">Dr. Arindam Roy</option>
                    <option value="Dr. Swati Bhattacharya">Dr. Swati Bhattacharya</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label required">Doctor Consultation Rating</label>
                  <select class="form-control" name="rating" required>
                    <option value="5">★★★★★ 5 - Excellent</option>
                    <option value="4">★★★★☆ 4 - Very Good</option>
                    <option value="3">★★★☆☆ 3 - Good / Average</option>
                    <option value="2">★★☆☆☆ 2 - Poor</option>
                    <option value="1">★☆☆☆☆ 1 - Unsatisfactory</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label required">Front Desk / Staff Behavior</label>
                  <select class="form-control" name="staffRating" required>
                    <option value="5">5 - Extremely Courteous</option>
                    <option value="4">4 - Courteous</option>
                    <option value="3">3 - Satisfactory</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label required">Hospital Cleanliness & Facilities</label>
                <select class="form-control" name="cleanlinessRating" required>
                  <option value="5">5 - Spotless & Sanitized</option>
                  <option value="4">4 - Clean</option>
                  <option value="3">3 - Acceptable</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label required">Detailed Comments & Suggestions</label>
                <textarea class="form-control" name="comments" placeholder="Describe your consultation with Dr. Santorshi Ghosh or front-desk experience with Shreyasree..." required></textarea>
              </div>

              <button type="button" class="btn btn-primary btn-lg" style="width:100%;margin-top:1rem;" onclick="HMIS_PATIENT_VIEW.submitFeedback('${patient.uid}')">
                ⭐ Submit Feedback to Hospital Administration
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  submitFeedback(patientUid) {
    const form = document.getElementById('form-patient-feedback');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.patientUid = patientUid;

    const currentUser = window.HMIS_AUTH.getCurrentUser();
    window.HMIS_STORE.submitFeedback(data, currentUser ? currentUser.name : 'Debolina Dey');

    HMIS_TOAST.success('Feedback Submitted', 'Thank you! Your feedback is forwarded to Administrator Abhinaba Giri.');
    form.reset();
  }
};
