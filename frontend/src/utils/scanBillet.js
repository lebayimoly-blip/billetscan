// src/utils/scanBillet.js

const STORAGE_KEY = 'billets_valides';

/**
 * Enregistre les billets valides dans le localStorage
 * @param {string[]} billets - Liste des codes valides
 */
export function seedBilletsLocaux(billets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(billets));
}

/**
 * Vérifie si un code scanné est valide localement
 * @param {string} codeScanne - Code du billet scanné
 * @returns {boolean} - true si valide, false sinon
 */
export function verifierBillet(codeScanne) {
  const billets = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return billets.includes(codeScanne);
}

/**
 * Récupère tous les billets valides stockés
 * @returns {string[]} - Liste des billets
 */
export function getBilletsLocaux() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

/**
 * Supprime tous les billets valides du cache local
 */
export function clearBilletsLocaux() {
  localStorage.removeItem(STORAGE_KEY);
}
