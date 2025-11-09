// 📦 Import des modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// 🚀 Initialisation de l'application
const app = express();

// 🔐 Sécurité des en-têtes HTTP
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// 🔧 Middleware JSON
app.use(express.json());

// 🔗 Import des routes institutionnelles
const authRoutes = require('./auth.routes');
const statsRoutes = require('./stats.routes');
const utilisateursRoutes = require('./utilisateurs.routes');
const scanRoutes = require('./scan.routes');

// 🔗 Montage des routes
app.use('/auth', authRoutes);
app.use('/stats', statsRoutes);
app.use('/utilisateurs', utilisateursRoutes);
app.use('/scan', scanRoutes);

// 🖼️ Fichiers statiques React
app.use(express.static(path.join(__dirname, 'frontend/build')));

// 🛠️ Service Worker (évite MIME error)
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/build/service-worker.js'));
});

// 🌐 Fallback SPA (à placer en dernier)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// 🔗 Connexion à MongoDB Atlas
mongoose.connect("mongodb+srv://MolyLEBAYIONGUELE:W6BWgGv5V83aS7l3@cluster0.6h82w7w.mongodb.net/scanbillet?retryWrites=true&w=majority")
  .then(() => console.log("✅ Connexion MongoDB réussie"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// 🚀 Démarrage du serveur
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
