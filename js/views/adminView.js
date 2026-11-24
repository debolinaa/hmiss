/**
 * HMIS - Administrator Portal View (Abhinaba Giri)
 * Pages: Dashboard, Users, Departments, Staff, Duty Roster, Consultation Schedule,
 * Billing Configuration, Security & Backup, Reports, Settings
 */

window.HMIS_ADMIN_VIEW = {
  render(subRoute = 'dashboard') {
    const store = window.HMIS_STORE;
    switch (subRoute) {
      case 'dashboard': return this.renderDashboard(store);
      case 'users': return this.renderUsers(store);
      case 'departments': return this.renderDepartments(store);
      case 'staff': return this.renderStaff(store);
      case 'duty-roster': return this.renderDutyRoster(store);
      case 'consultation-schedule': return this.renderConsultationSchedule(store);
      case 'billing-config': return this.renderBillingConfig(store);
      case 'security-backup': return this.renderSecurityBackup(store);
      case 'reports': return this.renderReports(store);
      case 'settings': return this.renderSettings(store);
      default: return this.renderDashboard(store);
    }
  },

  // 1. Admin Dashboard
  renderDashboard(store) {
    const totalPatients = store.state.patients.length;
    const today = new Date().toISOString().substring(0, 10);
    const todayApts = store.state.appointments.filter(a => a.date === today).length;
    const opdCount = store.state.appointments.length;
    const ipdCount = store.state.admissions.filter(a => a.status === 'Admitted').length;
    const availableBeds = store.state.beds.filter(b => b.status === 'available').length;
    const totalBeds = store.state.beds.length;
    const staffOnDuty = store.state.staff.filter(s => s.status === 'On Duty').length;
    const pendingBills = store.state.bills.filter(b => b.paymentStatus !== 'Paid').length;
    const totalRevenue = store.state.bills.reduce((sum, b) => sum + (b.amountPaid || 0), 0);

    const recentLogs = store.state.auditLogs.slice(0, 5).map(l => `
      <tr>
        <td style="font-family:monospace;font-size:0.75rem;">${l.timestamp}</td>
        <td style="font-weight:600;">${l.user}</td>
        <td><span class="badge badge-neutral">${l.role}</span></td>
        <td><code style="color:#1e40af;">${l.action}</code></td>
        <td style="font-size:0.8rem;">${l.details}</td>
      </tr>
    `).join('');

    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Hospital Administrator Dashboard</h1>
            <p class="page-subtitle">Overview & Control Center • Administrator: <strong>Abhinaba Giri</strong></p>
          </div>
          <div class="page-actions">
            <button class="btn btn-secondary btn-sm" onclick="HMIS_ADMIN_VIEW.downloadQuickBackup()">
              📥 Download Backup
            </button>
            <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openAssignmentModal()">
              ℹ️ Assignment Roles
            </button>
          </div>
        </div>

        <!-- 7 Core Metric Cards -->
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-icon blue">👥</div>
            <div class="stat-info">
              <div class="stat-value">${totalPatients}</div>
              <div class="stat-label">Total Patients</div>
              <div class="stat-sub" style="color:#16a34a;">↑ Registered in HMIS</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon teal">📅</div>
            <div class="stat-info">
              <div class="stat-value">${todayApts}</div>
              <div class="stat-label">Today's Appointments</div>
              <div class="stat-sub">Across all OPD clinics</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon purple">🩺</div>
            <div class="stat-info">
              <div class="stat-value">${opdCount}</div>
              <div class="stat-label">OPD Consultations</div>
              <div class="stat-sub">Active visits logged</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon amber">🛌</div>
            <div class="stat-info">
              <div class="stat-value">${ipdCount}</div>
              <div class="stat-label">IPD In-Patients</div>
              <div class="stat-sub" style="color:#d97706;">Currently admitted</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon green">🛏️</div>
            <div class="stat-info">
              <div class="stat-value">${availableBeds} / ${totalBeds}</div>
              <div class="stat-label">Available Beds</div>
              <div class="stat-sub" style="color:#16a34a;">${Math.round((availableBeds/totalBeds)*100)}% Vacant Capacity</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon blue">🧑‍⚕️</div>
            <div class="stat-info">
              <div class="stat-value">${staffOnDuty}</div>
              <div class="stat-label">Staff on Duty</div>
              <div class="stat-sub">Morning shift roster</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon red">💳</div>
            <div class="stat-info">
              <div class="stat-value">${pendingBills}</div>
              <div class="stat-label">Pending Invoices</div>
              <div class="stat-sub" style="color:#dc2626;">Awaiting settlement</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon teal">💰</div>
            <div class="stat-info">
              <div class="stat-value">₹ ${totalRevenue.toLocaleString('en-IN')}</div>
              <div class="stat-label">Total Revenue Collected</div>
              <div class="stat-sub">OPD & IPD collections</div>
            </div>
          </div>
        </div>

        <!-- Bed Allocation Matrix Overview -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Live Hospital Bed Occupancy Matrix</div>
              <div class="card-subtitle">Real-time status of General Ward, Semi-Private, and ICU beds</div>
            </div>
            <div style="display:flex;gap:0.75rem;font-size:0.78rem;">
              <span style="display:flex;align-items:center;gap:0.3rem;"><span style="width:10px;height:10px;border-radius:50%;background:#10b981;"></span> Available</span>
              <span style="display:flex;align-items:center;gap:0.3rem;"><span style="width:10px;height:10px;border-radius:50%;background:#ef4444;"></span> Occupied</span>
              <span style="display:flex;align-items:center;gap:0.3rem;"><span style="width:10px;height:10px;border-radius:50%;background:#0284c7;"></span> Reserved</span>
            </div>
          </div>
          <div class="card-body">
            <div class="bed-matrix">
              ${store.state.beds.map(b => `
                <div class="bed-cell ${b.status}" onclick="HMIS_TOAST.info('Bed ${b.bedNumber}', '${b.ward} • Rate: ₹${b.dailyRate}/day • Status: ${b.status.toUpperCase()} ${b.patientName ? `• Patient: ${b.patientName}` : ''}')">
                  <div class="bed-number">${b.bedNumber}</div>
                  <div class="bed-type">${b.ward.split(' ')[0]}</div>
                  <span class="bed-status-pill">${b.status}</span>
                  ${b.patientName ? `<div class="bed-patient">${b.patientName}</div>` : '<div style="font-size:0.7rem;color:#94a3b8;margin-top:0.35rem;">Vacant</div>'}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- System Security & Live Audit Stream -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Recent System Security & Operational Audit Log</div>
              <div class="card-subtitle">Automated ledger tracking user logins, medical actions, and data changes</div>
            </div>
            <a href="#admin/security-backup" class="btn btn-outline btn-sm">View Full Logs →</a>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                ${recentLogs}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 2. User/Account Management
  renderUsers(store) {
    const users = store.state.users;
    const userRows = users.map(u => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:0.6rem;">
            <div class="user-avatar" style="width:32px;height:32px;font-size:0.75rem;">${u.avatar || 'U'}</div>
            <div>
              <strong style="color:#0f172a;">${u.name}</strong>
              <div style="font-size:0.72rem;color:#64748b;">@${u.username}</div>
            </div>
          </div>
        </td>
        <td><span class="badge role-${u.role}">${u.role.toUpperCase()}</span></td>
        <td>${u.email || '-'}</td>
        <td>${u.phone || '-'}</td>
        <td>${u.department || 'General'}</td>
        <td><span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}">${u.status}</span></td>
        <td style="font-size:0.75rem;color:#64748b;">${u.lastLogin || 'Never'}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="HMIS_TOAST.info('Account Security', 'Password for ${u.username} is reset to default (123)')">
            Reset Password
          </button>
        </td>
      </tr>
    `).join('');

    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">User & Account Management</h1>
            <p class="page-subtitle">Manage hospital credentials, RBAC permissions, and active staff accounts</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-primary btn-sm" onclick="HMIS_ADMIN_VIEW.openNewUserModal()">+ Add New User</button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">Hospital User Directory (${users.length} Accounts)</div>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${userRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  openNewUserModal() {
    const body = `
      <form id="form-add-user">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Full Name</label>
            <input type="text" class="form-control" name="name" placeholder="e.g. Dr. Ramesh Gupta" required>
          </div>
          <div class="form-group">
            <label class="form-label required">Username</label>
            <input type="text" class="form-control" name="username" placeholder="e.g. ramesh" required>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Role</label>
            <select class="form-control" name="role" required>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="admin">Administrator</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label required">Department</label>
            <select class="form-control" name="department">
              <option value="Cardiology">Cardiology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Reception & Admissions">Reception & Admissions</option>
              <option value="Hospital Administration">Hospital Administration</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">Email</label>
            <input type="email" class="form-control" name="email" placeholder="user@hmis.med" required>
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-control" name="phone" placeholder="+91 98765 43210">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label required">Initial Password</label>
          <input type="password" class="form-control" name="password" value="123" required>
        </div>
      </form>
    `;

    HMIS_MODALS.open('Create Hospital User Account', body, `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-primary btn-sm" onclick="HMIS_ADMIN_VIEW.submitNewUser()">Save User Account</button>
    `);
  },

  submitNewUser() {
    const form = document.getElementById('form-add-user');
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    window.HMIS_STORE.addUser(data);
    HMIS_TOAST.success('User Created', `Account created for ${data.name} (${data.role})`);
    HMIS_MODALS.close();
    window.HMIS_ROUTER.renderCurrentRoute();
  },

  // 3. Departments
  renderDepartments(store) {
    const depts = store.state.departments;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Hospital Departments</h1>
            <p class="page-subtitle">Configure OPD, IPD, Diagnostics, and Clinical Specialties</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="HMIS_TOAST.info('Department Master', 'Department configuration updated across all billing forms.')">+ Add Department</button>
        </div>

        <div class="stat-grid">
          ${depts.map(d => `
            <div class="card" style="margin-bottom:0;">
              <div class="card-header">
                <div>
                  <strong style="color:#1e40af;font-size:1rem;">${d.name}</strong>
                  <div style="font-size:0.75rem;color:#64748b;">Code: ${d.code} • Floor: ${d.floor}</div>
                </div>
                <span class="badge badge-success">Active</span>
              </div>
              <div class="card-body" style="font-size:0.85rem;">
                <div style="margin-bottom:0.4rem;">
                  <span style="color:#64748b;">Head of Department:</span><br>
                  <strong style="color:#0f172a;">${d.head}</strong>
                </div>
                <div style="margin-bottom:0.4rem;">
                  <span style="color:#64748b;">Base OPD Consultation Fee:</span><br>
                  <strong style="color:#059669;font-size:1.05rem;">₹ ${d.opdFee}</strong>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 4. Staff Management
  renderStaff(store) {
    const staff = store.state.staff;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Hospital Staff Directory</h1>
            <p class="page-subtitle">Doctors, Nursing Supervisors, Front Desk Officers, and Administrators</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Role</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Qualifications</th>
                  <th>Contact</th>
                  <th>Shift</th>
                  <th>Duty Status</th>
                </tr>
              </thead>
              <tbody>
                ${staff.map(s => `
                  <tr>
                    <td style="font-weight:700;color:#0f172a;">${s.name}</td>
                    <td><span class="badge ${s.role === 'Doctor' ? 'badge-primary' : (s.role === 'Nurse' ? 'badge-info' : 'badge-neutral')}">${s.role}</span></td>
                    <td>${s.designation}</td>
                    <td>${s.department}</td>
                    <td><code style="font-size:0.75rem;">${s.qualification}</code></td>
                    <td>${s.contact}</td>
                    <td>${s.shift}</td>
                    <td><span class="badge ${s.status === 'On Duty' ? 'badge-success' : 'badge-neutral'}">${s.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 5. Duty Roster
  renderDutyRoster(store) {
    const roster = store.state.dutyRoster;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Hospital Duty Roster & Shifts</h1>
            <p class="page-subtitle">Departmental shift coverage, on-call schedules, and staff rotations</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨️ Print Shift Roster</button>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Assigned Shift</th>
                  <th>Scheduled Days</th>
                  <th>Roster Status</th>
                </tr>
              </thead>
              <tbody>
                ${roster.map(r => `
                  <tr>
                    <td style="font-weight:700;color:#0f172a;">${r.staffName}</td>
                    <td><span class="badge badge-neutral">${r.role}</span></td>
                    <td>${r.department}</td>
                    <td style="font-weight:600;color:#1e40af;">${r.shift}</td>
                    <td>${r.days}</td>
                    <td><span class="badge badge-success">${r.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 6. Consultation Schedule
  renderConsultationSchedule(store) {
    const schedules = store.state.consultationSchedules;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Doctor Consultation Schedules</h1>
            <p class="page-subtitle">OPD clinical timing slots, room assignments, and daily patient quota</p>
          </div>
        </div>

        <div class="card">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>OPD Chamber</th>
                  <th>Consultation Days</th>
                  <th>Timings</th>
                  <th>Slot Duration</th>
                  <th>Max Patient Quota</th>
                </tr>
              </thead>
              <tbody>
                ${schedules.map(sch => `
                  <tr>
                    <td style="font-weight:700;color:#0f172a;">${sch.doctorName}</td>
                    <td>${sch.department}</td>
                    <td><span class="badge badge-primary">${sch.room}</span></td>
                    <td>${sch.days}</td>
                    <td style="font-weight:600;color:#0f766e;">${sch.timing}</td>
                    <td>${sch.slotDuration}</td>
                    <td><strong>${sch.maxPatients} Patients</strong> / Day</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // 7. Billing Configuration
  renderBillingConfig(store) {
    const config = store.state.billingConfig;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Billing & Tariff Configuration</h1>
            <p class="page-subtitle">Configure consultation tariffs, daily bed charges, GST tax rates, and insurance policies</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="HMIS_ADMIN_VIEW.saveBillingConfig()">
            💾 Save Tariff Changes
          </button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Consultation Charges</div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Base General Physician Fee (₹)</label>
                <input type="number" class="form-control" id="cfg-base-fee" value="${config.baseConsultationFee}">
              </div>
              <div class="form-group">
                <label class="form-label">Specialist Consultant Fee (₹)</label>
                <input type="number" class="form-control" id="cfg-spec-fee" value="${config.specialistConsultationFee}">
              </div>
              <div class="form-group">
                <label class="form-label">Emergency / Trauma Consultation Fee (₹)</label>
                <input type="number" class="form-control" id="cfg-emg-fee" value="${config.emergencyFee}">
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-title">Ward Daily Bed Tariffs (IPD)</div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">General Ward (₹ / Day)</label>
                <input type="number" class="form-control" id="cfg-ward-gw" value="${config.wardRates.generalWard}">
              </div>
              <div class="form-group">
                <label class="form-label">Semi-Private Room (₹ / Day)</label>
                <input type="number" class="form-control" id="cfg-ward-sp" value="${config.wardRates.semiPrivate}">
              </div>
              <div class="form-group">
                <label class="form-label">Intensive Care Unit (ICU) (₹ / Day)</label>
                <input type="number" class="form-control" id="cfg-ward-icu" value="${config.wardRates.icu}">
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-title">Taxation & Discount Policy</div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Default GST Tax Rate (%)</label>
                <input type="number" class="form-control" id="cfg-tax-rate" value="${config.defaultTaxGstPercent}">
              </div>
              <div class="form-group">
                <label class="form-label">Standard Senior Citizen Discount (%)</label>
                <input type="number" class="form-control" id="cfg-discount" value="${config.standardDiscountPercent}">
              </div>
              <div class="form-group">
                <label class="form-label">Approved Insurance / TPA Partners</label>
                <div style="font-size:0.8rem;color:#475569;line-height:1.6;">
                  ${config.acceptedInsurances.map(ins => `<span class="badge badge-info" style="margin:0.2rem;">${ins}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  saveBillingConfig() {
    const newConfig = {
      baseConsultationFee: parseFloat(document.getElementById('cfg-base-fee').value),
      specialistConsultationFee: parseFloat(document.getElementById('cfg-spec-fee').value),
      emergencyFee: parseFloat(document.getElementById('cfg-emg-fee').value),
      wardRates: {
        generalWard: parseFloat(document.getElementById('cfg-ward-gw').value),
        semiPrivate: parseFloat(document.getElementById('cfg-ward-sp').value),
        icu: parseFloat(document.getElementById('cfg-ward-icu').value)
      },
      defaultTaxGstPercent: parseFloat(document.getElementById('cfg-tax-rate').value),
      standardDiscountPercent: parseFloat(document.getElementById('cfg-discount').value)
    };

    window.HMIS_STORE.updateBillingConfig(newConfig);
    HMIS_TOAST.success('Configuration Saved', 'Hospital tariff schedule updated.');
  },

  // 8. Security & Backup
  renderSecurityBackup(store) {
    const logs = store.state.auditLogs;
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Data Security, Backups & Audit Trail</h1>
            <p class="page-subtitle">Full database snapshot exports, restoration, and access audit log</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-success btn-sm" onclick="HMIS_ADMIN_VIEW.downloadQuickBackup()">
              📥 Export Full Database (JSON)
            </button>
            <button class="btn btn-secondary btn-sm" onclick="HMIS_ADMIN_VIEW.triggerImportModal()">
              📤 Restore from Backup
            </button>
            <button class="btn btn-danger btn-sm" onclick="HMIS_ADMIN_VIEW.confirmResetDatabase()">
              ⚠️ Reset Database to Defaults
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">Security & Event Audit Log (${logs.length} Total Events)</div>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Security Action</th>
                  <th>Audit Details</th>
                </tr>
              </thead>
              <tbody>
                ${logs.map(l => `
                  <tr>
                    <td style="font-family:monospace;font-size:0.75rem;">${l.timestamp}</td>
                    <td style="font-weight:700;">${l.user}</td>
                    <td><span class="badge role-${l.role}">${l.role}</span></td>
                    <td><code style="font-weight:700;color:#1e40af;">${l.action}</code></td>
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

  downloadQuickBackup() {
    const dataStr = window.HMIS_STORE.exportDatabaseJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HMIS_DATABASE_BACKUP_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    HMIS_TOAST.success('Backup Generated', 'Full database snapshot downloaded as JSON file.');
  },

  triggerImportModal() {
    const body = `
      <div>
        <p style="font-size:0.85rem;color:#475569;margin-bottom:1rem;">
          Select a valid JSON database backup file to restore the system state:
        </p>
        <input type="file" id="backup-file-input" accept=".json" class="form-control">
      </div>
    `;
    HMIS_MODALS.open('Restore Database from Backup', body, `
      <button class="btn btn-secondary btn-sm" onclick="HMIS_MODALS.close()">Cancel</button>
      <button class="btn btn-primary btn-sm" onclick="HMIS_ADMIN_VIEW.handleFileRestore()">Restore State</button>
    `);
  },

  handleFileRestore() {
    const fileInput = document.getElementById('backup-file-input');
    if (!fileInput || !fileInput.files[0]) {
      HMIS_TOAST.error('Error', 'Please choose a file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = window.HMIS_STORE.importDatabaseJSON(e.target.result);
      if (res.success) {
        HMIS_TOAST.success('Restored', res.message);
        HMIS_MODALS.close();
        window.HMIS_ROUTER.renderCurrentRoute();
      } else {
        HMIS_TOAST.error('Error', res.message);
      }
    };
    reader.readAsText(fileInput.files[0]);
  },

  confirmResetDatabase() {
    if (confirm('Are you sure you want to reset all data to default assignment seed state? Any freshly added appointments or patients will revert.')) {
      window.HMIS_STORE.resetToDefault();
      HMIS_TOAST.success('Database Reset', 'System reverted to pristine lab presentation state.');
      window.HMIS_ROUTER.renderCurrentRoute();
    }
  },

  // 9. Reports
  renderReports(store) {
    const bills = store.state.bills;
    const patients = store.state.patients;
    const beds = store.state.beds;

    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Executive Reports & Analytics</h1>
            <p class="page-subtitle">Hospital occupancy, financial collections, and operational volume summaries</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨️ Print Report</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;margin-bottom:1.5rem;">
          <div class="card">
            <div class="card-header">
              <div class="card-title">Ward Occupancy Breakdown</div>
            </div>
            <div class="card-body">
              <div style="display:flex;flex-direction:column;gap:0.75rem;">
                <div>
                  <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;">
                    <span>General Ward (10 Beds):</span>
                    <strong>${beds.filter(b => b.ward.includes('General') && b.status === 'occupied').length} Occupied</strong>
                  </div>
                  <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                    <div style="width:${(beds.filter(b => b.ward.includes('General') && b.status === 'occupied').length / 10) * 100}%;height:100%;background:#ef4444;"></div>
                  </div>
                </div>

                <div>
                  <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;">
                    <span>Semi-Private (6 Beds):</span>
                    <strong>${beds.filter(b => b.ward.includes('Semi-Private') && b.status === 'occupied').length} Occupied</strong>
                  </div>
                  <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                    <div style="width:${(beds.filter(b => b.ward.includes('Semi-Private') && b.status === 'occupied').length / 6) * 100}%;height:100%;background:#f59e0b;"></div>
                  </div>
                </div>

                <div>
                  <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;">
                    <span>ICU (4 Beds):</span>
                    <strong>${beds.filter(b => b.ward.includes('ICU') && b.status === 'occupied').length} Occupied</strong>
                  </div>
                  <div style="height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;">
                    <div style="width:${(beds.filter(b => b.ward.includes('ICU') && b.status === 'occupied').length / 4) * 100}%;height:100%;background:#dc2626;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <div class="card-title">Patient Satisfaction & Feedback</div>
            </div>
            <div class="card-body">
              ${store.state.feedback.map(fb => `
                <div style="border-left:3px solid #10b981;padding-left:0.75rem;margin-bottom:0.75rem;">
                  <div style="display:flex;justify-content:space-between;font-size:0.85rem;font-weight:700;">
                    <span>${fb.patientName} (${fb.patientUid})</span>
                    <span style="color:#f59e0b;">${'★'.repeat(fb.rating)} (${fb.rating}/5)</span>
                  </div>
                  <div style="font-size:0.75rem;color:#64748b;margin-top:0.15rem;">Dept: ${fb.department} • Doctor: ${fb.doctorName}</div>
                  <p style="font-size:0.8rem;color:#334155;margin-top:0.35rem;">"${fb.comments}"</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 10. Settings
  renderSettings(store) {
    return `
      <div>
        <div class="page-header">
          <div>
            <h1 class="page-title">Hospital Information System Settings</h1>
            <p class="page-subtitle">Hospital metadata, academic lab assignment credits, and operational parameters</p>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">Software Engineering Lab Project Details</div>
          </div>
          <div class="card-body" style="font-size:0.85rem;line-height:1.7;">
            <p><strong>System Name:</strong> Hospital Management & Information System (HMIS)</p>
            <p><strong>Version:</strong> Release 1.0 (Lab Presentation Ready)</p>
            <p><strong>Student Contributors & Functional Roles:</strong></p>
            <ul style="margin:0.5rem 0 0.75rem 1.5rem;">
              <li><strong>Abhinaba Giri</strong> — Administrator: System administration, RBAC, department & duty management, tariff configuration, backup and data integrity.</li>
              <li><strong>Santorshi Ghosh</strong> — Doctor: Clinical consultation, electronic diagnosis & prescriptions, IPD daily rounds follow-up, discharge preparation.</li>
              <li><strong>Shreyasree Ghosh</strong> — Receptionist: Patient onboarding & UID generation, OPD appointment scheduling, IPD bed allotment & transfers, billing & duplicate invoices.</li>
              <li><strong>Debolina Dey</strong> — Patient: Portal self-service, appointment tracking, medical history & Rx access, online payment, duplicate bill requests, feedback.</li>
            </ul>
            <button class="btn btn-primary btn-sm" onclick="HMIS_MODALS.openAssignmentModal()">
              View Complete Attribution Modal
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
