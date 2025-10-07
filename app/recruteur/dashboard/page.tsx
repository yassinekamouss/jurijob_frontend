"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CandidatDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Attendre que le loading soit terminé
    if (!loading) {
      if (!user) {
        // Pas d'utilisateur = redirection login
        router.push("/login");
      } else if (user.role !== "recruteur") {
        // Mauvais rôle = redirection accueil
        router.push("/");
      }
    }
  }, [user, loading, router]);

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si pas d'utilisateur après loading, ne rien afficher (redirection en cours)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Tableau de bord — Candidat
        </h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          Déconnexion
        </button>
      </header>

      <main className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Bonjour, {user.prenom} {user.nom}
        </h2>
        <p className="text-gray-600 mb-4">
          Bienvenue sur votre espace personnel. Ici, vous pouvez gérer vos
          candidatures, consulter des offres et mettre à jour votre profil.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border rounded-xl bg-gray-50">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium text-gray-800">{user.email}</p>
          </div>

          <div className="p-4 border rounded-xl bg-gray-50">
            <p className="text-gray-500 text-sm">Rôle</p>
            <p className="font-medium text-gray-800 capitalize">{user.role}</p>
          </div>

          <div className="p-4 border rounded-xl bg-gray-50">
            <p className="text-gray-500 text-sm">Statut du compte</p>
            <p className="font-medium text-green-600">Actif</p>
          </div>
        </div>
      </main>
    </div>
  );
}