import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import './StatsPage.css';

function StatsPage() {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!dateDebut || !dateFin) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/stats?date_debut=${dateDebut}&date_fin=${dateFin}`);
      const json = await res.json();
      setStats(json);
    } catch (err) {
      setStats({ error: 'Erreur serveur' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stats-container">
      <h2>📊 Statistiques des billets scannés</h2>

      <div className="date-filters">
        <label>
          Date début :
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </label>
        <label>
          Date fin :
          <input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </label>
        <button onClick={fetchStats} disabled={loading}>
          {loading ? 'Chargement...' : '🔍 Filtrer'}
        </button>
      </div>

      {stats && !stats.error && (
        <div className="stats-results">
          <p>📦 Total scannés : <strong>{stats.total}</strong></p>
          <p>✅ Billets valides : <strong>{stats.valides}</strong></p>
          <p>❌ Billets non valides : <strong>{stats.non_valides}</strong></p>
        </div>
      )}

      {stats?.error && <p className="error">{stats.error}</p>}
    </div>
  );
}

export default StatsPage;
