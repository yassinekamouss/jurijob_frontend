"use client";

import { useState, useEffect } from "react";
import { Header } from "@/app/candidat/components/Header";
import { PersonalInfoSection } from "@/app/candidat/components/PersonalInfoSection";
import { ProfessionalInfoSection } from "@/app/candidat/components/ProfessionalInfoSection";
import { SearchPreferencesSection } from "@/app/candidat/components/SearchPreferencesSection";
import { User } from "@/app/types/user";
import { useAuth } from "@/app/context/AuthContext";
import Candidat from "@/app/types/candidat";

// Types alignés avec les interfaces des composants
type ProfessionalInfo = {
  niveauExperience: string;
  formationJuridique: string;
  specialisations: string[];
  domainExperiences: string[];
  typeTravail: string;
};

type PersonalInfo = {
  nom: string;
  prenom: string;
  email: string;
  imageUrl?: string;
  isActive: boolean;
  isArchived: boolean;
};



export default function Dashboard() {
  
  const {user, loading, logout} = useAuth();
  const [profileData, setProfileData] = useState<Candidat | null>(
    user as Candidat | null
  );

  useEffect(()=>{
    if(user){
      setProfileData(user);
    }

  },[user])
  

  const handleSavePersonalInfo = (data: PersonalInfo) => {
    setProfileData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        ...data,
      } as Candidat;
    });
    console.log("Notification: Informations personnelles mises à jour");
    // Ici, vous pouvez ajouter un appel API pour sauvegarder les données
  };

  const handleSaveProfessionalInfo = (data: ProfessionalInfo) => {
    setProfileData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        niveauExperience: data.niveauExperience,
        formationJuridique: data.formationJuridique,
        specialisations: data.specialisations,
        domainExperiences: data.domainExperiences,
        typeTravailRecherche: data.typeTravail, // Mapping du champ typeTravail vers typeTravailRecherche
      } as Candidat;
    });
    console.log("Notification: Informations professionnelles mises à jour");
    // Ici, vous pouvez ajouter un appel API pour sauvegarder les données
  };

  // FIX PRÉCÉDENT (Gestion de l'état de chargement/null)
  if (!profileData || loading) {
    // Cela gère à la fois le cas où l'utilisateur n'est pas encore chargé (user est null)
    // et le cas où, en théorie, ce composant est rendu pour un type d'utilisateur non attendu.
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-700">
          Chargement du profil...
        </p>
      </div>
    );
  }

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
            niveauExperience: profileData.niveauExperience || "",
            formationJuridique: profileData.formationJuridique || "",
            specialisations: profileData.specialisations || [],
            domainExperiences: profileData.domainExperiences || [],
            typeTravail: profileData.typeTravailRecherche || "",
          }}
          onSave={handleSaveProfessionalInfo}
        />

        {/* <SearchPreferencesSection
          preferences={profileData.preferencesDeRecherche}
          langues={profileData.langues}
          onSavePreferences={handleSavePreferences}
          onSaveLanguages={handleSaveLanguages}
        /> */}
      </main>
      <pre>{JSON.stringify(profileData, null, 2)}</pre>

      {/* <Toaster /> a été supprimé */}
    </div>
  );
}
