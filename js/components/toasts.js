/**
 * HMIS - Toast Notification Manager
 * Provides non-intrusive, styled alerts for system actions
 */

class HMISToast {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    let el = document.getElementById('toast-container');
    if (!el) {
      el = document.createElement('div');
      el = document.createElement('div');
      el.id = 'toast-container';
      document.body.appendChild(el);
    }
    this.container = el;
  }

  show(title, message, type = 'info', duration = 3500) {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';
    if (type === 'error') icon = '❌';

    toast.innerHTML = `
      <div style="font-size: 1.2rem;">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button style="background:transparent;border:none;cursor:pointer;color:#94a3b8;font-size:1.1rem;padding:0.2rem;" onclick="this.parentElement.remove()">✕</button>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(20px)';
        toast.style.transition = 'all 200ms ease';
        setTimeout(() => toast.remove(), 200);
      }
    }, duration);
  }

  success(title, message) { this.show(title, message, 'success'); }
  warning(title, message) { this.show(title, message, 'warning'); }
  error(title, message) { this.show(title, message, 'error'); }
  info(title, message) { this.show(title, message, 'info'); }
}

window.HMIS_TOAST = new HMISToast();
