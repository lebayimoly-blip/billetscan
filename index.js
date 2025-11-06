const express = require('express');
const path = require('path');
const app = express();

// Middleware pour servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Route fallback pour React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// Port dynamique pour Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
