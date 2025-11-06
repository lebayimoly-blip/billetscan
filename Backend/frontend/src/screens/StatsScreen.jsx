import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "../assets/styles/global.css";
import api from "../services/api";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatsScreen = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.post("/stats", {
          date_debut: "2025-01-01",
          date_fin: "2025-12-31",
          agent_id: 1 // TODO: remplacer par l’ID réel de l’agent connecté
        });
        setStats(response.data);
      } catch (error) {
        console.error("Erreur chargement stats", error);
      }
    };

    fetchStats();
  }, []);

  const data = {
    labels: ["Scannés", "Validés", "Invalides"],
    datasets: [
      {
        label: "Nombre de billets",
        data: stats ? [stats.total_scans, stats.total_valid, stats.total_invalid] : [0, 0, 0],
        backgroundColor: ["#42a5f5", "#66bb6a", "#ef5350"]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="stats-screen">
      <h2>Statistiques de validation</h2>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StatsScreen;
