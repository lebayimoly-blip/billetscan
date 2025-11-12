// 📦 Import des modules
const express = require('express');
const path = require('path');
const cors = require('cors');

// 🔗 Import des routeurs
const authRoutes = require('./auth.routes');
const statsRoutes = require('./stats.routes');
const utilisateursRoutes = require('./utilisateurs.routes');
const scanRoutes = require('./scan.routes');

// 🚀 Initialisation de l'application
const app = express();

// 🔐 Sécurité des en-têtes HTTP
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// 🔗 Montage des routes API
app.use('/auth', authRoutes);
app.use('/stats', statsRoutes);
app.use('/utilisateurs', utilisateursRoutes);
app.use('/scan', scanRoutes);

// 🖼️ Fichiers statiques (React build ou frontend)
const frontendPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(frontendPath));

// 🛠️ Service Worker (évite MIME error)
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'service-worker.js'));
});

// 🌐 Fallback SPA (à placer en dernier)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});

// 🚀 Démarrage du serveur
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
