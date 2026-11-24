/**
 * HMIS - Receptionist Portal View (Shreyasree Ghosh)
 * Pages: Dashboard, Register Patient, Patients, Appointments, OPD Queue,
 * IPD Admission & Beds, Visit Logs, Billing, Payments, Department Directory
 */

window.HMIS_RECEPTIONIST_VIEW = {
  render(subRoute = 'dashboard') {
    const store = window.HMIS_STORE;
    switch (subRoute) {
      case 'dashboard': return this.renderDashboard(store);
      case 'register-patient': return this.renderRegisterPatient(store);
      case 'patients': return this.renderPatients(store);
      case 'appointments': return this.renderAppointments(store);
      case 'opd-queue': return this.renderOPDQueue(store);
      case 'ipd-admission': return this.renderIPDAdmission(store);
      case 'visit-logs': return this.renderVisitLogs(store);
      case 'billing': return this.renderBilling(store);
      case 'payments': return this.renderPayments(store);
      case 'departments': return this.renderDepartments(store);
      default: return this.renderDashboard(store);
    }
  },

  // 1. Receptionist Dashboard
  renderDashboard(store) {
    const today = new Date().toISOString().substring(0, 10);
    const todayReg = store.state.patients.filter(p => p.registrationDate === today).length;
    const totalPatients = store.state.patients.length;
    const totalApts = store.state.appointments.length;
    const availableBeds = store.state.beds.filter(b => b.status === 'available').length;
    const occupiedBeds = store.state.beds.filter(b => b.status === 'occupied').length;
    const pendingBills = store.state.bills.filter(b => b.paymentStatus !== 'Paid').length;

    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Front Desk & Reception Dashboard</h1>
            <p class="page-subtitle">Front Desk Supervisor: <strong>Shreyasree Ghosh</strong> • OPD Counter 1</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openRegisterPatientModal()">
              + Register New Patient
            </button>
            <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.openBookAppointmentModal()">
              📅 Book Appointment
            </button>
            <button class="btn btn-success btn-sm" onclick="HMIS_MODALS.openGenerateBillModal()">
              💳 Generate Bill
            </button>
          </div>
        </div>

        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-icon blue">👥</div>
            <div class="stat-info">
              <div class="stat-value">${totalPatients}</div>
              <div class="stat-label">Total Registered Patients</div>
              <div class="stat-sub" style="color:#16a34a;">${todayReg} registered today</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon amber">📅</div>
            <div class="stat-info">
              <div class="stat-value">${totalApts}</div>
              <div class="stat-label">OPD Appointments</div>
              <div class="stat-sub">Active queue tokens</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon green">🛏️</div>
            <div class="stat-info">
              <div class="stat-value">${availableBeds} / ${store.state.beds.length}</div>
              <div class="stat-label">Available IPD Beds</div>
              <div class="stat-sub" style="color:#059669;">${occupiedBeds} occupied currently</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon red">🧾</div>
            <div class="stat-info">
              <div class="stat-value">${pendingBills}</div>
              <div class="stat-label">Pending Invoices</div>
              <div class="stat-sub" style="color:#dc2626;">Payment required</div>
            </div>
          </div>
        </div>

        <!-- Quick Access Action Panels -->
        <div class="dashboard-triplet-grid">
          <div class="card" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div class="card-header">
                <div class="card-title">Patient Onboarding</div>
              </div>
              <div class="card-body" style="font-size:0.8125rem;color:#475569;">
                <p>Onboard walk-in or referral patients, capture insurance particulars, and automatically generate sequential UIDs (e.g. <code>HMIS-2026-0001</code>).</p>
              </div>
            </div>
            <div class="card-footer" style="background:transparent;border-top:none;padding-top:0;">
              <button class="btn btn-primary btn-sm btn-block" onclick="HMIS_MODALS.openRegisterPatientModal()">
                + Start Patient Registration
              </button>
            </div>
          </div>

          <div class="card" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div class="card-header">
                <div class="card-title">Doctor Appointment Scheduler</div>
              </div>
              <div class="card-body" style="font-size:0.8125rem;color:#475569;">
                <p>Schedule consultations with Dr. Santorshi Ghosh or other specialists. Assign token numbers and route directly to OPD queue.</p>
              </div>
            </div>
            <div class="card-footer" style="background:transparent;border-top:none;padding-top:0;">
              <button class="btn btn-secondary btn-sm btn-block" onclick="HMIS_MODALS.openBookAppointmentModal()">
                📅 Book Appointment & Issue Token
              </button>
            </div>
          </div>

          <div class="card" style="margin-bottom:0;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div class="card-header">
                <div class="card-title">IPD Admission & Bed Allocation</div>
              </div>
              <div class="card-body" style="font-size:0.8125rem;color:#475569;">
                <p>Admit emergency or OPD patients to General Ward, Semi-Private rooms, or ICU beds. Real-time availability verification.</p>
              </div>
            </div>
            <div class="card-footer" style="background:transparent;border-top:none;padding-top:0;">
              <button class="btn btn-outline btn-sm btn-block" onclick="HMIS_MODALS.openAdmitPatientModal()">
                🛏️ Admit Patient to Bed
              </button>
            </div>
          </div>
        </div>

        <!-- Live OPD Queue Overview -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Live Front Desk OPD Queue & Token Desk</div>
              <div class="card-subtitle">Active tokens issued to waiting patients</div>
            </div>
            <a href="#receptionist/opd-queue" class="btn btn-outline btn-sm">Full Queue Screen →</a>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Patient</th>
                  <th>UID</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${store.state.appointments.slice(0, 5).map(a => `
                  <tr>
                    <td><strong style="color:#1e40af;font-size:1rem;">${a.tokenNumber}</strong></td>
                    <td style="font-weight:700;color:#0f172a;">${a.patientName}</td>
                    <td><code>${a.patientUid}</code></td>
                    <td>${a.department}</td>
                    <td>${a.doctorName}</td>
                    <td>${a.timeSlot}</td>
                    <td>
                      <span class="badge ${a.status === 'Completed' ? 'badge-success' : (a.status === 'In Consultation' ? 'badge-primary' : 'badge-warning')}">
                        ${a.status}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-outline btn-sm" onclick="HMIS_MODALS.openGenerateBillModal('${a.patientUid}')">
                        Bill
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

  // 2. Register Patient View
  renderRegisterPatient(store) {
    const nextUid = store.generateNextPatientUID();
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Patient Onboarding & Registration</h1>
            <p class="page-subtitle">Register new patient and automatically issue permanent hospital UID</p>
          </div>
        </div>

        <div class="card" style="max-width:850px;margin:0 auto;">
          <div class="card-header" style="background:#eff6ff;">
            <div>
              <div class="card-title" style="color:#1e40af;">New Patient Registration Form</div>
              <div class="card-subtitle">System Auto-Generated UID: <strong>${nextUid}</strong></div>
            </div>
            <span class="badge badge-primary">Format: HMIS-YYYY-XXXX</span>
          </div>
          <div class="card-body">
            <form id="page-form-register">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label required">Full Name</label>
                  <input type="text" class="form-control" name="name" placeholder="e.g. Subhas Chandra Bose" required>
                </div>
                <div class="form-group">
                  <label class="form-label required">Age</label>
                  <input type="number" class="form-control" name="age" min="1" max="120" placeholder="e.g. 42" required>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label required">Gender</label>
                  <select class="form-control" name="gender" required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label required">Blood Group</label>
                  <select class="form-control" name="bloodGroup" required>
                    <option value="B+">B+</option>
                    <option value="A+">A+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label required">Contact Phone</label>
                  <input type="tel" class="form-control" name="phone" placeholder="+91 98310 00000" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-control" name="email" placeholder="patient@example.com">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label required">Residential Address</label>
                <input type="text" class="form-control" name="address" placeholder="Flat, Street, City, State, PIN" required>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Emergency Contact Name & Phone</label>
                  <input type="text" class="form-control" name="emergencyContact" placeholder="Relative Name: +91 98311 00000">
                </div>
                <div class="form-group">
                  <label class="form-label">Insurance Provider</label>
                  <select class="form-control" name="insuranceProvider">
                    <option value="None">None (Self Pay)</option>
                    <option value="Star Health Insurance">Star Health Insurance</option>
                    <option value="HDFC ERGO Health">HDFC ERGO Health</option>
                    <option value="National Insurance Co.">National Insurance Co.</option>
                    <option value="Care Health Insurance">Care Health Insurance</option>
                    <option value="Ayushman Bharat / PMJAY">Ayushman Bharat / PMJAY</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Insurance Policy Number</label>
                  <input type="text" class="form-control" name="insurancePolicyNo" placeholder="Policy ID">
                </div>
                <div class="form-group">
                  <label class="form-label">Known Allergies</label>
                  <input type="text" class="form-control" name="allergies" placeholder="e.g. Penicillin, Sulfa, Dust (or None)">
                </div>
              </div>

              <div style="margin-top:1.5rem;display:flex;justify-content:flex-end;gap:0.75rem;">
                <button type="reset" class="btn btn-secondary">Reset Form</button>
                <button type="button" class="btn btn-primary btn-lg" onclick="HMIS_RECEPTIONIST_VIEW.submitPageRegister('${nextUid}')">
                  ✓ Register Patient & Issue UID
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  submitPageRegister(uid) {
    const form = document.getElementById('page-form-register');
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.uid = uid;

    const patient = window.HMIS_STORE.registerPatient(data, 'Shreyasree Ghosh');
    HMIS_TOAST.success('Registration Successful', `Patient ${patient.name} registered with UID: ${patient.uid}`);

    // Redirect to patients directory
    window.location.hash = '#receptionist/patients';
  },

  // 3. Patients Directory
  renderPatients(store) {
    const patients = store.state.patients;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Hospital Patient Registry</h1>
            <p class="page-subtitle">Master directory of all onboarded patients with permanent UIDs</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openRegisterPatientModal()">
            + Register New Patient
          </button>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Patient UID</th>
                  <th>Full Name</th>
                  <th>Age / Gender</th>
                  <th>Contact Phone</th>
                  <th>Blood Group</th>
                  <th>Insurance</th>
                  <th>Registered Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${patients.map(p => `
                  <tr>
                    <td><strong style="color:#1e40af;">${p.uid}</strong></td>
                    <td style="font-weight:700;color:#0f172a;">${p.name}</td>
                    <td>${p.age} Yrs / ${p.gender}</td>
                    <td>${p.phone}</td>
                    <td><span class="badge badge-neutral">${p.bloodGroup}</span></td>
                    <td style="font-size:0.75rem;">${p.insuranceProvider}</td>
                    <td>${p.registrationDate}</td>
                    <td>
                      <div style="display:flex;gap:0.35rem;">
                        <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.openBookAppointmentModal('${p.uid}')">
                          Book
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="HMIS_MODALS.openGenerateBillModal('${p.uid}')">
                          Bill
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

  // 4. Appointments Manager
  renderAppointments(store) {
    const apts = store.state.appointments;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Appointment Desk & Schedules</h1>
            <p class="page-subtitle">Book consultations, issue OPD tokens, and track appointment status</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openBookAppointmentModal()">
            + Book New Appointment
          </button>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Patient Name</th>
                  <th>UID</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${apts.map(a => `
                  <tr>
                    <td><strong style="color:#1e40af;font-size:0.95rem;">${a.tokenNumber}</strong></td>
                    <td>${a.date}</td>
                    <td style="font-weight:600;color:#1e40af;">${a.timeSlot}</td>
                    <td style="font-weight:700;color:#0f172a;">${a.patientName}</td>
                    <td><code>${a.patientUid}</code></td>
                    <td>${a.department}</td>
                    <td>${a.doctorName}</td>
                    <td>
                      <span class="badge ${a.status === 'Completed' ? 'badge-success' : (a.status === 'In Consultation' ? 'badge-primary' : 'badge-warning')}">
                        ${a.status}
                      </span>
                    </td>
                    <td>
                      ${a.status === 'Scheduled' ? `
                        <button class="btn btn-secondary btn-sm" onclick="HMIS_RECEPTIONIST_VIEW.markPatientArrived('${a.id}')">
                          Mark Arrived
                        </button>
                      ` : `
                        <button class="btn btn-outline btn-sm" onclick="HMIS_MODALS.openGenerateBillModal('${a.patientUid}')">
                          Invoice
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

  markPatientArrived(aptId) {
    window.HMIS_STORE.updateAppointmentStatus(aptId, 'Waiting', 'Shreyasree Ghosh');
    HMIS_TOAST.success('Patient Checked-In', 'Status updated to Waiting in OPD Queue.');
    window.HMIS_ROUTER.renderCurrentRoute();
  },

  // 5. OPD Live Queue Display
  renderOPDQueue(store) {
    const apts = store.state.appointments;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Live OPD Reception Token Queue</h1>
            <p class="page-subtitle">Waiting Room Token Announcer & Real-Time Flow Management</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.HMIS_ROUTER.renderCurrentRoute()">🔄 Refresh Screen</button>
        </div>

        <div class="queue-grid">
          ${apts.map(a => `
            <div class="queue-card ${a.status === 'In Consultation' ? 'current' : ''}">
              <div class="queue-token-pill">
                <span>${a.tokenNumber}</span>
                <span class="badge ${a.status === 'Completed' ? 'badge-success' : (a.status === 'In Consultation' ? 'badge-primary' : 'badge-warning')}">
                  ${a.status}
                </span>
              </div>
              <div style="font-size:1.1rem;font-weight:700;color:#0f172a;">${a.patientName}</div>
              <div style="font-size:0.78rem;color:#64748b;">
                Doctor: <strong>${a.doctorName}</strong><br>
                Dept: ${a.department} • Slot: ${a.timeSlot}
              </div>
              <div style="display:flex;gap:0.4rem;margin-top:0.4rem;">
                ${a.status === 'Scheduled' ? `
                  <button class="btn btn-primary btn-sm" style="flex:1;" onclick="HMIS_RECEPTIONIST_VIEW.markPatientArrived('${a.id}')">
                    Check In (Waiting)
                  </button>
                ` : ''}
                <button class="btn btn-outline btn-sm" style="flex:1;" onclick="HMIS_MODALS.openGenerateBillModal('${a.patientUid}')">
                  Generate Bill
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 6. IPD Admission & Bed Management
  renderIPDAdmission(store) {
    const beds = store.state.beds;
    const total = beds.length;
    const available = beds.filter(b => b.status === 'available').length;
    const occupied = beds.filter(b => b.status === 'occupied').length;
    const reserved = beds.filter(b => b.status === 'reserved').length;
    const admissions = store.state.admissions;

    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">IPD Admissions & Bed Allocation Matrix</h1>
            <p class="page-subtitle">Allot beds, transfer in-patients, and process discharge bed releases</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openAdmitPatientModal()">
              🛏️ Admit Patient to Bed
            </button>
          </div>
        </div>

        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-icon blue">🛏️</div>
            <div class="stat-info">
              <div class="stat-value">${total}</div>
              <div class="stat-label">Total Bed Capacity</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon green">✅</div>
            <div class="stat-info">
              <div class="stat-value">${available}</div>
              <div class="stat-label">Available Beds</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon red">🔴</div>
            <div class="stat-info">
              <div class="stat-value">${occupied}</div>
              <div class="stat-label">Occupied Beds</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon amber">🔵</div>
            <div class="stat-info">
              <div class="stat-value">${reserved}</div>
              <div class="stat-label">Reserved Beds</div>
            </div>
          </div>
        </div>

        <!-- Bed Matrix Section -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Live Hospital Bed Matrix</div>
            <div style="font-size:0.8rem;color:#64748b;">Click on any bed for info or allocation</div>
          </div>
          <div class="card-body">
            <div class="bed-matrix">
              ${beds.map(b => `
                <div class="bed-cell ${b.status}" onclick="HMIS_RECEPTIONIST_VIEW.onBedClick('${b.id}')">
                  <div class="bed-number">${b.bedNumber}</div>
                  <div class="bed-type">${b.ward.split(' ')[0]}</div>
                  <span class="bed-status-pill">${b.status}</span>
                  ${b.patientName ? `<div class="bed-patient">${b.patientName}</div>` : '<div style="font-size:0.7rem;color:#94a3b8;margin-top:0.35rem;">Vacant</div>'}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Active In-Patient Admissions Table -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Active In-Patient Admissions</div>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Admission ID</th>
                  <th>Patient Name</th>
                  <th>UID</th>
                  <th>Ward & Bed</th>
                  <th>Daily Rate</th>
                  <th>Admission Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${admissions.map(adm => `
                  <tr>
                    <td><strong>${adm.id}</strong></td>
                    <td style="font-weight:700;color:#0f172a;">${adm.patientName}</td>
                    <td><code>${adm.patientUid}</code></td>
                    <td><span class="badge badge-primary">${adm.bedNumber} (${adm.ward})</span></td>
                    <td>₹ ${adm.dailyRate}/day</td>
                    <td>${adm.admissionDate}</td>
                    <td><span class="badge ${adm.status === 'Admitted' ? 'badge-danger' : (adm.status === 'Discharge Prepared' ? 'badge-warning' : 'badge-neutral')}">${adm.status}</span></td>
                    <td>
                      <div style="display:flex;gap:0.35rem;">
                        ${adm.status !== 'Discharged' ? `
                          <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.openTransferBedModal('${adm.id}')">
                            Transfer
                          </button>
                          <button class="btn btn-danger btn-sm" onclick="HMIS_RECEPTIONIST_VIEW.releaseBedPrompt('${adm.id}')">
                            Release Bed
                          </button>
                        ` : '<span style="color:#059669;font-size:0.75rem;font-weight:600;">Discharged</span>'}
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

  onBedClick(bedId) {
    const bed = window.HMIS_STORE.state.beds.find(b => b.id === bedId);
    if (!bed) return;
    if (bed.status === 'available') {
      HMIS_MODALS.openAdmitPatientModal();
    } else {
      HMIS_TOAST.info(`Bed ${bed.bedNumber}`, `Assigned to: ${bed.patientName} (${bed.patientUid}) • Ward: ${bed.ward}`);
    }
  },

  releaseBedPrompt(admissionId) {
    if (confirm('Release this bed upon patient discharge & final billing clearance?')) {
      const res = window.HMIS_STORE.releaseBedAndDischarge(admissionId, 'Shreyasree Ghosh');
      if (res.success) {
        HMIS_TOAST.success('Bed Released', `Bed ${res.bed.bedNumber} is now available.`);
        window.HMIS_ROUTER.renderCurrentRoute();
      }
    }
  },

  // 7. Visit Logs
  renderVisitLogs(store) {
    const logs = store.state.auditLogs.filter(l => l.role === 'receptionist' || l.action.includes('PATIENT') || l.action.includes('APPOINTMENT'));
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Patient Visit & Front Desk Logs</h1>
            <p class="page-subtitle">Chronological record of patient arrivals, admissions, and desk interactions</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Staff Operator</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                ${logs.map(l => `
                  <tr>
                    <td style="font-family:monospace;font-size:0.75rem;">${l.timestamp}</td>
                    <td><code style="color:#1e40af;font-weight:700;">${l.action}</code></td>
                    <td>${l.user}</td>
                    <td style="font-size:0.82rem;">${l.details}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 8. Billing Management
  renderBilling(store) {
    const bills = store.state.bills;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Multi-Department Hospital Billing</h1>
            <p class="page-subtitle">Generate consultation, bed tariff, diagnostic lab, and pharmacy invoices</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openGenerateBillModal()">
            + Generate New Tax Invoice
          </button>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Patient Name</th>
                  <th>UID</th>
                  <th>Bill Type</th>
                  <th>Grand Total</th>
                  <th>Paid</th>
                  <th>Balance Due</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${bills.map(b => `
                  <tr>
                    <td><strong style="color:#1e40af;">${b.billNumber}</strong></td>
                    <td>${b.date}</td>
                    <td style="font-weight:700;color:#0f172a;">${b.patientName}</td>
                    <td><code>${b.patientUid}</code></td>
                    <td style="font-size:0.8rem;">${b.billType}</td>
                    <td style="font-weight:700;">₹ ${b.grandTotal.toLocaleString('en-IN')}</td>
                    <td style="color:#059669;">₹ ${b.amountPaid.toLocaleString('en-IN')}</td>
                    <td style="color:#dc2626;font-weight:700;">₹ ${b.balanceDue.toLocaleString('en-IN')}</td>
                    <td>
                      <span class="badge ${b.paymentStatus === 'Paid' ? 'badge-success' : (b.paymentStatus === 'Partial' ? 'badge-warning' : 'badge-danger')}">
                        ${b.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <div style="display:flex;gap:0.35rem;">
                        <button class="btn btn-primary btn-sm" onclick="HMIS_RECEPTIONIST_VIEW.printOriginalBill('${b.id}')">
                          Original
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="HMIS_RECEPTIONIST_VIEW.printDuplicateBill('${b.id}')">
                          Duplicate
                        </button>
                        ${b.balanceDue > 0 ? `
                          <button class="btn btn-success btn-sm" onclick="HMIS_MODALS.openPaymentModal('${b.id}')">
                            Pay
                          </button>
                        ` : ''}
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

  printOriginalBill(billId) {
    const bill = window.HMIS_STORE.state.bills.find(b => b.id === billId);
    if (!bill) return;
    const html = window.HMIS_PRINT.renderBill(bill, false);
    window.HMIS_PRINT.openPrintModal(html, `Hospital Tax Invoice — ${bill.billNumber}`);
  },

  printDuplicateBill(billId) {
    const dupBill = window.HMIS_STORE.getDuplicateBill(billId, 'Shreyasree Ghosh (Receptionist)');
    if (!dupBill) return;
    const html = window.HMIS_PRINT.renderBill(dupBill, true);
    window.HMIS_PRINT.openPrintModal(html, `DUPLICATE TAX INVOICE — ${dupBill.billNumber}`);
    HMIS_TOAST.info('Duplicate Generated', `Reprint copy created. Note: No second transaction debited to patient.`);
  },

  // 9. Payments Desk
  renderPayments(store) {
    const bills = store.state.bills;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Reception Cashier & Payment Counter</h1>
            <p class="page-subtitle">Receive cash, card, and UPI payments for outstanding hospital invoices</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Patient</th>
                  <th>Grand Total</th>
                  <th>Balance Due</th>
                  <th>Payment Method</th>
                  <th>Transaction Ref</th>
                  <th>Status</th>
                  <th>Collect Payment</th>
                </tr>
              </thead>
              <tbody>
                ${bills.map(b => `
                  <tr>
                    <td><strong>${b.billNumber}</strong></td>
                    <td>${b.patientName} (<code>${b.patientUid}</code>)</td>
                    <td>₹ ${b.grandTotal}</td>
                    <td style="color:#dc2626;font-weight:700;">₹ ${b.balanceDue}</td>
                    <td>${b.paymentMethod}</td>
                    <td><code style="font-size:0.75rem;">${b.transactionRef}</code></td>
                    <td>
                      <span class="badge ${b.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}">
                        ${b.paymentStatus}
                      </span>
                    </td>
                    <td>
                      ${b.balanceDue > 0 ? `
                        <button class="btn btn-success btn-sm" onclick="HMIS_MODALS.openPaymentModal('${b.id}')">
                          Collect ₹ ${b.balanceDue}
                        </button>
                      ` : `
                        <span style="color:#059669;font-weight:600;font-size:0.8rem;">✓ Settled</span>
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

  // 10. Department Directory
  renderDepartments(store) {
    const depts = store.state.departments;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Hospital Department Directory</h1>
            <p class="page-subtitle">Floor map and clinical specialty extensions for directing incoming patients</p>
          </div>
        </div>

        <div class="stat-grid">
          ${depts.map(d => `
            <div class="card" style="margin-bottom:0;">
              <div class="card-header">
                <strong style="color:#1e40af;font-size:1rem;">${d.name}</strong>
                <span class="badge badge-primary">${d.code}</span>
              </div>
              <div class="card-body" style="font-size:0.85rem;">
                <p><strong>Location:</strong> ${d.floor}</p>
                <p style="margin-top:0.35rem;"><strong>Head of Dept:</strong> ${d.head}</p>
                <p style="margin-top:0.35rem;"><strong>OPD Consultation Fee:</strong> ₹ ${d.opdFee}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
