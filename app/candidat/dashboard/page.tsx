"use client";

import { useState, useEffect } from "react";
import { Header } from "@/app/candidat/components/Header";
import { PersonalInfoSection } from "@/app/candidat/components/PersonalInfoSection";
import { ProfessionalInfoSection } from "@/app/candidat/components/ProfessionalInfoSection";
import { SearchPreferencesSection } from "@/app/candidat/components/SearchPreferencesSection";
import { useAuth } from "@/app/context/AuthContext";
import { ProfessionalInfo } from "@/app/types/professionalInfo";
import { PersonalInfo } from "@/app/types/personalInfo";
import { SearchPreferences, Language } from "@/app/types/searchPreferences";
import Candidat from "@/app/types/candidat";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const [profileData, setProfileData] = useState<Candidat | null>(
    user as Candidat | null
  );

  // Garde d'hydratation pour éviter les mismatches SSR/Client
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (user) {
      setProfileData(user as Candidat);
    }
  }, [user]);

  if (!mounted) {
    // Évite un rendu SSR différent du rendu client initial
    return null;
  }

  const handleSavePersonalInfo = (data: PersonalInfo) => {
    setProfileData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        ...data,
      } as Candidat;
    });
    console.log("Notification: Informations personnelles mises à jour");
  };

  const handleSaveProfessionalInfo = (data: ProfessionalInfo) => {
    setProfileData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        ...data,
      } as Candidat;
    });
    console.log("Notification: Informations professionnelles mises à jour");
  };

  const handleSavePreferences = (preferences: SearchPreferences) => {
    setProfileData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        typeTravailRecherche: preferences.typeTravailRecherche,
        modeTravailRecherche: preferences.modeTravailRecherche,
        villesTravailRecherche: preferences.villesTravailRecherche,
      } as Candidat;
    });
    console.log("Notification: Préférences de recherche mises à jour");
  };

  const handleSaveLanguages = (langues: Language[]) => {
    // Stockage au format string "Nom (Niveau)" pour compatibilité actuelle
    setProfileData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        langues: langues.map((l) => `${l.nom} (${l.niveau})`),
      } as Candidat;
    });
    console.log("Notification: Langues mises à jour");
  };

  if (!profileData || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-700">
          Chargement du profil...
        </p>
      </div>
    );
  }

  // Conversion robuste des langues pour supporter string[] et {nom,niveau}[]
  const rawLangs = profileData.langues || [];
  const languagesForComponent: Language[] = (rawLangs as any[]).map(
    (item: any) => {
      if (
        item &&
        typeof item === "object" &&
        "nom" in item &&
        "niveau" in item
      ) {
        return {
          nom: String(item.nom),
          niveau: String(item.niveau),
        } as Language;
      }
      if (typeof item === "string") {
        const match = /^(.*)\s*\((.*)\)$/.exec(item);
        if (match) return { nom: match[1], niveau: match[2] } as Language;
        return { nom: item, niveau: "Intermédiaire" } as Language;
      }
      return { nom: String(item), niveau: "Intermédiaire" } as Language;
    }
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        candidateName={`${profileData.prenom} - ${profileData.nom}`}
        onLogout={logout}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <PersonalInfoSection
          data={{
            nom: profileData.nom || "",
            prenom: profileData.prenom || "",
            email: profileData.email || "",
            imageUrl: profileData.imageUrl,
            isActive: profileData.isActive || false,
            isArchived: profileData.isArchived || false,
          }}
          onSave={handleSavePersonalInfo}
        />

        <ProfessionalInfoSection
          data={{
            posteActuel: profileData.posteActuel || "",
            niveauExperience: profileData.niveauExperience || "",
            formationJuridique: profileData.formationJuridique || "",
            specialisations: profileData.specialisations || [],
            domainExperiences: profileData.domainExperiences || [],
          }}
          onSave={handleSaveProfessionalInfo}
        />

        <SearchPreferencesSection
          preferences={{
            typeTravailRecherche: profileData.typeTravailRecherche || "",
            modeTravailRecherche: profileData.modeTravailRecherche || "",
            villesTravailRecherche: profileData.villesTravailRecherche || [],
          }}
          langues={languagesForComponent}
          onSavePreferences={handleSavePreferences}
          onSaveLanguages={handleSaveLanguages}
        />
      </main>
      {/* <pre>{JSON.stringify(profileData, null, 2)}</pre> */}
    </div>
  );
}
