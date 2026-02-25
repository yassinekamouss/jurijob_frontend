"use client";

import { useState, useEffect } from "react";
import { Header } from "@/app/candidat/components/Header";
import { useAuth } from "@/app/context/AuthContext";
import Candidat from "@/app/types/candidat";
import { Formation, Experience } from "@/app/types/DataFormDataRegister";
import { ParcoursSection } from "@/app/candidat/components/ParcoursSection";

export default function ParcoursPage() {
  const { user, loading, logout, fetchWithAuth } = useAuth();
  const [profileData, setProfileData] = useState<Candidat | null>(
    user as Candidat | null
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (user) {
      setProfileData(user as Candidat);
    }
  }, [user]);

  if (!mounted) {
    return null;
  }

  const refreshProfile = async () => {
    try {
      const res = await fetchWithAuth("/auth/me", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setProfileData(data.user as Candidat);
      } else {
        console.error("Echec de rafraîchissement du profil");
      }
    } catch (e) {
      console.error("Erreur lors du rafraîchissement du profil", e);
    }
  };

  const handleSaveParcours = async (formations: Formation[], experiences: Experience[]) => {
    if (!profileData) return;
    try {
      const parcoursFormData = new FormData();

      const cleanedFormations = formations.map(f => {
        const { diplomaFile, ...rest } = f;
        if (typeof diplomaFile === 'string') {
          return { ...rest, diplomaFile };
        }
        return rest;
      });

      const payload = {
        formations: cleanedFormations,
        experiences: experiences
      };

      parcoursFormData.append("data", JSON.stringify(payload));

      formations.forEach(f => {
        if (f.diplomaFile && f.diplomaFile instanceof File) {
          parcoursFormData.append(`diploma_${f.id}`, f.diplomaFile);
        }
      });

      const res = await fetchWithAuth("/candidats/update-parcours", {
        method: "PATCH",
        body: parcoursFormData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Update parcours failed", err);
      } else {
        await refreshProfile();
        console.log("Notification: Parcours mis à jour avec succès !");
      }
    } catch (e) {
      console.error("Erreur MAJ parcours", e);
    }
  };

  if (!profileData || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-700">
          Chargement de votre parcours...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        candidateName={`${profileData.prenom} - ${profileData.nom}`}
        onLogout={logout}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-6">
          <div className="text-center sm:text-left space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Mon Parcours</h1>
            <p className="text-gray-500">
              Gérez vos différentes formations et expériences professionnelles.
            </p>
          </div>

          <ParcoursSection
            formations={profileData.formations || []}
            experiences={profileData.experiences || []}
            onSave={handleSaveParcours}
          />
        </div>
      </main>
    </div>
  );
}
