const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect("mongodb+srv://MolyLEBAYIONGUELE:W6BWgGv5V83aS7l3@cluster0.6h82w7w.mongodb.net/scanbillet?retryWrites=true&w=majority");

const utilisateurSchema = new mongoose.Schema({
  nom: String,
  email: String,
  motDePasse: String,
  role: String,
  actif: Boolean
});
const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

const data = JSON.parse(fs.readFileSync('./utilisateurs_export.json', 'utf-8'));

(async () => {
  await Utilisateur.insertMany(data);
  console.log("✅ Import MongoDB terminé");
  mongoose.disconnect();
})();
