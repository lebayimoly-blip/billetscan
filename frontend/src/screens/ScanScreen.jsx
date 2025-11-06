import React, { useState } from "react";
import ZXingScanner from "../components/ZXingScanner";
import api from "../services/api";
import "../assets/styles/scan.css";

const ScanScreen = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (code) => {
    if (!code) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/scan", {
        code_billet: code,
        agent_id: 1, // TODO: injecter dynamiquement depuis le profil
        timestamp: new Date().toISOString(),
        position: "Libreville Gare",
      });
      setScanResult(response.data);
    } catch (e) {
      console.error("Erreur API :", e);
      setError("Erreur lors de la validation du billet.");
      setScanResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err) => {
    console.warn("⚠️ Erreur de scan :", err);
    setError("Erreur de lecture du QR code.");
  };

  return (
    <div className="scan-screen">
      <h2>Scanner un billet</h2>
      <ZXingScanner onScan={handleScan} onError={handleError} />

      {loading && <p>Validation en cours...</p>}

      {scanResult && (
        <div className="result">
          <h3>Résultat :</h3>
          <p><strong>Code :</strong> {scanResult.code_billet}</p>
          <p><strong>Statut :</strong> {scanResult.status}</p>
          <p><strong>Position :</strong> {scanResult.position}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ScanScreen;
