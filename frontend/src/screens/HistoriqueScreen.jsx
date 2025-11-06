import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../assets/styles/global.css";

const HistoriqueScreen = () => {
  const [scans, setScans] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState("all");

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await api.get("/scan/historique"); // à implémenter côté backend
        setScans(response.data);
      } catch (error) {
        console.error("Erreur chargement historique", error);
      }
    };

    fetchScans();
  }, []);

  const filteredScans = scans.filter((scan) =>
    filtreStatut === "all" ? true : scan.status === filtreStatut
  );

  return (
    <div className="historique-screen">
      <h2>Historique des scans</h2>

      <select onChange={(e) => setFiltreStatut(e.target.value)} value={filtreStatut}>
        <option value="all">Tous</option>
        <option value="valid">Valides</option>
        <option value="invalid">Invalides</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Code Billet</th>
            <th>Agent</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {filteredScans.map((scan) => (
            <tr key={scan.id}>
              <td>{scan.code_billet}</td>
              <td>{scan.agent_id}</td>
              <td>{new Date(scan.timestamp).toLocaleString()}</td>
              <td>{scan.status}</td>
              <td>{scan.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoriqueScreen;
