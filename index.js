const express = require('express');
const path = require('path');
const app = express();

/* 🔐 Sécurité des en-têtes HTTP */
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

/* 🔧 Middleware JSON */
app.use(express.json());

/* 🔗 Routes institutionnelles */
const authRoutes = require('./auth.routes');
app.use('/auth', authRoutes);

const statsRoutes = require('./stats.routes');
app.use('/stats', statsRoutes);

/* 🖼️ Fichiers statiques React */
app.use(express.static(path.join(__dirname, 'frontend/build')));

/* 🛠️ Service Worker (évite MIME error) */
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/build/service-worker.js'));
});

/* 🌐 Fallback SPA (à placer en dernier) */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

/* 🚀 Port dynamique */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
