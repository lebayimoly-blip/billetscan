const express = require("express");
const path = require("path");

const app = express();

// 🔐 API routes ici (si tu en as)
app.use("/api", require("./routes/api")); // exemple

// 🧱 Servir le frontend buildé
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// 🚀 Lancer le serveur sur le port Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
