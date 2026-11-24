/**
 * HMIS - Universal Modal Manager & Interactive Form Handlers
 * Handles cross-role operational workflows
 */

window.HMIS_MODALS = {
  activeModal: null,

  close() {
    const modal = document.getElementById('global-modal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => { modal.innerHTML = ''; }, 250);
    }
  },

  open(title, bodyHtml, footerHtml = '', sizeClass = '') {
    let modal = document.getElementById('global-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'global-modal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog ${sizeClass}">
        <div class="modal-header">
          <div class="modal-title">${title}</div>
          <button class="modal-close-btn" onclick="HMIS_MODALS.close()">✕</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
      </div>
    `;

    // Click outside to close
    modal.onclick = (e) => {
      if (e.target === modal) HMIS_MODALS.close();
    };

    setTimeout(() => modal.classList.add('active'), 10);
  },

  // 1. Student Credits & Lab Assignment Attribution Modal
  openAssignmentModal() {
    const body = `
      <div style="text-align:center;margin-bottom:0.85rem;">
        <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#1e40af,#0d9488);color:#fff;font-size:1.1rem;display:flex;align-items:center;justify-content:center;margin:0 auto 0.45rem auto;">
          🏥
        </div>
        <h3 style="font-size:1.1rem;font-weight:800;color:#0f172a;letter-spacing:-0.01em;">Hospital Management & Information System (HMIS)</h3>
        <p style="font-size:0.78rem;color:#64748b;margin-top:0.15rem;">Software Engineering Laboratory Assignment</p>
      </div>

      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:0.75rem;margin-bottom:0.85rem;">
        <h4 style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.06em;color:#475569;font-weight:700;margin-bottom:0.5rem;">
          Assignment Team & Role Allocation
        </h4>
        <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:0.55rem;">
          <div style="background:#fff;padding:0.6rem;border-radius:6px;border:1px solid #e2e8f0;">
            <div style="font-weight:700;color:#1e40af;font-size:0.82rem;">1. Abhinaba Giri</div>
            <div style="font-size:0.72rem;font-weight:600;color:#0f172a;margin-top:0.1rem;">Role: Administrator</div>
            <p style="font-size:0.7rem;color:#64748b;margin-top:0.25rem;line-height:1.4;">Staff & user management, departments, duty roster, billing configuration, security, and audit logs.</p>
          </div>
          <div style="background:#fff;padding:0.6rem;border-radius:6px;border:1px solid #e2e8f0;">
            <div style="font-weight:700;color:#0d9488;font-size:0.82rem;">2. Santorshi Ghosh</div>
            <div style="font-size:0.72rem;font-weight:600;color:#0f172a;margin-top:0.1rem;">Role: Doctor</div>
            <p style="font-size:0.7rem;color:#64748b;margin-top:0.25rem;line-height:1.4;">OPD queue, patient records, electronic diagnosis, prescriptions, IPD rounds, and discharge summaries.</p>
          </div>
          <div style="background:#fff;padding:0.6rem;border-radius:6px;border:1px solid #e2e8f0;">
            <div style="font-weight:700;color:#d97706;font-size:0.82rem;">3. Shreyasree Ghosh</div>
            <div style="font-size:0.72rem;font-weight:600;color:#0f172a;margin-top:0.1rem;">Role: Receptionist</div>
            <p style="font-size:0.7rem;color:#64748b;margin-top:0.25rem;line-height:1.4;">Patient registration (UID generation), appointments, token management, IPD bed allocation, billing, and receipts.</p>
          </div>
          <div style="background:#fff;padding:0.6rem;border-radius:6px;border:1px solid #e2e8f0;">
            <div style="font-weight:700;color:#7c3aed;font-size:0.82rem;">4. Debolina Dey</div>
            <div style="font-size:0.72rem;font-weight:600;color:#0f172a;margin-top:0.1rem;">Role: Patient</div>
            <p style="font-size:0.7rem;color:#64748b;margin-top:0.25rem;line-height:1.4;">Patient UID (HMIS-2026-0001), appointment booking, view prescriptions & test reports, pay bills, and submit feedback.</p>
          </div>
        </div>
      </div>

      <div style="font-size:0.74rem;color:#64748b;line-height:1.45;">
        <strong>Engineering Highlights:</strong> Unified reactive data store with live state synchronization across all 4 roles, realistic clinical & billing constraints, printable hospital documentation, responsive healthcare design system.
      </div>
    `;

    this.open('Project Information & Team Responsibilities', body, `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Close</button>
    `, 'modal-lg');
  },

  // 2. Register Patient Modal
  openRegisterPatientModal(callback) {
    const nextUid = window.HMIS_STORE.generateNextPatientUID();
    const body = `
      <form id="form-register-patient">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:0.6rem 0.85rem;margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:0.8rem;color:#1e40af;font-weight:600;">System Generated Patient UID:</span>
          <span style="font-family:monospace;font-weight:800;color:#1e40af;font-size:0.95rem;">${nextUid}</span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Full Name</label>
            <input type="text" class="form-control" name="name" placeholder="e.g. Sourav Ganguly" required>
          </div>
          <div class="form-group">
            <label class="form-label required">Age</label>
            <input type="number" class="form-control" name="age" min="1" max="120" placeholder="e.g. 35" required>
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
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Phone Number</label>
            <input type="tel" class="form-control" name="phone" placeholder="+91 98765 43210" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" name="email" placeholder="patient@example.com">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label required">Residential Address</label>
          <input type="text" class="form-control" name="address" placeholder="Street, City, State, PIN" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Emergency Contact</label>
            <input type="text" class="form-control" name="emergencyContact" placeholder="Name & Phone Number">
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
            <label class="form-label">Insurance Policy / Card No.</label>
            <input type="text" class="form-control" name="insurancePolicyNo" placeholder="Policy ID (Optional)">
          </div>
          <div class="form-group">
            <label class="form-label">Known Allergies</label>
            <input type="text" class="form-control" name="allergies" placeholder="e.g. Penicillin, Peanuts (or None)">
          </div>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.submitRegisterPatient('${nextUid}', ${callback ? callback : 'null'})">
        ✓ Register & Generate UID
      </button>
    `;

    this.open('New Patient Registration', body, footer, 'modal-lg');
  },

  submitRegisterPatient(uid, callback) {
    const form = document.getElementById('form-register-patient');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.uid = uid;

    const newPatient = window.HMIS_STORE.registerPatient(data);
    HMIS_TOAST.success('Registration Complete', `Patient ${newPatient.name} registered with UID: ${newPatient.uid}`);
    HMIS_MODALS.close();

    if (typeof callback === 'function') {
      callback(newPatient);
    } else {
      window.HMIS_ROUTER.renderCurrentRoute();
    }
  },

  // 3. Book Appointment Modal
  openBookAppointmentModal(preselectedPatientUid = null, callback) {
    const store = window.HMIS_STORE;
    const patients = store.getPatients();
    const doctors = store.state.staff.filter(s => s.role === 'Doctor');
    const departments = store.state.departments;

    const patientOptions = patients.map(p => `
      <option value="${p.uid}" ${p.uid === preselectedPatientUid ? 'selected' : ''}>
        ${p.name} (${p.uid}) - ${p.phone}
      </option>
    `).join('');

    const deptOptions = departments.map(d => `
      <option value="${d.name}">${d.name} (₹${d.opdFee})</option>
    `).join('');

    const doctorOptions = doctors.map(doc => `
      <option value="${doc.name}">${doc.name} - ${doc.department}</option>
    `).join('');

    const todayStr = new Date().toISOString().substring(0, 10);

    const body = `
      <form id="form-book-appointment">
        <div class="form-group">
          <label class="form-label required">Select Patient</label>
          <select class="form-control" name="patientUid" required>
            <option value="">-- Choose Patient from Registry --</option>
            ${patientOptions}
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Department</label>
            <select class="form-control" name="department" id="booking-dept" required>
              ${deptOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Doctor</label>
            <select class="form-control" name="doctorName" required>
              ${doctorOptions}
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Appointment Date</label>
            <input type="date" class="form-control" name="date" value="${todayStr}" min="${todayStr}" required>
          </div>
          <div class="form-group">
            <label class="form-label required">Available Time Slot</label>
            <select class="form-control" name="timeSlot" required>
              <option value="09:30 AM - 10:00 AM">09:30 AM - 10:00 AM</option>
              <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
              <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
              <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
              <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
              <option value="12:00 PM - 12:30 PM">12:00 PM - 12:30 PM</option>
              <option value="02:30 PM - 03:00 PM">02:30 PM - 03:00 PM</option>
              <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Visit Type</label>
            <select class="form-control" name="type" required>
              <option value="OPD Consultation">OPD Consultation</option>
              <option value="Routine Review">Routine Review</option>
              <option value="Emergency Evaluation">Emergency Evaluation</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Consultation Fee (₹)</label>
            <input type="number" class="form-control" name="fee" value="500" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Chief Symptoms / Reason for Visit</label>
          <textarea class="form-control" name="notes" placeholder="Briefly describe symptoms or complaints"></textarea>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.submitBookAppointment(${callback ? callback : 'null'})">
        ✓ Confirm Booking & Generate Token
      </button>
    `;

    this.open('Book Doctor Appointment', body, footer);
  },

  submitBookAppointment(callback) {
    const form = document.getElementById('form-book-appointment');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    const patient = window.HMIS_STORE.getPatientByUID(data.patientUid);
    if (!patient) {
      HMIS_TOAST.error('Error', 'Selected patient not found');
      return;
    }
    data.patientName = patient.name;

    const currentUser = window.HMIS_AUTH.getCurrentUser();
    const apt = window.HMIS_STORE.bookAppointment(data, currentUser ? currentUser.name : 'Front Desk');

    HMIS_TOAST.success('Appointment Confirmed', `Booked for ${apt.patientName}. Token: ${apt.tokenNumber}`);
    HMIS_MODALS.close();

    if (typeof callback === 'function') {
      callback(apt);
    } else {
      window.HMIS_ROUTER.renderCurrentRoute();
    }
  },

  // 4. Record Diagnosis & Electronic Prescription Modal (Doctor Portal)
  openConsultationModal(appointmentId, patientUid) {
    const store = window.HMIS_STORE;
    const patient = store.getPatientByUID(patientUid);
    const apt = store.state.appointments.find(a => a.id === appointmentId);

    const body = `
      <form id="form-consultation">
        <input type="hidden" name="appointmentId" value="${appointmentId || ''}">
        <input type="hidden" name="patientUid" value="${patient ? patient.uid : ''}">
        <input type="hidden" name="patientName" value="${patient ? patient.name : ''}">

        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:0.75rem;margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong style="color:#166534;font-size:0.9rem;">Patient: ${patient ? patient.name : 'Unknown'} (${patient ? patient.uid : ''})</strong>
            <div style="font-size:0.75rem;color:#15803d;margin-top:0.15rem;">
              ${patient ? `${patient.age} Yrs / ${patient.gender} • Blood Group: ${patient.bloodGroup}` : ''}
            </div>
          </div>
          <div style="text-align:right;">
            <span class="badge badge-danger">Allergies: ${patient ? patient.allergies : 'None'}</span>
          </div>
        </div>

        <div style="border-bottom:1px solid #e2e8f0;padding-bottom:0.75rem;margin-bottom:1rem;">
          <h4 style="font-size:0.85rem;color:#1e40af;font-weight:700;margin-bottom:0.5rem;">1. Vital Signs & Examination</h4>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">BP (mmHg)</label>
              <input type="text" class="form-control" name="bp" placeholder="120/80" value="122/78">
            </div>
            <div class="form-group">
              <label class="form-label">Pulse (bpm)</label>
              <input type="text" class="form-control" name="pulse" placeholder="72" value="76">
            </div>
            <div class="form-group">
              <label class="form-label">Temp (°F)</label>
              <input type="text" class="form-control" name="temp" placeholder="98.4" value="98.6">
            </div>
            <div class="form-group">
              <label class="form-label">SpO2 (%)</label>
              <input type="text" class="form-control" name="spo2" placeholder="99%" value="98%">
            </div>
          </div>
        </div>

        <div style="border-bottom:1px solid #e2e8f0;padding-bottom:0.75rem;margin-bottom:1rem;">
          <h4 style="font-size:0.85rem;color:#1e40af;font-weight:700;margin-bottom:0.5rem;">2. Clinical Assessment & Diagnosis</h4>
          <div class="form-group">
            <label class="form-label required">Chief Complaints</label>
            <input type="text" class="form-control" name="chiefComplaints" placeholder="e.g. Mild breathlessness, cough with expectoration" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Primary Clinical Diagnosis</label>
              <input type="text" class="form-control" name="primaryDiagnosis" placeholder="e.g. Acute Bronchitis" required>
            </div>
            <div class="form-group">
              <label class="form-label">ICD-10 Code</label>
              <input type="text" class="form-control" name="icdCode" placeholder="e.g. J20.9" value="J20.9">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Clinical Findings & Examination Notes</label>
            <textarea class="form-control" name="clinicalFindings" placeholder="Chest bilateral air entry normal, rhonchi in left lower zone..."></textarea>
          </div>
        </div>

        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <h4 style="font-size:0.85rem;color:#1e40af;font-weight:700;">3. Electronic Prescription (Rx Medicines)</h4>
            <button type="button" class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.addPrescriptionRow()">+ Add Medicine</button>
          </div>

          <table class="data-table" id="table-rx-inputs">
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
                <th>Instructions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" class="form-control med-name" value="Tab. Paracetamol" required></td>
                <td><input type="text" class="form-control med-dose" value="650 mg"></td>
                <td><input type="text" class="form-control med-freq" value="1-0-1 (Twice daily)"></td>
                <td><input type="text" class="form-control med-dur" value="3 days"></td>
                <td><input type="text" class="form-control med-inst" value="After food"></td>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">✕</button></td>
              </tr>
              <tr>
                <td><input type="text" class="form-control med-name" value="Tab. Cetirizine" required></td>
                <td><input type="text" class="form-control med-dose" value="10 mg"></td>
                <td><input type="text" class="form-control med-freq" value="0-0-1 (Night)"></td>
                <td><input type="text" class="form-control med-dur" value="5 days"></td>
                <td><input type="text" class="form-control med-inst" value="At bedtime"></td>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">✕</button></td>
              </tr>
            </tbody>
          </table>

          <div class="form-group" style="margin-top:1rem;">
            <label class="form-label">Diagnostic Tests Ordered</label>
            <input type="text" class="form-control" name="recommendedTests" placeholder="e.g. Complete Blood Count (CBC), Chest X-Ray (separate by comma)">
          </div>

          <div class="form-group">
            <label class="form-label">Doctor Advice & Lifestyle Recommendations</label>
            <input type="text" class="form-control" name="advice" placeholder="Adequate rest, hydration, return if fever persists">
          </div>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-success btn-sm" onclick="HMIS_MODALS.submitConsultation()">
        ✓ Save Diagnosis & Finalize Prescription
      </button>
    `;

    this.open('Clinical Consultation & Prescription', body, footer, 'modal-lg');
  },

  addPrescriptionRow() {
    const table = document.querySelector('#table-rx-inputs tbody');
    if (!table) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-control med-name" placeholder="Drug Name" required></td>
      <td><input type="text" class="form-control med-dose" placeholder="e.g. 500mg"></td>
      <td><input type="text" class="form-control med-freq" placeholder="e.g. 1-0-1"></td>
      <td><input type="text" class="form-control med-dur" placeholder="e.g. 5 days"></td>
      <td><input type="text" class="form-control med-inst" placeholder="e.g. After meals"></td>
      <td><button type="button" class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">✕</button></td>
    `;
    table.appendChild(tr);
  },

  submitConsultation() {
    const form = document.getElementById('form-consultation');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    // Gather medicines
    const medRows = document.querySelectorAll('#table-rx-inputs tbody tr');
    const medicines = [];
    medRows.forEach(row => {
      const name = row.querySelector('.med-name').value.trim();
      if (name) {
        medicines.push({
          name,
          dosage: row.querySelector('.med-dose').value.trim(),
          frequency: row.querySelector('.med-freq').value.trim(),
          duration: row.querySelector('.med-dur').value.trim(),
          instruction: row.querySelector('.med-inst').value.trim()
        });
      }
    });

    data.medicines = medicines;
    data.vitals = {
      bp: data.bp,
      pulse: data.pulse,
      temp: data.temp,
      spo2: data.spo2,
      weight: '62 kg'
    };

    if (data.recommendedTests) {
      data.recommendedTests = data.recommendedTests.split(',').map(s => s.trim()).filter(Boolean);
    } else {
      data.recommendedTests = [];
    }

    const currentDoc = window.HMIS_AUTH.getCurrentUser();
    const docName = currentDoc ? currentDoc.name : 'Dr. Santorshi Ghosh';

    const result = window.HMIS_STORE.saveDiagnosisAndPrescription(data, docName);

    HMIS_TOAST.success('Consultation Recorded', `Diagnosis & Rx created for ${data.patientName}`);
    HMIS_MODALS.close();
    window.HMIS_ROUTER.renderCurrentRoute();

    // Offer instant print preview
    setTimeout(() => {
      const patient = window.HMIS_STORE.getPatientByUID(data.patientUid);
      const printHtml = window.HMIS_PRINT.renderPrescription(result.prescription, patient);
      window.HMIS_PRINT.openPrintModal(printHtml, 'Official Electronic Prescription (Rx)');
    }, 400);
  },

  // 5. Admit Patient to IPD Modal
  openAdmitPatientModal(preselectedPatientUid = null, callback) {
    const store = window.HMIS_STORE;
    const patients = store.getPatients();
    const availableBeds = store.state.beds.filter(b => b.status === 'available');
    const doctors = store.state.staff.filter(s => s.role === 'Doctor');

    if (availableBeds.length === 0) {
      HMIS_TOAST.warning('No Beds Available', 'All hospital beds are currently occupied or reserved!');
      return;
    }

    const patientOptions = patients.map(p => `
      <option value="${p.uid}" ${p.uid === preselectedPatientUid ? 'selected' : ''}>
        ${p.name} (${p.uid})
      </option>
    `).join('');

    const bedOptions = availableBeds.map(b => `
      <option value="${b.id}">${b.bedNumber} - ${b.ward} (₹${b.dailyRate}/day)</option>
    `).join('');

    const docOptions = doctors.map(d => `
      <option value="${d.name}">${d.name}</option>
    `).join('');

    const body = `
      <form id="form-ipd-admission">
        <div class="form-group">
          <label class="form-label required">Patient</label>
          <select class="form-control" name="patientUid" required>
            <option value="">-- Choose Patient --</option>
            ${patientOptions}
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Assign Available Bed</label>
            <select class="form-control" name="bedId" required>
              ${bedOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Admitting Doctor</label>
            <select class="form-control" name="admittingDoctor" required>
              ${docOptions}
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label required">Admission Reason / Clinical Indication</label>
          <textarea class="form-control" name="admissionReason" placeholder="Indicate medical diagnosis, post-op care, ICU telemetry..." required></textarea>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.submitAdmitPatient(${callback ? callback : 'null'})">
        ✓ Confirm IPD Bed Allotment
      </button>
    `;

    this.open('IPD Patient Admission & Bed Allotment', body, footer);
  },

  submitAdmitPatient(callback) {
    const form = document.getElementById('form-ipd-admission');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    const patient = window.HMIS_STORE.getPatientByUID(data.patientUid);
    if (!patient) return;
    data.patientName = patient.name;

    const user = window.HMIS_AUTH.getCurrentUser();
    const res = window.HMIS_STORE.admitPatientToIPD(data, user ? user.name : 'Front Desk');

    if (res.success) {
      HMIS_TOAST.success('Admission Allotted', `${data.patientName} admitted to ${res.bed.bedNumber} (${res.bed.ward})`);
      HMIS_MODALS.close();
      if (typeof callback === 'function') callback(res);
      else window.HMIS_ROUTER.renderCurrentRoute();
    } else {
      HMIS_TOAST.error('Admission Error', res.message);
    }
  },

  // 6. Transfer Bed Modal
  openTransferBedModal(admissionId) {
    const store = window.HMIS_STORE;
    const admission = store.state.admissions.find(a => a.id === admissionId);
    if (!admission) return;

    const availableBeds = store.state.beds.filter(b => b.status === 'available');
    if (availableBeds.length === 0) {
      HMIS_TOAST.warning('No Beds Available', 'No vacant beds available for transfer.');
      return;
    }

    const bedOptions = availableBeds.map(b => `
      <option value="${b.id}">${b.bedNumber} - ${b.ward} (₹${b.dailyRate}/day)</option>
    `).join('');

    const body = `
      <form id="form-bed-transfer">
        <input type="hidden" name="admissionId" value="${admissionId}">
        <div style="background:#f8fafc;padding:0.75rem;border-radius:6px;border:1px solid #e2e8f0;margin-bottom:1rem;">
          <div style="font-weight:700;color:#0f172a;">${admission.patientName} (${admission.patientUid})</div>
          <div style="font-size:0.8rem;color:#64748b;margin-top:0.2rem;">
            Current Bed: <strong>${admission.bedNumber} (${admission.ward})</strong>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label required">Select New Bed</label>
          <select class="form-control" name="newBedId" required>
            ${bedOptions}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Transfer Rationale</label>
          <input type="text" class="form-control" name="reason" placeholder="e.g. ICU step-down to General Ward, patient request">
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.submitTransferBed()">Confirm Transfer</button>
    `;

    this.open('IPD Bed Transfer', body, footer);
  },

  submitTransferBed() {
    const form = document.getElementById('form-bed-transfer');
    const fd = new FormData(form);
    const admissionId = fd.get('admissionId');
    const newBedId = fd.get('newBedId');

    const user = window.HMIS_AUTH.getCurrentUser();
    const res = window.HMIS_STORE.transferBed(admissionId, newBedId, user ? user.name : 'Front Desk');

    if (res.success) {
      HMIS_TOAST.success('Bed Transferred', `Patient moved to bed ${res.newBed.bedNumber}`);
      HMIS_MODALS.close();
      window.HMIS_ROUTER.renderCurrentRoute();
    } else {
      HMIS_TOAST.error('Transfer Failed', res.message);
    }
  },

  // 7. Clinical Follow-up Modal
  openFollowUpModal(admissionId) {
    const store = window.HMIS_STORE;
    const admission = store.state.admissions.find(a => a.id === admissionId);
    if (!admission) return;

    const body = `
      <form id="form-follow-up">
        <input type="hidden" name="admissionId" value="${admissionId}">
        <input type="hidden" name="patientUid" value="${admission.patientUid}">
        <input type="hidden" name="patientName" value="${admission.patientName}">

        <div style="background:#eff6ff;padding:0.75rem;border-radius:6px;border:1px solid #bfdbfe;margin-bottom:1rem;">
          <strong>${admission.patientName} (${admission.patientUid})</strong> • Ward: ${admission.ward} (Bed: ${admission.bedNumber})
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Round Type</label>
            <select class="form-control" name="roundType">
              <option value="Morning Consultant Round">Morning Consultant Round</option>
              <option value="Evening Doctor Round">Evening Doctor Round</option>
              <option value="Emergency Review">Emergency Review</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">BP / Vitals</label>
            <input type="text" class="form-control" name="bp" placeholder="BP: 120/80, HR: 76, SpO2: 98%" value="BP: 124/80, SpO2: 99%">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label required">Clinical Progress Notes</label>
          <textarea class="form-control" name="progressNotes" placeholder="Patient condition, symptom progression, response to medications..." required></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Treatment Plan Adjustments</label>
          <input type="text" class="form-control" name="treatmentAdjustments" placeholder="Modify antibiotics, adjust IV fluids, tapering...">
        </div>

        <div class="form-group">
          <label class="form-label">Instructions for Nursing Staff</label>
          <input type="text" class="form-control" name="nurseInstructions" placeholder="Check vitals 2-hourly, mobilize in chair...">
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-success btn-sm" onclick="HMIS_MODALS.submitFollowUp()">Save Progress Note</button>
    `;

    this.open('Add IPD Clinical Follow-Up Note', body, footer);
  },

  submitFollowUp() {
    const form = document.getElementById('form-follow-up');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.vitals = { bp: data.bp, hr: '76', spo2: '99%' };

    const doc = window.HMIS_AUTH.getCurrentUser();
    window.HMIS_STORE.saveClinicalFollowUp(data, doc ? doc.name : 'Dr. Santorshi Ghosh');

    HMIS_TOAST.success('Follow-up Recorded', `Progress note added for ${data.patientName}`);
    HMIS_MODALS.close();
    window.HMIS_ROUTER.renderCurrentRoute();
  },

  // 8. Discharge Summary Builder Modal
  openDischargeSummaryModal(admissionId) {
    const store = window.HMIS_STORE;
    const admission = store.state.admissions.find(a => a.id === admissionId);
    if (!admission) return;

    const body = `
      <form id="form-discharge-summary">
        <input type="hidden" name="admissionId" value="${admissionId}">
        <input type="hidden" name="patientUid" value="${admission.patientUid}">
        <input type="hidden" name="patientName" value="${admission.patientName}">
        <input type="hidden" name="admissionDate" value="${admission.admissionDate}">

        <div style="background:#f0fdf4;padding:0.75rem;border-radius:6px;border:1px solid #bbf7d0;margin-bottom:1rem;">
          <strong style="color:#166534;">Discharging Patient: ${admission.patientName} (${admission.patientUid})</strong>
          <div style="font-size:0.75rem;color:#15803d;margin-top:0.2rem;">Admitted on: ${admission.admissionDate} • ${admission.ward} (${admission.bedNumber})</div>
        </div>

        <div class="form-group">
          <label class="form-label required">Admission Diagnosis</label>
          <input type="text" class="form-control" name="diagnosisAtAdmission" value="${admission.admissionReason}" required>
        </div>

        <div class="form-group">
          <label class="form-label required">Final Discharge Diagnosis</label>
          <input type="text" class="form-control" name="finalDiagnosis" placeholder="e.g. Acute Bronchitis (Resolved) / Post Unstable Angina" required>
        </div>

        <div class="form-group">
          <label class="form-label required">Brief Hospital Course & Treatment Summary</label>
          <textarea class="form-control" name="hospitalCourse" placeholder="Describe patient trajectory, procedures done, response to treatment..." required></textarea>
        </div>

        <div class="form-group">
          <label class="form-label required">Condition at Discharge</label>
          <input type="text" class="form-control" name="conditionAtDischarge" value="Clinically stable, afebrile, asymptomatic" required>
        </div>

        <div class="form-group">
          <label class="form-label required">Discharge Medications (one per line)</label>
          <textarea class="form-control" name="dischargeMedications" placeholder="Tab. Atorvastatin 20mg once at night&#10;Tab. Pantoprazole 40mg before breakfast" required></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Dietary Instructions</label>
            <input type="text" class="form-control" name="dietInstructions" value="Normal healthy diet, low salt">
          </div>
          <div class="form-group">
            <label class="form-label">Follow-up Schedule</label>
            <input type="text" class="form-control" name="followUpInstructions" value="Review in OPD after 7 days">
          </div>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-success btn-sm" onclick="HMIS_MODALS.submitDischargeSummary()">
        ✓ Finalize Discharge Summary & Release for Billing
      </button>
    `;

    this.open('Prepare Patient Discharge Summary', body, footer, 'modal-lg');
  },

  submitDischargeSummary() {
    const form = document.getElementById('form-discharge-summary');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    data.dischargeMedications = data.dischargeMedications.split('\n').map(s => s.trim()).filter(Boolean);

    const doc = window.HMIS_AUTH.getCurrentUser();
    const dc = window.HMIS_STORE.saveDischargeSummary(data, doc ? doc.name : 'Dr. Santorshi Ghosh');

    HMIS_TOAST.success('Discharge Summary Prepared', `Patient ${data.patientName} marked ready for final billing.`);
    HMIS_MODALS.close();
    window.HMIS_ROUTER.renderCurrentRoute();

    setTimeout(() => {
      const patient = window.HMIS_STORE.getPatientByUID(data.patientUid);
      const printHtml = window.HMIS_PRINT.renderDischargeSummary(dc, patient);
      window.HMIS_PRINT.openPrintModal(printHtml, 'Official Discharge Summary');
    }, 400);
  },

  // 9. Generate Multi-Department Bill Modal (Receptionist)
  openGenerateBillModal(preselectedPatientUid = null) {
    const store = window.HMIS_STORE;
    const patients = store.getPatients();

    const patientOptions = patients.map(p => `
      <option value="${p.uid}" ${p.uid === preselectedPatientUid ? 'selected' : ''}>
        ${p.name} (${p.uid}) - Insurance: ${p.insuranceProvider}
      </option>
    `).join('');

    const body = `
      <form id="form-generate-bill">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Select Patient</label>
            <select class="form-control" name="patientUid" id="bill-patient-select" required onchange="HMIS_MODALS.onBillingPatientChange(this.value)">
              <option value="">-- Choose Patient --</option>
              ${patientOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Bill Type</label>
            <select class="form-control" name="billType" required>
              <option value="OPD Consultation & Pharmacy">OPD Consultation & Pharmacy</option>
              <option value="Diagnostic Lab & Imaging">Diagnostic Lab & Imaging</option>
              <option value="IPD Final Hospitalization">IPD Final Hospitalization</option>
              <option value="Emergency Care & Observation">Emergency Care & Observation</option>
            </select>
          </div>
        </div>

        <div style="border-bottom:1px solid #e2e8f0;padding-bottom:0.75rem;margin-bottom:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
            <label class="form-label" style="margin:0;">Billable Charges & Items</label>
            <button type="button" class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.addBillItemRow()">+ Add Service Charge</button>
          </div>

          <table class="data-table" id="table-bill-items">
            <thead>
              <tr>
                <th>Service Description</th>
                <th style="width:130px;">Category</th>
                <th style="width:110px;">Amount (₹)</th>
                <th style="width:40px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" class="form-control item-desc" value="Specialist Consultation - Dr. Santorshi Ghosh" required></td>
                <td>
                  <select class="form-control item-cat">
                    <option value="Consultation">Consultation</option>
                    <option value="Bed Charges">Bed Charges</option>
                    <option value="Pathology">Pathology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
                </td>
                <td><input type="number" class="form-control item-amt" value="600" oninput="HMIS_MODALS.recalcBillModal()" required></td>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="this.closest('tr').remove();HMIS_MODALS.recalcBillModal();">✕</button></td>
              </tr>
              <tr>
                <td><input type="text" class="form-control item-desc" value="Complete Blood Count (CBC)" required></td>
                <td>
                  <select class="form-control item-cat">
                    <option value="Pathology" selected>Pathology</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Bed Charges">Bed Charges</option>
                    <option value="Radiology">Radiology</option>
                  </select>
                </td>
                <td><input type="number" class="form-control item-amt" value="350" oninput="HMIS_MODALS.recalcBillModal()" required></td>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="this.closest('tr').remove();HMIS_MODALS.recalcBillModal();">✕</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Discount (₹)</label>
            <input type="number" class="form-control" id="bill-discount" name="discount" value="50" oninput="HMIS_MODALS.recalcBillModal()">
          </div>
          <div class="form-group">
            <label class="form-label">Tax / GST (%)</label>
            <input type="number" class="form-control" id="bill-tax" name="taxRate" value="5" oninput="HMIS_MODALS.recalcBillModal()">
          </div>
          <div class="form-group">
            <label class="form-label">Insurance Covered (₹)</label>
            <input type="number" class="form-control" id="bill-insurance" name="insuranceCovered" value="0" oninput="HMIS_MODALS.recalcBillModal()">
          </div>
        </div>

        <div style="background:#f8fafc;padding:1rem;border-radius:6px;border:1px solid #e2e8f0;margin-top:0.5rem;">
          <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;">
            <span>Sub-Total:</span>
            <span id="calc-subtotal" style="font-weight:600;">₹ 950</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;color:#16a34a;">
            <span>Discount:</span>
            <span id="calc-discount">- ₹ 50</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;">
            <span>GST Amount:</span>
            <span id="calc-tax">+ ₹ 45</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:1rem;font-weight:800;color:#1e40af;border-top:1px solid #cbd5e1;padding-top:0.4rem;">
            <span>Grand Total:</span>
            <span id="calc-grandtotal">₹ 945</span>
          </div>
        </div>

        <div class="form-row" style="margin-top:1rem;">
          <div class="form-group">
            <label class="form-label">Amount Paid Now (₹)</label>
            <input type="number" class="form-control" name="amountPaid" value="945">
          </div>
          <div class="form-group">
            <label class="form-label">Payment Method</label>
            <select class="form-control" name="paymentMethod">
              <option value="Cash / Reception">Cash / Reception Counter</option>
              <option value="UPI / QR">UPI / QR Code</option>
              <option value="Debit / Credit Card">Debit / Credit Card</option>
              <option value="Insurance TPA Direct">Insurance TPA Direct</option>
            </select>
          </div>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.submitGenerateBill()">
        ✓ Generate Final Tax Invoice
      </button>
    `;

    this.open('Generate Medical Invoice & Bill', body, footer, 'modal-lg');
    setTimeout(() => this.recalcBillModal(), 50);
  },

  addBillItemRow() {
    const table = document.querySelector('#table-bill-items tbody');
    if (!table) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-control item-desc" placeholder="Service description" required></td>
      <td>
        <select class="form-control item-cat">
          <option value="General Service">General Service</option>
          <option value="Consultation">Consultation</option>
          <option value="Bed Charges">Bed Charges</option>
          <option value="Pathology">Pathology</option>
          <option value="Radiology">Radiology</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>
      </td>
      <td><input type="number" class="form-control item-amt" value="200" oninput="HMIS_MODALS.recalcBillModal()" required></td>
      <td><button type="button" class="btn btn-danger btn-sm" onclick="this.closest('tr').remove();HMIS_MODALS.recalcBillModal();">✕</button></td>
    `;
    table.appendChild(tr);
    this.recalcBillModal();
  },

  recalcBillModal() {
    const amtInputs = document.querySelectorAll('#table-bill-items .item-amt');
    let subTotal = 0;
    amtInputs.forEach(inp => {
      subTotal += parseFloat(inp.value) || 0;
    });

    const discount = parseFloat(document.getElementById('bill-discount')?.value) || 0;
    const taxRate = parseFloat(document.getElementById('bill-tax')?.value) || 5;
    const discounted = Math.max(0, subTotal - discount);
    const taxAmount = Math.round(discounted * (taxRate / 100));
    const grandTotal = discounted + taxAmount;

    if (document.getElementById('calc-subtotal')) document.getElementById('calc-subtotal').innerText = '₹ ' + subTotal.toLocaleString('en-IN');
    if (document.getElementById('calc-discount')) document.getElementById('calc-discount').innerText = '- ₹ ' + discount.toLocaleString('en-IN');
    if (document.getElementById('calc-tax')) document.getElementById('calc-tax').innerText = '+ ₹ ' + taxAmount.toLocaleString('en-IN');
    if (document.getElementById('calc-grandtotal')) document.getElementById('calc-grandtotal').innerText = '₹ ' + grandTotal.toLocaleString('en-IN');
  },

  submitGenerateBill() {
    const form = document.getElementById('form-generate-bill');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    const patient = window.HMIS_STORE.getPatientByUID(data.patientUid);
    if (!patient) {
      HMIS_TOAST.error('Error', 'Please select a valid patient');
      return;
    }
    data.patientName = patient.name;

    // Gather items
    const rows = document.querySelectorAll('#table-bill-items tbody tr');
    const items = [];
    rows.forEach(row => {
      const desc = row.querySelector('.item-desc').value.trim();
      const cat = row.querySelector('.item-cat').value;
      const amt = parseFloat(row.querySelector('.item-amt').value) || 0;
      if (desc && amt >= 0) {
        items.push({ description: desc, category: cat, amount: amt });
      }
    });

    data.items = items;
    const user = window.HMIS_AUTH.getCurrentUser();
    const bill = window.HMIS_STORE.generateBill(data, user ? user.name : 'Billing Section');

    HMIS_TOAST.success('Bill Generated', `Invoice ${bill.billNumber} created for ${bill.patientName}`);
    HMIS_MODALS.close();
    window.HMIS_ROUTER.renderCurrentRoute();

    setTimeout(() => {
      const printHtml = window.HMIS_PRINT.renderBill(bill, false);
      window.HMIS_PRINT.openPrintModal(printHtml, 'Official Hospital Tax Invoice');
    }, 400);
  },

  // 10. Payment Modal (Settle outstanding bill)
  openPaymentModal(billId) {
    const bill = window.HMIS_STORE.state.bills.find(b => b.id === billId);
    if (!bill) return;

    const body = `
      <form id="form-settle-payment">
        <input type="hidden" name="billId" value="${billId}">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:1rem;border-radius:6px;margin-bottom:1rem;">
          <div style="display:flex;justify-content:space-between;font-size:0.9rem;">
            <span>Invoice: <strong>${bill.billNumber}</strong></span>
            <span class="badge ${bill.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'}">${bill.paymentStatus}</span>
          </div>
          <div style="font-size:0.8rem;color:#64748b;margin-top:0.35rem;">
            Patient: <strong>${bill.patientName} (${bill.patientUid})</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:1.1rem;font-weight:800;color:#dc2626;margin-top:0.75rem;border-top:1px solid #cbd5e1;padding-top:0.5rem;">
            <span>Balance Due:</span>
            <span>₹ ${bill.balanceDue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label required">Payment Amount (₹)</label>
          <input type="number" class="form-control" name="amount" value="${bill.balanceDue}" max="${bill.balanceDue}" min="1" required>
        </div>

        <div class="form-group">
          <label class="form-label required">Payment Method</label>
          <select class="form-control" name="paymentMethod" required>
            <option value="UPI / Online NetBanking">UPI / Online NetBanking</option>
            <option value="Credit / Debit Card">Credit / Debit Card</option>
            <option value="Cash Counter">Cash Counter</option>
            <option value="Insurance TPA Reimbursement">Insurance TPA Reimbursement</option>
          </select>
        </div>
      </form>
    `;

    const footer = `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-success btn-sm" onclick="HMIS_MODALS.submitPayment()">
        ✓ Complete Payment & Update Ledger
      </button>
    `;

    this.open('Process Hospital Bill Payment', body, footer);
  },

  submitPayment() {
    const form = document.getElementById('form-settle-payment');
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    const billId = fd.get('billId');
    const amount = parseFloat(fd.get('amount'));
    const paymentMethod = fd.get('paymentMethod');

    const currentUser = window.HMIS_AUTH.getCurrentUser();
    const res = window.HMIS_STORE.recordPayment(billId, {
      amount,
      paymentMethod,
      transactionRef: 'PAY-' + Math.floor(1000000 + Math.random() * 9000000)
    }, currentUser ? currentUser.name : 'Patient Portal');

    if (res.success) {
      HMIS_TOAST.success('Payment Successful', `Paid ₹ ${amount} for invoice ${res.bill.billNumber}`);
      HMIS_MODALS.close();
      window.HMIS_ROUTER.renderCurrentRoute();
    }
  }
};
