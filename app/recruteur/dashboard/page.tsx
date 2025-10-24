"use client";

import { useAuth } from "@/app/context/AuthContext";
import React, { useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import Recruteur from "@/app/types/recruteur";
import { villes, tailleEntreprise, typeOrganisation } from "@/app/constants/options";
export default function Dashboard() {
  const { user } = useAuth(); // user: Recruteur | null
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
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  const inputCls = (enabled: boolean) =>
    `w-full border rounded-md px-3 py-2 outline-none transition ${enabled
      ? "border-gray-300 focus:border-gray-900 bg-white"
      : "border-gray-200 bg-gray-50 cursor-not-allowed"
    }`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Colonne gauche */}
        <div className="lg:col-span-8 space-y-5 sm:space-y-6">
          {/* Section principale avec bouton modifier */}
          <section className="bg-white rounded-2xl shadow border p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Profil recruteur
              </h2>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
                >
                  <Edit2 className="h-4 w-4" />
                  Modifier
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    <Check className="h-4 w-4" />
                    Enregistrer
                  </button>
                </div>
              )}
            </div>

            {/* Photo + infos principales */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <img
                src={profileData.imageUrl}
                alt={`${profileData.prenom} ${profileData.nom}`}
                className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover"
              />
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

            {/* Informations personnelles */}
            <div className="space-y-5">
              <h3 className="text-md font-semibold text-gray-800 border-b border-gray-300 pb-2">
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Email</label>
                  <input
                    type="email"
                    value={editedData?.email || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({ ...editedData!, email: e.target.value })
                    }
                    className={inputCls(isEditing)}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Téléphone</label>
                  <input
                    value={editedData?.telephone || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({
                        ...editedData!,
                        telephone: e.target.value,
                      })
                    }
                    className={inputCls(isEditing)}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Ville</label>
                  <select
                    value={editedData?.ville || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({ ...editedData!, ville: e.target.value })
                    }
                    className={`${isEditing
                      ? "border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                      : "bg-gray-100 border border-gray-200 cursor-not-allowed"
                      } w-full p-2 rounded-md text-gray-800 text-sm transition-all duration-200`}
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
                  <label className="text-sm text-gray-700">Code postal</label>
                  <input
                    value={editedData?.codePostal || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({
                        ...editedData!,
                        codePostal: e.target.value,
                      })
                    }
                    className={inputCls(isEditing)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-700">Site web</label>
                  <input
                    value={editedData?.siteWeb || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({ ...editedData!, siteWeb: e.target.value })
                    }
                    className={inputCls(isEditing)}
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
                  <label className="text-sm text-gray-700">Entreprise</label>
                  <input
                    value={editedData?.nomEntreprise || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({
                        ...editedData!,
                        nomEntreprise: e.target.value,
                      })
                    }
                    className={inputCls(isEditing)}
                  />
                </div>

                {/* <div>
                  <label className="text-sm text-gray-700">Poste</label>
                  <input
                    value={editedData?.poste || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({
                        ...editedData!,
                        poste: e.target.value,
                      })
                    }
                    className={inputCls(isEditing)}
                  />
                </div> */}

                {/* Type d'organisation */}
                <div>
                  <label className="text-sm text-gray-700">Type d'organisation</label>
                  <select
                    value={editedData?.typeOrganisation || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({
                        ...editedData!,
                        typeOrganisation: e.target.value,
                      })
                    }
                    className={`${isEditing
                        ? "border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                        : "bg-gray-100 border border-gray-200 cursor-not-allowed"
                      } w-full p-2 rounded-md text-gray-800 text-sm transition-all duration-200`}
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

                {/* Taille de l'entreprise */}
                <div>
                  <label className="text-sm text-gray-700">Taille de l'entreprise</label>
                  <select
                    value={editedData?.tailleEntreprise || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({
                        ...editedData!,
                        tailleEntreprise: e.target.value,
                      })
                    }
                    className={`${isEditing
                        ? "border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                        : "bg-gray-100 border border-gray-200 cursor-not-allowed"
                      } w-full p-2 rounded-md text-gray-800 text-sm transition-all duration-200`}
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


                {/* <div className="sm:col-span-2">
                  <label className="text-sm text-gray-700">Statut</label>
                  <select
                    value={editedData?.isActive ? "Actif" : "Inactif"}
                    disabled={!isEditing}
                    onChange={(e) =>
                      isEditing &&
                      setEditedData({
                        ...editedData!,
                        isActive: e.target.value === "Actif",
                      })
                    }
                    className={inputCls(isEditing)}
                  >
                    <option>Actif</option>
                    <option>Inactif</option>
                  </select>
                </div> */}
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
    </main>
  );
}
