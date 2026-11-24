/**
 * HMIS - SPA Hash Router & Role-Based Navigation Renderer
 * Software Engineering Lab Project
 */

class HMISRouter {
  constructor() {
    this.currentHash = '';
    window.addEventListener('hashchange', () => this.handleHashChange());
  }

  init() {
    if (!window.location.hash) {
      window.location.hash = '#login';
    } else {
      this.handleHashChange();
    }
  }

  handleHashChange() {
    const rawHash = window.location.hash || '#login';
    const auth = window.HMIS_AUTH;

    // 1. Auth Guard Checks
    if (!auth.isAuthenticated()) {
      if (rawHash !== '#login') {
        window.location.hash = '#login';
        return;
      }
    } else {
      // If authenticated and trying to go to #login, send to role default
      if (rawHash === '#login' || rawHash === '') {
        const defaultRoute = auth.getDefaultRouteForRole(auth.getUserRole());
        window.location.hash = defaultRoute;
        return;
      }

      // Check role permissions
      if (!auth.canAccessRoute(rawHash)) {
        const defaultRoute = auth.getDefaultRouteForRole(auth.getUserRole());
        HMIS_TOAST.warning('Access Denied', `Your role (${auth.getUserRole().toUpperCase()}) does not have permission to access that area.`);
        window.location.hash = defaultRoute;
        return;
      }
    }

    this.currentHash = rawHash;
    this.renderCurrentRoute();
  }

  renderCurrentRoute() {
    const hash = this.currentHash || window.location.hash || '#login';
    const auth = window.HMIS_AUTH;
    const user = auth.getCurrentUser();
    const appContainer = document.getElementById('app');

    // Case A: Login View (no sidebar or header)
    if (hash === '#login' || !user) {
      appContainer.innerHTML = window.HMIS_LOGIN_VIEW.render();
      return;
    }

    // Case B: Authenticated Shell
    const parts = hash.substring(1).split('/'); // e.g. ['admin', 'dashboard']
    const rolePrefix = parts[0]; // admin, doctor, receptionist, patient
    const subRoute = parts[1] || 'dashboard';

    // Ensure layout shell exists
    if (!document.getElementById('app-shell')) {
      appContainer.innerHTML = `
        <div id="app-shell" style="display:flex;width:100%;min-height:100vh;">
          <!-- Left Dynamic Sidebar -->
          <aside class="app-sidebar" id="app-sidebar"></aside>

          <!-- Main Layout -->
          <div class="app-main">
            <!-- Top Navigation Header -->
            <header class="app-header" id="app-header"></header>

            <!-- Dynamic Viewport -->
            <main class="view-content" id="main-content"></main>

            <!-- Bottom Attribution Footer -->
            <footer class="app-footer">
              <div>
                <strong>MEDICORE HMIS v1.0</strong> • Hospital Management & Information System
              </div>
              <div class="team-members-list">
                <span class="team-chip">👑 Abhinaba Giri (Admin)</span>
                <span class="team-chip">🩺 Santorshi Ghosh (Doctor)</span>
                <span class="team-chip">📋 Shreyasree Ghosh (Receptionist)</span>
                <span class="team-chip">👤 Debolina Dey (Patient)</span>
              </div>
            </footer>
          </div>
        </div>
      `;
    }

    // Render Sidebar, Header, and View
    this.renderSidebar(user, rolePrefix, subRoute);
    this.renderHeader(user);
    this.renderView(rolePrefix, subRoute);
  }

  renderSidebar(user, rolePrefix, subRoute) {
    const sidebarEl = document.getElementById('app-sidebar');
    if (!sidebarEl) return;

    let navItems = [];

    if (rolePrefix === 'admin') {
      navItems = [
        { section: 'Overview' },
        { label: 'Dashboard', hash: '#admin/dashboard', icon: '📊', sub: 'dashboard' },
        { label: 'User Accounts', hash: '#admin/users', icon: '👥', sub: 'users' },
        { section: 'Hospital Structure' },
        { label: 'Departments', hash: '#admin/departments', icon: '🏢', sub: 'departments' },
        { label: 'Staff Directory', hash: '#admin/staff', icon: '🧑‍⚕️', sub: 'staff' },
        { label: 'Duty Roster', hash: '#admin/duty-roster', icon: '📅', sub: 'duty-roster' },
        { label: 'Consultation Schedule', hash: '#admin/consultation-schedule', icon: '🕒', sub: 'consultation-schedule' },
        { section: 'Finance & Security' },
        { label: 'Billing Configuration', hash: '#admin/billing-config', icon: '⚙️', sub: 'billing-config' },
        { label: 'Security & Backup', hash: '#admin/security-backup', icon: '🛡️', sub: 'security-backup' },
        { label: 'Reports & Analytics', hash: '#admin/reports', icon: '📈', sub: 'reports' },
        { label: 'System Settings', hash: '#admin/settings', icon: '🔧', sub: 'settings' }
      ];
    } else if (rolePrefix === 'doctor') {
      const waitingCount = window.HMIS_STORE.state.appointments.filter(a => a.doctorName.includes('Santorshi') && (a.status === 'Waiting' || a.status === 'Scheduled')).length;
      navItems = [
        { section: 'Clinical OPD' },
        { label: 'Dashboard', hash: '#doctor/dashboard', icon: '📊', sub: 'dashboard' },
        { label: 'My OPD Queue', hash: '#doctor/opd', icon: '🩺', sub: 'opd', badge: waitingCount },
        { label: 'Patient Records', hash: '#doctor/patient-records', icon: '📁', sub: 'patient-records' },
        { label: 'Diagnosis Workbench', hash: '#doctor/diagnosis', icon: '📝', sub: 'diagnosis' },
        { label: 'Prescriptions (Rx)', hash: '#doctor/prescriptions', icon: '💊', sub: 'prescriptions' },
        { section: 'In-Patient (IPD)' },
        { label: 'IPD Patients', hash: '#doctor/ipd', icon: '🛌', sub: 'ipd' },
        { label: 'Clinical Follow-up', hash: '#doctor/follow-up', icon: '📋', sub: 'follow-up' },
        { label: 'Discharge Summaries', hash: '#doctor/discharge-summaries', icon: '📄', sub: 'discharge-summaries' },
        { label: 'My Appointments', hash: '#doctor/appointments', icon: '📅', sub: 'appointments' }
      ];
    } else if (rolePrefix === 'receptionist') {
      const pendingBills = window.HMIS_STORE.state.bills.filter(b => b.paymentStatus !== 'Paid').length;
      navItems = [
        { section: 'Reception & Onboarding' },
        { label: 'Dashboard', hash: '#receptionist/dashboard', icon: '📊', sub: 'dashboard' },
        { label: 'Register Patient', hash: '#receptionist/register-patient', icon: '➕', sub: 'register-patient' },
        { label: 'Patients Directory', hash: '#receptionist/patients', icon: '👥', sub: 'patients' },
        { label: 'Appointments Desk', hash: '#receptionist/appointments', icon: '📅', sub: 'appointments' },
        { label: 'OPD Queue Screen', hash: '#receptionist/opd-queue', icon: '🎫', sub: 'opd-queue' },
        { section: 'IPD & Bed Control' },
        { label: 'IPD Admission & Beds', hash: '#receptionist/ipd-admission', icon: '🛏️', sub: 'ipd-admission' },
        { label: 'Patient Visit Logs', hash: '#receptionist/visit-logs', icon: '📜', sub: 'visit-logs' },
        { section: 'Accounts & Billing' },
        { label: 'Billing Desk', hash: '#receptionist/billing', icon: '💳', sub: 'billing', badge: pendingBills },
        { label: 'Payment Counter', hash: '#receptionist/payments', icon: '💰', sub: 'payments' },
        { label: 'Department Directory', hash: '#receptionist/departments', icon: '🏢', sub: 'departments' }
      ];
    } else if (rolePrefix === 'patient') {
      navItems = [
        { section: 'My Health Services' },
        { label: 'Dashboard', hash: '#patient/dashboard', icon: '📊', sub: 'dashboard' },
        { label: 'My Profile', hash: '#patient/profile', icon: '👤', sub: 'profile' },
        { label: 'Appointments', hash: '#patient/appointments', icon: '📅', sub: 'appointments' },
        { section: 'Medical Records' },
        { label: 'Medical History', hash: '#patient/medical-records', icon: '📁', sub: 'medical-records' },
        { label: 'Prescriptions (Rx)', hash: '#patient/prescriptions', icon: '💊', sub: 'prescriptions' },
        { label: 'Test Reports', hash: '#patient/test-reports', icon: '🧪', sub: 'test-reports' },
        { label: 'Treatment History', hash: '#patient/treatment-history', icon: '⏱️', sub: 'treatment-history' },
        { section: 'Financial & Reviews' },
        { label: 'Bills & Payments', hash: '#patient/bills', icon: '🧾', sub: 'bills' },
        { label: 'Feedback & Reviews', hash: '#patient/feedback', icon: '⭐', sub: 'feedback' }
      ];
    }

    const navHtml = navItems.map(item => {
      if (item.section) {
        return `<div class="nav-section-title">${item.section}</div>`;
      }
      const isActive = item.sub === subRoute;
      return `
        <a href="${item.hash}" class="nav-link ${isActive ? 'active' : ''}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
          ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
        </a>
      `;
    }).join('');

    const isClosed = localStorage.getItem('hmis_sidebar_closed') === 'true';
    if (isClosed) {
      sidebarEl.classList.add('closed');
    } else {
      sidebarEl.classList.remove('closed');
    }

    sidebarEl.innerHTML = `
      <div class="sidebar-brand">
        <div class="brand-icon">🏥</div>
        <div class="brand-info">
          <div class="brand-title">MEDICORE HMIS</div>
          <div class="brand-subtitle">SE Lab Assignment</div>
        </div>
        <button class="sidebar-close-btn" id="sidebar-close-btn" onclick="HMIS_ROUTER.closeSidebar()" title="Close Sidebar" aria-label="Close sidebar">
          ✕
        </button>
      </div>

      <div class="sidebar-user">
        <div class="user-avatar">${user.avatar || 'U'}</div>
        <div class="user-info">
          <div class="user-name">${user.name}</div>
          <span class="user-role-badge role-${user.role}">${user.role}</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        ${navHtml}
      </nav>

      <div class="sidebar-footer">
        <button class="btn-logout" onclick="window.HMIS_AUTH.logout()">
          🚪 Sign Out
        </button>
      </div>
    `;
  }

  renderHeader(user) {
    const headerEl = document.getElementById('app-header');
    if (!headerEl) return;

    headerEl.innerHTML = `
      <!-- Left: Hospital Branding -->
      <div class="header-left">
        <button class="sidebar-toggle-btn" id="sidebar-toggle-btn" onclick="HMIS_ROUTER.toggleSidebar()" title="Toggle Sidebar" aria-label="Toggle sidebar">
          ☰
        </button>
        <div class="header-brand">
          <div class="header-brand-icon">🏥</div>
          <div class="header-brand-text">
            <span class="header-brand-name">MEDICORE</span>
            <span class="header-brand-divider"></span>
            <span class="header-brand-portal">Hospital Information Portal</span>
          </div>
        </div>
      </div>

      <!-- Center: DEMO Role Selector -->
      <div class="header-center">
        <div class="role-switcher-container" title="Quick-switch roles to evaluate end-to-end workflows">
          <div class="demo-tag">
            <span class="demo-tag-dot"></span>
            <span>DEMO</span>
          </div>
          <div class="role-switcher-buttons">
            <button class="role-switch-btn ${user.role === 'admin' ? 'active' : ''}" onclick="HMIS_ROUTER.quickSwitch('admin')" title="Switch to Admin (Abhinaba Giri)">
              Admin
            </button>
            <button class="role-switch-btn ${user.role === 'doctor' ? 'active' : ''}" onclick="HMIS_ROUTER.quickSwitch('doctor')" title="Switch to Doctor (Dr. Santorshi Ghosh)">
              Doctor
            </button>
            <button class="role-switch-btn ${user.role === 'receptionist' ? 'active' : ''}" onclick="HMIS_ROUTER.quickSwitch('receptionist')" title="Switch to Receptionist (Shreyasree Ghosh)">
              Reception
            </button>
            <button class="role-switch-btn ${user.role === 'patient' ? 'active' : ''}" onclick="HMIS_ROUTER.quickSwitch('patient')" title="Switch to Patient (Debolina Dey)">
              Patient
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Team Roles Button & User Profile -->
      <div class="header-right">
        <button class="header-team-btn" onclick="HMIS_MODALS.openAssignmentModal()" title="View Student Assignment Responsibilities">
          <span class="team-btn-icon">🎓</span>
          <span class="team-btn-label">Team Roles</span>
        </button>

        <div class="header-user-profile" title="Logged in as ${user.name} (${user.role.toUpperCase()})">
          <div class="header-user-avatar">${user.avatar || 'U'}</div>
          <div class="header-user-details">
            <span class="header-user-name">${user.name}</span>
            <span class="header-user-role role-tag-${user.role}">${user.role}</span>
          </div>
        </div>
      </div>
    `;
  }

  toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('closed');
    const isClosed = sidebar.classList.contains('closed');
    localStorage.setItem('hmis_sidebar_closed', isClosed ? 'true' : 'false');
  }

  closeSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;
    sidebar.classList.add('closed');
    localStorage.setItem('hmis_sidebar_closed', 'true');
  }

  openSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;
    sidebar.classList.remove('closed');
    localStorage.setItem('hmis_sidebar_closed', 'false');
  }

  quickSwitch(role) {
    const res = window.HMIS_AUTH.quickDemoLogin(role);
    if (res.success) {
      HMIS_TOAST.success('Role Switched', `Logged in as ${res.user.name} (${res.user.role.toUpperCase()})`);
      const targetHash = window.HMIS_AUTH.getDefaultRouteForRole(res.user.role);
      window.location.hash = targetHash;
    }
  }

  renderView(rolePrefix, subRoute) {
    const mainEl = document.getElementById('main-content');
    if (!mainEl) return;

    if (rolePrefix === 'admin') {
      mainEl.innerHTML = window.HMIS_ADMIN_VIEW.render(subRoute);
    } else if (rolePrefix === 'doctor') {
      mainEl.innerHTML = window.HMIS_DOCTOR_VIEW.render(subRoute);
    } else if (rolePrefix === 'receptionist') {
      mainEl.innerHTML = window.HMIS_RECEPTIONIST_VIEW.render(subRoute);
    } else if (rolePrefix === 'patient') {
      mainEl.innerHTML = window.HMIS_PATIENT_VIEW.render(subRoute);
    } else {
      mainEl.innerHTML = '<div class="card"><div class="card-body">Page not found.</div></div>';
    }
  }
}

window.HMIS_ROUTER = new HMISRouter();
