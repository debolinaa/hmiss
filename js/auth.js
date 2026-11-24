/**
 * HMIS - Authentication & Session Management Module
 * Role-Based Access Control (RBAC) & Route Permissions
 * Software Engineering Lab Project
 */

const SESSION_STORAGE_KEY = 'HMIS_ACTIVE_SESSION_V1';

class HMISAuth {
  constructor() {
    this.currentUser = this.loadSession();
  }

  loadSession() {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY) || localStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Session load error', e);
    }
    return null;
  }

  saveSession(user) {
    this.currentUser = user;
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Session save error', e);
    }
  }

  clearSession() {
    this.currentUser = null;
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.warn('Session clear error', e);
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getUserRole() {
    return this.currentUser ? this.currentUser.role : null;
  }

  login(username, password) {
    const store = window.HMIS_STORE;
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const matched = store.state.users.find(u => 
      (u.username.toLowerCase() === cleanUser || (u.email && u.email.toLowerCase() === cleanUser)) &&
      u.password === cleanPass
    );

    if (matched) {
      // Update last login
      matched.lastLogin = new Date().toISOString().replace('T', ' ').substring(0, 16);
      store.saveStateToStorage(store.state);
      store.logAction(matched.name, matched.role, 'LOGIN_SUCCESS', `User authenticated as ${matched.role}`);
      this.saveSession(matched);
      return { success: true, user: matched };
    }

    return { success: false, message: 'Invalid credentials. Check username or password.' };
  }

  // Instant demo switcher login for student lab presentations
  quickDemoLogin(roleKey) {
    const store = window.HMIS_STORE;
    let target = null;

    if (roleKey === 'admin') {
      target = store.state.users.find(u => u.role === 'admin');
    } else if (roleKey === 'doctor') {
      target = store.state.users.find(u => u.role === 'doctor');
    } else if (roleKey === 'receptionist') {
      target = store.state.users.find(u => u.role === 'receptionist');
    } else if (roleKey === 'patient') {
      target = store.state.users.find(u => u.role === 'patient');
    }

    if (target) {
      target.lastLogin = new Date().toISOString().replace('T', ' ').substring(0, 16);
      store.saveStateToStorage(store.state);
      store.logAction(target.name, target.role, 'DEMO_QUICK_SWITCH', `Switched to role ${target.role} (${target.name})`);
      this.saveSession(target);
      return { success: true, user: target };
    }

    return { success: false, message: 'Demo account not found.' };
  }

  logout() {
    if (this.currentUser) {
      window.HMIS_STORE.logAction(this.currentUser.name, this.currentUser.role, 'LOGOUT', 'User signed out');
    }
    this.clearSession();
    window.location.hash = '#login';
  }

  getDefaultRouteForRole(role) {
    switch (role) {
      case 'admin': return '#admin/dashboard';
      case 'doctor': return '#doctor/dashboard';
      case 'receptionist': return '#receptionist/dashboard';
      case 'patient': return '#patient/dashboard';
      default: return '#login';
    }
  }

  canAccessRoute(targetHash) {
    if (!this.isAuthenticated()) {
      return targetHash === '#login' || targetHash === '';
    }

    if (targetHash === '#login') return true;

    const userRole = this.getUserRole();
    const prefix = targetHash.split('/')[0]; // e.g. #admin, #doctor, #receptionist, #patient

    if (prefix === `#${userRole}`) {
      return true;
    }

    // Role does not match prefix
    return false;
  }
}

// Global Singleton Instance
window.HMIS_AUTH = new HMISAuth();
