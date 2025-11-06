import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import './UtilisateursPage.css';
import Header from '../components/Header';
import AppIcon from '../components/AppIcon';

function UtilisateursPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('agent');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  // 🔄 Chargement des utilisateurs
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/agents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setError("Erreur lors du chargement des utilisateurs.");
      }
    } catch (err) {
      console.error('Erreur réseau :', err);
      setError("Erreur réseau lors du chargement.");
    }
  };

  // ➕ Création d’un utilisateur
  const handleCreate = async () => {
    if (!username || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (res.ok) {
        setUsername('');
        setPassword('');
        setRole('agent');
        setError('');
        fetchUsers();
      } else {
        const data = await res.json();
        setError(data.detail || "Erreur lors de la création.");
      }
    } catch (err) {
      console.error('Erreur création :', err);
      setError("Erreur réseau lors de la création.");
    }
  };

  // 🗑️ Suppression d’un utilisateur
  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression de cet utilisateur ?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/agents/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchUsers();
      } else {
        setError("Erreur lors de la suppression.");
      }
    } catch (err) {
      console.error('Erreur suppression :', err);
      setError("Erreur réseau lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="users-page">
      <Header />
      <h2>👥 Gestion des utilisateurs</h2>

      {/* 🖊️ Formulaire de création */}
      <div className="user-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
        <button className="add-button" onClick={handleCreate}>
          <AppIcon name="addUser" /> Ajouter
        </button>
      </div>

      {/* ⚠️ Message d’erreur */}
      {error && <p className="error-message">{error}</p>}

      {/* 📋 Liste des utilisateurs */}
      <div className="user-list-container">
        <ul className="user-list">
          {users.map((u) => (
            <li key={u.id}>
              <span className="user-info">
                {u.username} — <strong>{u.role?.name || '—'}</strong>
              </span>
              <button className="delete-button" onClick={() => handleDelete(u.id)}>
                <AppIcon name="delete" color="#e74c3c" /> Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UtilisateursPage;
