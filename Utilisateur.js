const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  nom: String,
  role: String,
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
