// src/utilisateurs.routes.js
const express = require('express');
const router = express.Router();
const Utilisateur = require('./models/Utilisateur');

/* 📋 Route pour récupérer tous les agents */
router.get('/', async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.status(200).json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur chargement utilisateurs' });
  }
});

module.exports = router;
