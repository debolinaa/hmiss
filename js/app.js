/**
 * HMIS - Application Bootstrap & Main Entry Point
 * Software Engineering Laboratory Assignment
 * Contributors: Abhinaba Giri, Santorshi Ghosh, Shreyasree Ghosh, Debolina Dey
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('MEDICORE HMIS initializing...');

  // 1. Initialize Toasts & Modals
  if (window.HMIS_TOAST) window.HMIS_TOAST.init();

  // 2. Subscribe Router to Store Changes so view auto-refreshes when data changes
  if (window.HMIS_STORE && window.HMIS_ROUTER) {
    window.HMIS_STORE.subscribe(() => {
      // Re-render current route whenever state updates
      if (window.location.hash && window.location.hash !== '#login') {
        window.HMIS_ROUTER.renderCurrentRoute();
      }
    });
  }

  // 3. Initialize Router
  if (window.HMIS_ROUTER) {
    window.HMIS_ROUTER.init();
  }

  console.log('MEDICORE HMIS is live and presentation-ready!');
});
