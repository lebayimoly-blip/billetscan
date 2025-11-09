const express = require('express');
const router = express.Router();
const Billet = require('./models/billet'); // ✅ Assure-toi que ce fichier existe bien

// 🎫 Vérification d’un billet par son code
router.post('/', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Code requis' });
  }

  try {
    const billet = await Billet.findOne({ code });

    if (!billet) {
      return res.status(404).json({ message: 'Billet introuvable' });
    }

    return res.status(200).json(billet);
  } catch (err) {
    console.error('❌ Erreur lors de la recherche du billet :', err);
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
