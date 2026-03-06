"use client";

import { useAuth } from "@/app/context/AuthContext";
import React, { useState } from "react";
import { Edit2, Check, X, Lock } from "lucide-react";
import Recruteur from "@/app/types/recruteur";
import { villes, tailleEntreprise, typeOrganisation } from "@/app/constants/options";

export default function Dashboard() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<Recruteur | null>(
    user as Recruteur | null
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Recruteur | null>(
    user as Recruteur | null
  );

  if (!profileData) {
    return <p className="text-center py-10 text-gray-600">Chargement...</p>;
  }

  const handleSave = () => {
    if (editedData) {
      setProfileData({
        ...profileData,
        tailleEntreprise: editedData.tailleEntreprise,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  // Style pour les champs toujours verrouillés (non modifiables)
  const lockedCls = "w-full border rounded-md px-3 py-2 outline-none transition border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed";

  // Style pour le select ville/type (toujours verrouillé)
  const lockedSelectCls = "bg-gray-100 border border-gray-200 cursor-not-allowed w-full p-2 rounded-md text-gray-500 text-sm transition-all duration-200";

  // Style pour tailleEntreprise (seul champ modifiable)
  const editableSelectCls = (enabled: boolean) =>
    `${enabled
      ? "border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-900 cursor-pointer bg-white text-gray-800"
      : "bg-gray-100 border border-gray-200 cursor-not-allowed text-gray-500"
    } w-full p-2 rounded-md text-sm transition-all duration-200`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Colonne gauche */}
        <div className="lg:col-span-8 space-y-5 sm:space-y-6">
          {/* Section principale */}
          <section className="bg-white rounded-2xl shadow border p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Profil recruteur
              </h2>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
                >
                  <Edit2 className="h-4 w-4" />
                  Modifier
                </button>
              )}
            </div>

            {/* Infos principales (sans photo) */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div className="w-28 h-28 rounded-full border-4 border-gray-300 bg-gray-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-semibold">
                  {(profileData.prenom?.[0] || "").toUpperCase()}{(profileData.nom?.[0] || "").toUpperCase()}
                </span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {profileData.prenom} {profileData.nom}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {profileData.role}
                </p>
                <p className="text-xs text-gray-500">
                  {profileData.nomEntreprise}
                </p>
              </div>
            </div>

            {/* Note d'avertissement */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg mb-6">
              <Lock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500">
                Seule la <strong className="text-gray-700">taille de l'entreprise</strong> peut être modifiée.
                Pour modifier d'autres informations, veuillez contacter le support.
              </p>
            </div>

            {/* Informations personnelles — toujours verrouillées */}
            <div className="space-y-5">
              <h3 className="text-md font-semibold text-gray-800 border-b border-gray-300 pb-2">
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    type="email"
                    value={profileData.email || ""}
                    disabled
                    className={lockedCls}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Téléphone</label>
                  <input
                    value={profileData.telephone || ""}
                    disabled
                    className={lockedCls}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Ville</label>
                  <select
                    value={profileData.ville || ""}
                    disabled
                    className={lockedSelectCls}
                  >
                    <option value="" disabled>
                      Sélectionnez une ville
                    </option>
                    {villes.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Code postal</label>
                  <input
                    value={profileData.codePostal || ""}
                    disabled
                    className={lockedCls}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-500">Site web</label>
                  <input
                    value={profileData.siteWeb || ""}
                    disabled
                    className={lockedCls}
                  />
                </div>
              </div>
            </div>

            {/* Informations professionnelles */}
            <div className="space-y-5 mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-md font-semibold text-gray-800 border-b border-gray-300 pb-2">
                Informations professionnelles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Entreprise</label>
                  <input
                    value={profileData.nomEntreprise || ""}
                    disabled
                    className={lockedCls}
                  />
                </div>

                {/* Type d'organisation — verrouillé */}
                <div>
                  <label className="text-sm text-gray-500">Type d'organisation</label>
                  <select
                    value={profileData.typeOrganisation || ""}
                    disabled
                    className={lockedSelectCls}
                  >
                    <option value="" disabled>
                      Sélectionnez un type
                    </option>
                    {typeOrganisation.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Taille de l'entreprise — SEUL CHAMP MODIFIABLE */}
                <div>
                  <label className={`text-sm ${isEditing ? "text-gray-700 font-medium" : "text-gray-500"}`}>
                    Taille de l'entreprise
                    {isEditing && <span className="ml-1 text-xs text-green-600">(modifiable)</span>}
                  </label>
                  <select
                    value={isEditing ? (editedData?.tailleEntreprise || "") : (profileData.tailleEntreprise || "")}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({
                        ...editedData!,
                        tailleEntreprise: e.target.value,
                      })
                    }
                    className={editableSelectCls(isEditing)}
                  >
                    <option value="" disabled>
                      Sélectionnez une taille
                    </option>
                    {tailleEntreprise.map((taille) => (
                      <option key={taille} value={taille}>
                        {taille}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-5 sm:space-y-6 lg:sticky top-24 h-fit">
          <section className="bg-white border shadow-sm p-4 sm:p-5">
            <h3 className="text-black font-semibold mb-3">Contact & Support</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                Email:{" "}
                <a
                  href="mailto:support@jurijob.com"
                  className="hover:underline"
                >
                  support@jurijob.com
                </a>
              </p>
              <p>
                Téléphone:{" "}
                <a href="tel:+212500000000" className="hover:underline">
                  +212 5 00 00 00 00
                </a>
              </p>
              <p>Heures: Lun–Ven • 9h–18h (CET)</p>
            </div>
          </section>

          <section className="bg-white border shadow-sm p-4 sm:p-5">
            <h3 className="text-black font-semibold mb-3">À propos</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Recruteurs spécialisés en métiers du droit</li>
              <li>Protection des données et confidentialité</li>
              <li>Offres pertinentes selon votre profil</li>
            </ul>
          </section>

          <section className="bg-white border shadow-sm p-4 sm:p-5">
            <h3 className="text-black font-semibold mb-3">Conseils rapides</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Complétez vos informations personnelles</li>
              <li>Ajoutez vos spécialisations et domaines clés</li>
              <li>Indiquez vos langues (A1–C2)</li>
            </ul>
          </section>
        </aside>
      </div>

      {/* Barre d'actions fixée en bas — visible uniquement en mode édition */}
      {isEditing && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-end gap-3 px-4 sm:px-6">
            <span className="hidden sm:inline-block mr-auto text-sm font-medium text-gray-500">
              Modification de la taille de l'entreprise...
            </span>
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black border border-gray-200 bg-white w-full sm:w-auto"
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium transition-colors rounded-md bg-black text-white hover:bg-gray-800 w-full sm:w-auto shadow-sm"
            >
              <Check className="h-4 w-4 mr-2" />
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

