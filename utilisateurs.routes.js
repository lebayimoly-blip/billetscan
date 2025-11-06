// src/utilisateurs.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json([
    { id: 1, nom: 'Agent A', role: 'institutionnel' },
    { id: 2, nom: 'Agent B', role: 'contrôleur' },
  ]);
});

module.exports = router;
