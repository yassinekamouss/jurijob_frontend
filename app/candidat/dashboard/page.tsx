"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/app/candidat/components/Header";
import { PersonalInfoSection } from "@/app/candidat/components/PersonalInfoSection";
import { ProfessionalInfoSection } from "@/app/candidat/components/ProfessionalInfoSection";
import { SearchPreferencesSection } from "@/app/candidat/components/SearchPreferencesSection";
import { useAuth } from "@/app/context/AuthContext";
import { ProfessionalInfo } from "@/app/types/professionalInfo";
import { PersonalInfo } from "@/app/types/personalInfo";
import { SearchPreferences, Language } from "@/app/types/searchPreferences";
import Candidat from "@/app/types/candidat";
import { Mail, Phone, ShieldCheck, Info, Clock, Lightbulb } from "lucide-react";

export default function Dashboard() {
  const { user, loading, logout, fetchWithAuth } = useAuth();
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

  const handleSavePersonalInfo = async (data: PersonalInfo) => {
    if (!profileData) return;
    try {
      const payload = {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        isActive: data.isActive,
        isArchived: data.isArchived,
        // imageUrl is NOT on User model; update separately on Candidat
      };
      const res = await fetchWithAuth(
        `/users/update-user`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Update user failed", err);
      }

      // Update candidate-specific fields (imageUrl)
      if (typeof data.imageUrl !== "undefined") {
        await fetchWithAuth("/candidats/update-profile", {
          method: "PATCH",
          body: JSON.stringify({
            userId: profileData.userId,
            imageUrl: data.imageUrl,
          }),
        });
      }

      await refreshProfile();
      console.log("Notification: Informations personnelles mises à jour");
    } catch (e) {
      console.error("Erreur MAJ infos personnelles", e);
    }
  };

  const handleSaveProfessionalInfo = async (data: ProfessionalInfo) => {
    if (!profileData) return;
    try {
      const payload = {
        posteActuel: data.posteActuel,
        niveauExperience: data.niveauExperience,
        formationJuridique: data.formationJuridique,
        specialisations: data.specialisations,
        domainExperiences: data.domainExperiences,
      };
      const res = await fetchWithAuth("/candidats/update-profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Update candidat (pro) failed", err);
      }
      await refreshProfile();
      console.log("Notification: Informations professionnelles mises à jour");
    } catch (e) {
      console.error("Erreur MAJ infos professionnelles", e);
    }
  };

  const handleSavePreferences = async (preferences: SearchPreferences) => {
    if (!profileData) return;
    try {
      const payload = {
        typeTravailRecherche: preferences.typeTravailRecherche,
        modeTravailRecherche: preferences.modeTravailRecherche,
        villesTravailRecherche: preferences.villesTravailRecherche,
      };
      const res = await fetchWithAuth("/candidats/update-profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Update candidat (prefs) failed", err);
      }
      await refreshProfile();
      console.log("Notification: Préférences de recherche mises à jour");
    } catch (e) {
      console.error("Erreur MAJ préférences", e);
    }
  };

  const handleSaveLanguages = async (langues: Language[]) => {
    if (!profileData) return;
    try {
      const payload = {
        userId: profileData.userId,
        langues,
      };
      const res = await fetchWithAuth("/candidats/update-profile", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Update candidat (langues) failed", err);
      }
      await refreshProfile();
      console.log("Notification: Langues mises à jour");
    } catch (e) {
      console.error("Erreur MAJ langues", e);
    }
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Colonne gauche ~70% */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
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
                villesTravailRecherche:
                  profileData.villesTravailRecherche || [],
              }}
              langues={profileData.langues as Language[]}
              onSavePreferences={handleSavePreferences}
              onSaveLanguages={handleSaveLanguages}
            />
          </div>

          {/* Colonne droite ~30% (Sidebar) */}
          <aside className="lg:col-span-4 space-y-5 sm:space-y-6 lg:sticky top-24 h-fit">
            {/* Contact & Support */}
            <section className="bg-white  border shadow-sm p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-gray-600" />
                <h3 className="text-black font-semibold">Contact et support</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a
                    href="mailto:support@jurijob.com"
                    className="hover:underline">
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
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-gray-700 hover:text-black mt-1">
                  Centre d'aide{" "}
                </a>
              </div>
            </section>

            {/* À propos de Jurijob */}
            <section className="bg-white  border shadow-sm p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-gray-600" />
                <h3 className="text-black font-semibold">Pourquoi Jurijob ?</h3>
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Recruteurs spécialisés en métiers du droit</li>
                <li>Protection des données et confidentialité</li>
                <li>Offres pertinentes selon votre profil</li>
              </ul>
              <Link
                href="/"
                className="mt-3 inline-flex items-center gap-1 text-gray-700 hover:text-black text-sm">
                En savoir plus{" "}
              </Link>
            </section>

            {/* Conseils rapides */}
            <section className="bg-white  border shadow-sm p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-gray-600" />
                <h3 className="text-black font-semibold">
                  Optimiser votre profil
                </h3>
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

      {JSON.stringify(profileData, null, 2) /* DEBUG ONLY */}
    </div>
  );
}
