import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import jsPDF from 'jspdf';
import './DashboardPage.css';
import AppIcon from '../components/AppIcon';
import Header from '../components/Header';
import {
  isOnline,
  addBilletOffline,
  initOfflineSync,
} from '../utils/offlineManager';

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // 🔐 Redirection si non connecté
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // 🔄 Initialisation de la synchronisation hors ligne
  useEffect(() => {
    if (token) {
      initOfflineSync(API_BASE_URL, token);
    }
  }, [token]);

  // 👤 Récupération des infos utilisateur
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUserInfo(data);
          console.log('✅ Utilisateur connecté :', data);
        } else {
          console.warn('⚠️ Échec récupération /me');
        }
      } catch (err) {
        console.error('Erreur chargement utilisateur :', err);
      }
    };

    if (token) {
      fetchUserInfo();
    }
  }, [token]);

  // 📊 Récupération des statistiques
  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;

      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const date_debut = yesterday.toISOString().split('T')[0];
      const date_fin = now.toISOString().split('T')[0];

      try {
        const res = await fetch(`${API_BASE_URL}/stats`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date_debut,
            date_fin,
            agent_id: 1,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Erreur chargement stats :', err);
      }
    };

    fetchStats();
  }, [token]);

  // 📤 Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Statistiques globales de ScanBillet', 20, 20);

    if (stats) {
      doc.setFontSize(12);
      doc.text(`Billets Scannés : ${stats.total_scans}`, 20, 40);
      doc.text(`Billets Valides : ${stats.total_valid}`, 20, 50);
      doc.text(`Billets Invalides : ${stats.total_invalid}`, 20, 60);
    } else {
      doc.text('Aucune statistique disponible.', 20, 40);
    }

    doc.save('statistiques-globales.pdf');
  };

  // 🔁 Ajout hors ligne (exemple)
  const handleAddBillet = (billet) => {
    if (isOnline()) {
      console.log('📡 En ligne : billet prêt à envoyer', billet);
    } else {
      addBilletOffline(billet);
      console.log('📴 Hors ligne : billet mis en attente', billet);
    }
  };

  // 🔓 Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <Header />

      <h1>
        Tableau de bord
        <span style={{ display: 'block', fontWeight: 'normal', color: '#333', marginTop: '8px' }}>
          Nom d'utilisateur : {userInfo?.nom || userInfo?.username || 'inconnu'}
        </span>
        {userInfo?.role && (
          <span style={{ display: 'block', fontSize: '0.9rem', color: '#666' }}>
            Rôle : {userInfo.role}
          </span>
        )}
      </h1>

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
        <button onClick={() => navigate('/scan')}>
          <AppIcon name="scan" /> Scanner un billet
        </button>
        <button onClick={() => navigate('/ajouter-billet')}>
          <AppIcon name="addBillet" /> Ajouter des billets valides
        </button>
        <button onClick={() => navigate('/statistiques')}>
          <AppIcon name="stats" /> Voir les statistiques détaillées
        </button>
        <button onClick={handleExportPDF}>
          <AppIcon name="exportPDF" /> Exporter en PDF
        </button>
        <button onClick={() => navigate('/utilisateurs')}>
          <AppIcon name="ajouterFichier" /> Gestion des utilisateurs
        </button>
        <button onClick={() => navigate('/audit')}>
          <AppIcon name="audit" /> Journal d’audit
        </button>
      </div>

      <div className="logout-wrapper">
        <button className="logout-button" onClick={handleLogout}>
          <AppIcon name="logout" color="#e74c3c" /> Se déconnecter
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
