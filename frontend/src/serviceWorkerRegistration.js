// src/serviceWorkerRegistration.js

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(reg => {
          console.log('✅ Service worker enregistré :', reg.scope);
        })
        .catch(err => {
          console.error('❌ Échec service worker :', err);
        });
    });
  }
}
