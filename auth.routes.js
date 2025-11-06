// auth.routes.js
const express = require('express');
const router = express.Router();

// 🔐 Route de connexion
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    return res.status(200).json({ access_token: 'token-setrag-olouomo' });
  }

  return res.status(401).json({ message: 'Identifiants incorrects' });
});

// 👤 Route pour récupérer l’agent connecté
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer token-setrag-olouomo') {
    return res.status(200).json({ username: 'admin', role: 'institutionnel' });
  }
  return res.status(401).json({ message: 'Token invalide' });
});

module.exports = router;
