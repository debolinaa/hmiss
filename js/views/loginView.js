/**
 * HMIS - Login View
 * Unified Professional Healthcare Portal Access
 * Features 1-Click Demo Switcher for the 4 Student Roles & Manual Login
 */

window.HMIS_LOGIN_VIEW = {
  render() {
    return `
      <div class="login-wrapper">
        <!-- Left Hero Section -->
        <div class="login-left">
          <div>
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <div class="brand-icon" style="width:44px;height:44px;font-size:1.3rem;">🏥</div>
              <div>
                <h1 style="font-size:1.4rem;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">MEDICORE HMIS</h1>
                <div style="font-size:0.75rem;color:#93c5fd;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">
                  Hospital Management & Information System
                </div>
              </div>
            </div>

            <div class="login-hero-title">
              Integrated Clinical & Hospital Information Portal
            </div>
            <p class="login-hero-desc">
              A comprehensive healthcare management system streamlining outpatient consultations, inpatient admissions, bed tracking, electronic prescriptions, diagnostics, and multi-department billing.
            </p>
          </div>

          <!-- Quick Demo Switcher Cards for the 4 Lab Assignment Students -->
          <div class="demo-accounts-container">
            <div class="demo-accounts-title">
              ⚡ Instant 1-Click Evaluation Accounts (Lab Assignment)
            </div>
            <div class="demo-cards-grid">
              <!-- Student 1: Abhinaba Giri (Admin) -->
              <div class="demo-user-card" onclick="HMIS_LOGIN_VIEW.quickLogin('admin')">
                <div class="demo-user-avatar" style="background:#2563eb;">AG</div>
                <div>
                  <div class="demo-user-name">Abhinaba Giri</div>
                  <div class="demo-user-role">Administrator</div>
                </div>
              </div>

              <!-- Student 2: Santorshi Ghosh (Doctor) -->
              <div class="demo-user-card" onclick="HMIS_LOGIN_VIEW.quickLogin('doctor')">
                <div class="demo-user-avatar" style="background:#0d9488;">SG</div>
                <div>
                  <div class="demo-user-name">Dr. Santorshi Ghosh</div>
                  <div class="demo-user-role">Doctor / Physician</div>
                </div>
              </div>

              <!-- Student 3: Shreyasree Ghosh (Receptionist) -->
              <div class="demo-user-card" onclick="HMIS_LOGIN_VIEW.quickLogin('receptionist')">
                <div class="demo-user-avatar" style="background:#d97706;">SG</div>
                <div>
                  <div class="demo-user-name">Shreyasree Ghosh</div>
                  <div class="demo-user-role">Receptionist / OPD</div>
                </div>
              </div>

              <!-- Student 4: Debolina Dey (Patient) -->
              <div class="demo-user-card" onclick="HMIS_LOGIN_VIEW.quickLogin('patient')">
                <div class="demo-user-avatar" style="background:#7c3aed;">DD</div>
                <div>
                  <div class="demo-user-name">Debolina Dey</div>
                  <div class="demo-user-role">Patient (HMIS-2026-0001)</div>
                </div>
              </div>
            </div>
          </div>

          <div style="font-size:0.75rem;color:#94a3b8;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.1);padding-top:1rem;">
            <span>Software Engineering Laboratory Project</span>
            <button style="background:transparent;border:none;color:#38bdf8;cursor:pointer;font-size:0.75rem;font-weight:600;" onclick="HMIS_MODALS.openAssignmentModal()">
              View Team Roles & Details ↗
            </button>
          </div>
        </div>

        <!-- Right Login Form -->
        <div class="login-right">
          <div style="max-width:400px;width:100%;margin:0 auto;">
            <div style="margin-bottom:2rem;">
              <h2 style="font-size:1.75rem;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">Portal Sign In</h2>
              <p style="font-size:0.875rem;color:#64748b;margin-top:0.35rem;">
                Select a demo account on the left or sign in below with your credentials.
              </p>
            </div>

            <form id="form-login" onsubmit="HMIS_LOGIN_VIEW.handleLogin(event)">
              <div class="form-group">
                <label class="form-label required">Username or Email</label>
                <input type="text" id="login-username" class="form-control" placeholder="admin, doctor, receptionist, or patient" value="admin" required autofocus>
              </div>

              <div class="form-group">
                <label class="form-label required">Password</label>
                <input type="password" id="login-password" class="form-control" placeholder="Enter password" value="123" required>
                <div style="font-size:0.75rem;color:#64748b;margin-top:0.35rem;">
                  Default lab demonstration password is: <code style="background:#f1f5f9;padding:0.1rem 0.35rem;border-radius:4px;color:#1e40af;font-weight:700;">123</code>
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;font-size:0.82rem;">
                <label style="display:flex;align-items:center;gap:0.4rem;color:#475569;cursor:pointer;">
                  <input type="checkbox" checked> Remember session
                </label>
                <a href="javascript:void(0)" onclick="HMIS_TOAST.info('Password Reset', 'Contact Hospital Administrator Abhinaba Giri for credential recovery.')" style="color:#2563eb;text-decoration:none;font-weight:600;">
                  Forgot password?
                </a>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%;padding:0.75rem;font-size:0.95rem;">
                Sign In to Dashboard →
              </button>
            </form>

            <div style="margin-top:2rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:0.85rem;font-size:0.78rem;color:#475569;">
              <strong style="color:#0f172a;display:block;margin-bottom:0.35rem;">Demo Credentials Quick Reference:</strong>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;">
                <div>Admin: <code>admin</code> / <code>123</code></div>
                <div>Doctor: <code>doctor</code> / <code>123</code></div>
                <div>Reception: <code>receptionist</code> / <code>123</code></div>
                <div>Patient: <code>patient</code> / <code>123</code></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  quickLogin(role) {
    const res = window.HMIS_AUTH.quickDemoLogin(role);
    if (res.success) {
      HMIS_TOAST.success('Signed In', `Welcome, ${res.user.name} (${res.user.role.toUpperCase()})`);
      const targetHash = window.HMIS_AUTH.getDefaultRouteForRole(res.user.role);
      window.location.hash = targetHash;
    }
  },

  handleLogin(e) {
    e.preventDefault();
    const userInp = document.getElementById('login-username').value;
    const passInp = document.getElementById('login-password').value;

    const res = window.HMIS_AUTH.login(userInp, passInp);
    if (res.success) {
      HMIS_TOAST.success('Authentication Successful', `Welcome, ${res.user.name}`);
      const targetHash = window.HMIS_AUTH.getDefaultRouteForRole(res.user.role);
      window.location.hash = targetHash;
    } else {
      HMIS_TOAST.error('Login Failed', res.message);
    }
  }
};
