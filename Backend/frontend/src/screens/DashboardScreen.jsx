// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import './DashboardPage.css'; // optionnel pour le style

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  // 🔐 Vérifie si le token est présent
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return null;
  }

  // 📊 Récupère les statistiques à l'affichage
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/stats`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date_debut: '2025-01-01',
            date_fin: '2025-12-31',
            agent_id: 1, // à adapter dynamiquement
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          console.error('Erreur chargement stats');
        }
      } catch (err) {
        console.error('❌ Erreur serveur stats :', err);
      }
    };

    fetchStats();
  }, []);

  // 🔓 Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h1>Bienvenue sur le dashboard</h1>
      <p>Vous êtes connecté.</p>

      {stats ? (
        <div className="stats-cards">
          <div className="card orange">
            <h4>Billets Scannés</h4>
            <p>{stats.total_scans}</p>
          </div>
          <div className="card green">
            <h4>Billets Valides</h4>
            <p>{stats.total_valid}</p>
          </div>
          <div className="card red">
            <h4>Billets Invalides</h4>
            <p>{stats.total_invalid}</p>
          </div>
        </div>
      ) : (
        <p>Chargement des statistiques...</p>
      )}

      <div className="dashboard-actions">
        <button onClick={() => navigate('/scan')}>📷 Scanner un billet</button>
        <button onClick={handleLogout}>🔓 Se déconnecter</button>
      </div>
    </div>
  );
}

export default DashboardPage;
