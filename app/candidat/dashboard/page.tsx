"use client";

import { useState } from "react";
import { Header } from "@/app/candidat/components/Header";
import { PersonalInfoSection } from "@/app/candidat/components/PersonalInfoSection";
import { ProfessionalInfoSection } from "@/app/candidat/components/ProfessionalInfoSection";
import { SearchPreferencesSection } from "@/app/candidat/components/SearchPreferencesSection";
import { User } from "@/app/types/user";
import { useAuth } from "@/app/context/AuthContext";

// Données mockées basées sur le JSON fourni

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState<User | null>(user);

   if (!profileData) {
    return <div>Chargement en cours...</div>; // Ou un autre indicateur de chargement
  }

  const handleSavePersonalInfo = (data: {
    nom: string;
    prenom: string;
    email: string;
    imageUrl?: string;
    isActive: boolean;
    isArchived: boolean;
  }) => {
    setProfileData({
      ...profileData,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      imageUrl: data.imageUrl,
      isActive: data.isActive,
      // isArchived reste inchangé, géré uniquement par l'admin
    });
    // Remplacement du toast.success
    console.log("Notification: Informations personnelles mises à jour");
    // Ici, vous pouvez ajouter un appel API pour sauvegarder les données
  };

  const handleSaveProfessionalInfo = (data: {
    niveauExperience: string;
    posteActuel: string;
    formationJuridique: string;
    specialisations: string[];
    domainExperiences: string[];
    langues: [
      {nom: string, niveau: string}
    ]
  }) => {
    setProfileData({
      ...profileData,
      ...data,
    });
    // Remplacement du toast.success
    console.log("Notification: Informations professionnelles mises à jour");
    // Ici, vous pouvez ajouter un appel API pour sauvegarder les données
  };

  // const handleSavePreferences = (preferences: SearchPreferences) => {
  //   setProfileData({
  //     ...profileData,
  //     preferencesDeRecherche: preferences,
  //   });
  //   // Remplacement du toast.success
  //   console.log("Notification: Préférences de recherche mises à jour");
  //   // Ici, vous pouvez ajouter un appel API pour sauvegarder les données
  // };

  // const handleSaveLanguages = (langues: Language[]) => {
  //   setProfileData({
  //     ...profileData,
  //     langues,
  //   });
  //   // Remplacement du toast.success
  //   console.log("Notification: Compétences linguistiques mises à jour");
  //   // Ici, vous pouvez ajouter un appel API pour sauvegarder les données
  // };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        candidateName={`${profileData!.prenom} - ${profileData!.nom}`}
        onLogout={logout}
      />
{/* 
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <PersonalInfoSection
          data={{
            nom: profileData.nom,
            prenom: profileData.prenom,
            email: profileData.email,
            imageUrl: profileData.imageUrl,
            isActive: profileData.isActive,
            isArchived: profileData.isArchived,
          }}
          onSave={handleSavePersonalInfo}
        />

        <ProfessionalInfoSection
          data={{
            niveauExperience: profileData.niveauExperience,
            formationJuridique: profileData.formationJuridique,
            specialisations: profileData.specialisations,
            domainExperiences: profileData.domainExperiences,
            typeTravail: profileData.typeTravail,
          }}
          onSave={handleSaveProfessionalInfo}
        />

        <SearchPreferencesSection
          preferences={profileData.preferencesDeRecherche}
          langues={profileData.langues}
          onSavePreferences={handleSavePreferences}
          onSaveLanguages={handleSaveLanguages}
        />
      </main> */}
      <pre>
      {JSON.stringify(profileData, null, 2)}
      </pre>

      {/* <Toaster /> a été supprimé */}
    </div>
  );
}