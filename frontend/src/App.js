import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 📦 Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AjouterBilletPage from "./pages/AjouterBilletPage";
import StatsPage from "./pages/StatsPage";
import StatistiquesPage from "./pages/StatistiquesPage";
import UtilisateursPage from "./pages/UtilisateursPage";
import AuditPage from "./pages/AuditPage";
import TestSonPage from "./pages/TestSonPage"; // ✅ Ajout pour test audio

// 📺 Screens
import ScanScreen from "./screens/ScanScreen";
import HistoriqueScreen from "./screens/HistoriqueScreen";
import StatsScreen from "./screens/StatsScreen";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* 🔐 Redirection selon authentification */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* 🔑 Authentification */}
        <Route path="/login" element={<LoginPage />} />

        {/* 📊 Dashboard */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />

        {/* 📷 Scan */}
        <Route
          path="/scan"
          element={isAuthenticated ? <ScanScreen /> : <Navigate to="/login" />}
        />

        {/* 🕓 Historique */}
        <Route
          path="/historique"
          element={isAuthenticated ? <HistoriqueScreen /> : <Navigate to="/login" />}
        />

        {/* 📈 Statistiques (ancienne vue) */}
        <Route
          path="/stats-screen"
          element={isAuthenticated ? <StatsScreen /> : <Navigate to="/login" />}
        />

        {/* 📊 Statistiques filtrables */}
        <Route
          path="/stats"
          element={isAuthenticated ? <StatsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/statistiques"
          element={isAuthenticated ? <StatistiquesPage /> : <Navigate to="/login" />}
        />

        {/* ➕ Ajout de billets valides */}
        <Route
          path="/ajouter-billet"
          element={isAuthenticated ? <AjouterBilletPage /> : <Navigate to="/login" />}
        />

        {/* 📝 Journal d’audit local */}
        <Route
          path="/audit"
          element={isAuthenticated ? <AuditPage /> : <Navigate to="/login" />}
        />

        {/* 👥 Gestion des utilisateurs */}
        <Route
          path="/utilisateurs"
          element={isAuthenticated ? <UtilisateursPage /> : <Navigate to="/login" />}
        />

        {/* 🔊 Test des effets sonores */}
        <Route path="/test-son" element={<TestSonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
