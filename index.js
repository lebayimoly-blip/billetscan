const express = require('express');
const path = require('path');
const app = express();

// 🔧 Middleware JSON
app.use(express.json());

// 🔗 Routes d'authentification
const authRoutes = require('./auth.routes');
app.use('/auth', authRoutes);

// 🖼️ Fichiers statiques React
app.use(express.static(path.join(__dirname, 'frontend/build')));

// 🌐 Fallback SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// 🚀 Port dynamique
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
