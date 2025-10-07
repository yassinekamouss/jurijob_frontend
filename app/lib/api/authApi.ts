// lib/api/auth.ts
import { apiFetch } from "./apiFetch";

export async function loginRequest(email: string, password: string) {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur de connexion");
  }

  return res.json(); // contient { user, accessToken }
}

export async function logoutRequest() {
  await apiFetch("/auth/logout", { method: "POST" });
}

export async function refreshRequest() {
  const res = await apiFetch("/auth/refresh", { method: "GET" });
  if (!res.ok) throw new Error("Refresh token invalide");
  return res.json(); // contient { accessToken }
}

export async function getMeRequest(accessToken: string) {
  const res = await apiFetch("/auth/me", { method: "GET" }, accessToken);
  if (!res.ok) throw new Error("Erreur lors de la récupération de l'utilisateur");
  return res.json(); // contient { user }
}
