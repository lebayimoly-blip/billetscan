const express = require('express');
const router = express.Router();

// 👥 Liste des utilisateurs simulés
const utilisateurs = [
  { username: 'admin', password: 'admin123', role: 'institutionnel' },
  { username: 'lebayi moly', password: 'Google99.', role: 'controleur' },
];

// 🔐 Route de connexion
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const utilisateur = utilisateurs.find(
    (u) => u.username === username && u.password === password
  );

  if (!utilisateur) {
    return res.status(401).json({ message: 'Identifiants incorrects' });
  }

  const token = `token-${utilisateur.username.replace(/\s/g, '-')}`;
  return res.status(200).json({ access_token: token });
});

// 👤 Route pour récupérer l’agent connecté
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  const utilisateur = utilisateurs.find(
    (u) => `token-${u.username.replace(/\s/g, '-')}` === token
  );

  if (!utilisateur) {
    return res.status(401).json({ message: 'Token invalide' });
  }

  return res.status(200).json({
    username: utilisateur.username,
    role: utilisateur.role
  });
});

module.exports = router;