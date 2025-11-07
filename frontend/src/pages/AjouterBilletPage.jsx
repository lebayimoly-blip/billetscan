import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import './AjouterBilletPage.css';
import AppIcon from '../components/AppIcon';
import Header from '../components/Header';
import ZXingScanner from '../components/ZXingScanner';
import { getBilletsLocaux, seedBilletsLocaux } from '../utils/scanBillet';

function AjouterBilletPage() {
  const [codes, setCodes] = useState([]);
  const [inputCode, setInputCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const [scanFeedback, setScanFeedback] = useState(null);
  const [confirmation, setConfirmation] = useState('');

  const handleAjoutLocal = () => {
    const trimmed = inputCode.trim();
    if (!trimmed) return;

    const billets = getBilletsLocaux();
    if (billets.includes(trimmed)) {
      setConfirmation('⚠️ Ce billet est déjà enregistré localement.');
      return;
    }

    const nouveaux = [...billets, trimmed];
    seedBilletsLocaux(nouveaux);
    setConfirmation(`✅ Billet ajouté localement : ${trimmed}`);
    setInputCode('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line && !codes.includes(line));
      setCodes([...codes, ...lines]);
    };
    reader.readAsText(file);
  };

  // 📷 Scan QR → ajout direct via API
  const handleScan = async (code) => {
    if (!code) {
      setScanFeedback('⚠️ Aucun QR détecté ou code vide');
      setTimeout(() => setScanFeedback(null), 4000);
      return;
    }

    setScanMode(false);
    console.log('📦 Code scanné :', code);

    try {
      const res = await fetch(`${API_BASE_URL}/billet/valider-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code_billet: code }),
      });
      const json = await res.json();

      if (json.success) {
        setScanFeedback(`✅ Billet ajouté : ${code}`);
      } else {
        setScanFeedback(`⚠️ Échec : ${json.message || 'Code invalide'}`);
      }
    } catch (err) {
      setScanFeedback(`❌ Erreur serveur`);
    }

    setTimeout(() => setScanFeedback(null), 4000);
  };

  const handleSubmit = async () => {
    if (codes.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/billet/import-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codes }),
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      setResult({ error: 'Erreur serveur' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ajouter-billet-container">
      <Header />
      <h2>➕ Ajouter des billets valides</h2>

      {/* 📷 Scan QR */}
      <div className="qr-section">
        <button onClick={() => setScanMode(true)}>📷 Scanner un QR code</button>
        {scanMode && (
          <div className="qr-scanner">
            <ZXingScanner
              onScan={handleScan}
              onError={(err) => setScanFeedback(`❌ Erreur de scan : ${err.message}`)}
            />
          </div>
        )}
        {scanFeedback && <p className="scan-feedback">{scanFeedback}</p>}
      </div>

      {/* 🖊️ Ajout manuel local */}
      <div className="ajout-form">
        <input
          type="text"
          placeholder="Code du billet à ajouter localement"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button onClick={handleAjoutLocal}>
          <AppIcon name="addBillet" /> Ajouter localement
        </button>
      </div>
      {confirmation && <p className="ajout-confirmation">{confirmation}</p>}

      {/* 📤 Import fichier */}
      <div className="upload-section">
        <input type="file" accept=".txt,.csv" onChange={handleFileUpload} />
        <p>Importer un fichier contenant les codes (un par ligne)</p>
      </div>

      {/* 👀 Aperçu des codes */}
      <div className="codes-preview">
        <h4>Codes à importer :</h4>
        <ul>
          {codes.map((code, index) => (
            <li key={index}>{code}</li>
          ))}
        </ul>
      </div>

      {/* 🚀 Envoi manuel */}
      <button onClick={handleSubmit} disabled={loading || codes.length === 0}>
        {loading ? 'Import en cours...' : '📤 Envoyer à l’API'}
      </button>

      {/* ✅ Résultat */}
      {result && (
        <div className="result-section">
          <h4>Résultat :</h4>
          {result.error ? (
            <p className="error">{result.error}</p>
          ) : (
            <>
              <p>✅ Ajoutés : {result.ajoutés}</p>
              <p>⚠️ Doublons : {result.doublons}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AjouterBilletPage;
