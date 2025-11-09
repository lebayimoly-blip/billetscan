const express = require('express');
const router = express.Router();
const Billet = require('./models/billet'); // Assure-toi que ce modèle existe

router.post('/', async (req, res) => {
  const { code } = req.body;
  try {
    const billet = await Billet.findOne({ code });
    if (!billet) return res.status(404).json({ message: 'Billet introuvable' });
    res.json(billet);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
});

module.exports = router;
