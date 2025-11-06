import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import jsPDF from 'jspdf';
import './StatistiquesPage.css';

function StatistiquesPage() {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('token');

  // 📊 Récupération des statistiques filtrées
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date_debut: startDate,
          date_fin: endDate,
          agent_id: 1,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        alert('Erreur lors du chargement des statistiques');
      }
    } catch (err) {
      console.error('Erreur réseau :', err);
    }
  };

  // 📄 Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Statistiques de ScanBillet', 20, 20);
    doc.setFontSize(12);
    doc.text(`Période : ${startDate} → ${endDate}`, 20, 30);

    if (stats) {
      doc.text(`Billets Scannés : ${stats.total_scans}`, 20, 50);
      doc.text(`Billets Valides : ${stats.total_valid}`, 20, 60);
      doc.text(`Billets Invalides : ${stats.total_invalid}`, 20, 70);
    } else {
      doc.text('Aucune statistique disponible.', 20, 50);
    }

    doc.save(`stats_${startDate}_to_${endDate}.pdf`);
  };

  return (
    <div className="stats-page">
      <h2>📊 Statistiques</h2>

      {/* 📅 Filtres de date */}
      <div className="stats-filter">
        <label>Du :</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>Au :</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={fetchStats}>🔍 Filtrer</button>
      </div>

      {/* 📋 Résultats */}
      {stats && (
        <div className="stats-result">
          <ul>
            <li>Billets scannés : {stats.total_scans}</li>
            <li>Billets valides : {stats.total_valid}</li>
            <li>Billets invalides : {stats.total_invalid}</li>
          </ul>
          <button onClick={exportPDF}>📄 Exporter en PDF</button>
        </div>
      )}
    </div>
  );
}

export default StatistiquesPage;
