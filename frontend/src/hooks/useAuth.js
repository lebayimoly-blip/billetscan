import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export function useAuth() {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Connexion
  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      await getCurrentAgent(); // met à jour l'état
      return true;
    } catch (err) {
      console.error('❌ Erreur login :', err);
      return false;
    }
  };

  // 👤 Récupère l'agent connecté
  const getCurrentAgent = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAgent(null);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAgent(data);
      } else {
        setAgent(null);
      }
    } catch (err) {
      console.error('❌ Erreur /auth/me :', err);
      setAgent(null);
    }
  };

  // 🚪 Déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setAgent(null);
  };

  // 🔄 Vérifie l'authentification au chargement
  useEffect(() => {
    getCurrentAgent().finally(() => setLoading(false));
  }, []);

  return {
    agent,
    loading,
    login,
    logout,
    isAuthenticated: !!agent,
  };
}
