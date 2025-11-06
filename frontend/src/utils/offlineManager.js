// src/utils/offlineManager.js

const PENDING_KEY = 'pendingBillets';
const AUDIT_KEY = 'auditLocal';

/**
 * Vérifie si l'application est en ligne
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * Ajoute un billet à la file d'attente locale
 */
export function addBilletOffline(billet) {
  const pending = getPendingBillets();
  pending.push(billet);
  localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  logAudit(`Billet ajouté hors ligne : ${JSON.stringify(billet)}`);
}

/**
 * Récupère les billets en attente
 */
export function getPendingBillets() {
  return JSON.parse(localStorage.getItem(PENDING_KEY) || '[]');
}

/**
 * Vide la file d'attente après synchronisation
 */
export function clearPendingBillets() {
  localStorage.removeItem(PENDING_KEY);
}

/**
 * Journalise une action localement
 */
export function logAudit(message) {
  const logs = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
  logs.push({ timestamp: new Date().toISOString(), message });
  localStorage.setItem(AUDIT_KEY, JSON.stringify(logs));
}

/**
 * Récupère le journal local
 */
export function getAuditLog() {
  return JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
}

/**
 * Synchronise les billets en attente avec le backend
 */
export async function syncBillets(API_BASE_URL, token) {
  const pending = getPendingBillets();
  if (pending.length === 0) return;

  try {
    const res = await fetch(`${API_BASE_URL}/billets/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ billets: pending }),
    });

    if (res.ok) {
      clearPendingBillets();
      logAudit(`✅ Synchronisation réussie de ${pending.length} billets`);
    } else {
      logAudit(`❌ Échec synchronisation : ${res.status}`);
    }
  } catch (err) {
    logAudit(`❌ Erreur réseau lors de la sync : ${err.message}`);
  }
}

/**
 * Initialise les écouteurs de connexion
 */
export function initOfflineSync(API_BASE_URL, token) {
  window.addEventListener('online', () => {
    logAudit('🔌 Connexion rétablie, tentative de synchronisation...');
    syncBillets(API_BASE_URL, token);
  });

  window.addEventListener('offline', () => {
    logAudit('📴 Connexion perdue, passage en mode hors ligne');
  });
}
