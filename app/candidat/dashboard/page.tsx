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
import {
  Mail,
  Phone,
  ShieldCheck,
  Info,
  ExternalLink,
  Clock,
  Lightbulb,
} from "lucide-react";

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
    // Stocker directement en tant que Language[] (nom, niveau)
    setProfileData((prevData) => {
      if (!prevData) return null;
      return {
        ...prevData,
        langues,
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        candidateName={`${profileData.prenom} - ${profileData.nom}`}
        onLogout={logout}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Colonne gauche ~70% */}
          <div className="lg:col-span-8 space-y-6">
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
              langues={profileData.langues as Language[]}
              onSavePreferences={handleSavePreferences}
              onSaveLanguages={handleSaveLanguages}
            />
          </div>

          {/* Colonne droite ~30% (Sidebar) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky top-24 h-fit">
            {/* Contact & Support */}
            <section className="bg-white border shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-gray-600" />
                <h3 className="text-black font-semibold">Contact et support</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a
                    href="mailto:support@jurijob.com"
                    className="hover:underline"
                  >
                    support@jurijob.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href="tel:+212500000000" className="hover:underline">
                    +212 5 00 00 00 00
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Lun–Ven • 9h–18h (CET)</span>
                </div>
              </div>
            </section>

            {/* À propos de Jurijob */}
            <section className="bg-white border shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-gray-600" />
                <h3 className="text-black font-semibold">Pourquoi Jurijob ?</h3>
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Recruteurs spécialisés en métiers du droit</li>
                <li>Protection des données et confidentialité</li>
                <li>Offres pertinentes selon votre profil</li>
              </ul>
            </section>

            {/* Conseils rapides */}
            <section className="bg-white border shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-gray-600" />
                <h3 className="text-black font-semibold">Optimiser votre profil</h3>
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Complétez vos informations personnelles</li>
                <li>Ajoutez vos spécialisations et domaines clés</li>
                <li>Indiquez vos langues (A1–C2)</li>
              </ul>
            </section>
          </aside>
        </div>
      </main>
      {/* <pre>{JSON.stringify(profileData, null, 2)}</pre> */}
    </div>
  );
}
