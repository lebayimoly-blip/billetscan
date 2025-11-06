import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScanPage.css';
import AppIcon from '../components/AppIcon';
import Header from '../components/Header';
import { verifierBillet } from '../utils/scanBillet';

function ScanPage() {
  const [codeScanne, setCodeScanne] = useState('');
  const [resultat, setResultat] = useState(null);
  const navigate = useNavigate();

  // 🔊 Bip sonore
  const playSound = (type) => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.play().catch((err) => console.warn('🔇 Erreur audio :', err));
  };

  // 💡 Animation visuelle
  const triggerFlash = (type) => {
    const container = document.querySelector('.scan-page');
    container.classList.add(`flash-${type}`);
    setTimeout(() => container.classList.remove(`flash-${type}`), 400);
  };

  // 🔍 Vérification du billet
  const handleScan = () => {
    if (!codeScanne.trim()) return;

    const estValide = verifierBillet(codeScanne.trim());
    setResultat(estValide ? 'valide' : 'invalide');
    playSound(estValide ? 'valid' : 'invalid');
    triggerFlash(estValide ? 'valid' : 'invalid');
  };

  return (
    <div className="scan-page">
      <Header />
      <h2>📷 Scanner un billet</h2>

      {/* 🖊️ Formulaire de scan */}
      <div className="scan-form">
        <input
          type="text"
          placeholder="Entrez ou scannez le code du billet"
          value={codeScanne}
          onChange={(e) => setCodeScanne(e.target.value)}
        />
        <button onClick={handleScan}>
          <AppIcon name="scan" /> Vérifier
        </button>
      </div>

      {/* ✅ Résultat */}
      {resultat && (
        <div className={`scan-result ${resultat}`}>
          {resultat === 'valide' ? '✅ Billet valide' : '❌ Billet invalide'}
        </div>
      )}

      {/* 🔙 Navigation */}
      <div className="scan-actions">
        <button onClick={() => navigate('/dashboard')}>
          <AppIcon name="home" /> Retour au dashboard
        </button>
      </div>
    </div>
  );
}

export default ScanPage;
