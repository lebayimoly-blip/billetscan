import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      console.log('✅ Connexion réussie, redirection vers /dashboard');
      navigate('/dashboard');
    } else {
      alert('Identifiants invalides');
    }
  };

  return (
    <div className="login-container">
      {/* 🚆 Logo SETRAG */}
      <img
        src="/train-setrag-login.png"
        alt="Train SETRAG"
        className="login-logo"
      />

      <h2>Connexion</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>

      <p className="login-signature">
        Application développée par <strong>OLOUOMO LAB</strong> pour <strong>SETRAG-ERAMET</strong>
      </p>
    </div>
  );
}

export default LoginPage;