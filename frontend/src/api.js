const baseURL = process.env.REACT_APP_API_URL;

// 🔐 Authentification
export async function login(credentials) {
  const response = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Échec de l'authentification");
  }

  return response.json();
}

// 📷 Scan billet
export async function scanBillet(code, token) {
  const response = await fetch(`${baseURL}/scan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code }),
  });

  return response.json();
}

// 👥 Récupération des utilisateurs
export async function getUtilisateurs(token) {
  const response = await fetch(`${baseURL}/agents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
