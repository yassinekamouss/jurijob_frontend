import { useState } from "react";
import {
  Edit2,
  Check,
  X,
  Search,
  MapPin,
  Laptop,
  Plus,
  Trash2,
} from "lucide-react";
import { Language, SearchPreferences } from "@/app/types/searchPreferences";

// Options pour les Selects
const typeTravailOptions = [
  "CDI",
  "CDD",
  "Freelance",
  "Stage",
  "Alternance",
  "Mission",
];
const modeTravailOptions = ["Présentiel", "Hybride", "Télétravail"];
const niveauOptions = ["A1-A2", "B1-B2", "C1-C2"];

export function SearchPreferencesSection({
  preferences,
  langues,
  onSavePreferences,
  onSaveLanguages,
}: {
  preferences: SearchPreferences;
  langues: Language[];
  onSavePreferences: (preferences: SearchPreferences) => void;
  onSaveLanguages: (langues: Language[]) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPreferences, setEditedPreferences] = useState(preferences);
  const [editedLanguages, setEditedLanguages] = useState(langues);

  // Gestion des villes
  const [newVille, setNewVille] = useState("");
  const addVille = () => {
    if (newVille.trim()) {
      setEditedPreferences({
        ...editedPreferences,
        villesTravailRecherche: [
          ...(editedPreferences.villesTravailRecherche || []),
          newVille.trim(),
        ],
      });
      setNewVille("");
    }
  };
  const removeVille = (index: number) => {
    setEditedPreferences({
      ...editedPreferences,
      villesTravailRecherche: (
        editedPreferences.villesTravailRecherche || []
      ).filter((_, i) => i !== index),
    });
  };

  // Gestion langues
  const [newLanguageName, setNewLanguageName] = useState("");
  const [newLanguageLevel, setNewLanguageLevel] = useState("A1-A2");
  const addLanguage = () => {
    if (newLanguageName.trim()) {
      setEditedLanguages([
        ...editedLanguages,
        { nom: newLanguageName.trim(), niveau: newLanguageLevel },
      ]);
      setNewLanguageName("");
      setNewLanguageLevel("A1-A2");
    }
  };
  const removeLanguage = (index: number) => {
    setEditedLanguages(editedLanguages.filter((_, i) => i !== index));
  };
  const updateLanguageName = (index: number, nom: string) => {
    const updated = [...editedLanguages];
    updated[index] = { ...updated[index], nom };
    setEditedLanguages(updated);
  };
  const updateLanguageLevel = (index: number, niveau: string) => {
    const updated = [...editedLanguages];
    updated[index] = { ...updated[index], niveau };
    setEditedLanguages(updated);
  };

  const handleSave = () => {
    onSavePreferences(editedPreferences);
    onSaveLanguages(editedLanguages);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPreferences(preferences);
    setEditedLanguages(langues);
    setIsEditing(false);
    setNewVille("");
    setNewLanguageName("");
    setNewLanguageLevel("A1-A2");
  };

  const inputBaseStyle =
    "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus:border-gray-900 focus:outline-none";
  const disabledCls = "border-gray-200 bg-gray-50 cursor-not-allowed";
  const enabledCls = "border-gray-300";
  const buttonPrimaryStyle =
    "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-black text-white hover:bg-gray-800";
  const buttonGhostStyle =
    "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100";
  const buttonOutlineStyle =
    "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white";

  return (
    <section className="bg-white border-l-4 border-black shadow-sm overflow-hidden font-sans max-w-7xl mx-auto my-8">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">
          Préférences de recherche & Langues
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={`${buttonGhostStyle} p-2`}>
            <Edit2 className="h-4 w-4 mr-2" />
            Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel} className={buttonGhostStyle}>
              <X className="h-4 w-4 mr-1" />
              Annuler
            </button>
            <button onClick={handleSave} className={buttonPrimaryStyle}>
              <Check className="h-4 w-4 mr-1" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Unique form view: inputs disabled in read-only */}
        <div className="space-y-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label
                htmlFor="typeTravail"
                className="text-sm font-medium text-gray-700">
                Type de travail recherché
              </label>
              <select
                id="typeTravail"
                value={
                  isEditing
                    ? editedPreferences.typeTravailRecherche
                    : preferences.typeTravailRecherche
                }
                onChange={(e) =>
                  isEditing &&
                  setEditedPreferences({
                    ...editedPreferences,
                    typeTravailRecherche: e.target.value,
                  })
                }
                disabled={!isEditing}
                className={`${inputBaseStyle} ${
                  isEditing ? enabledCls : disabledCls
                }`}>
                <option value="">Sélectionner...</option>
                {typeTravailOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="modeTravail"
                className="text-sm font-medium text-gray-700">
                Mode de travail
              </label>
              <select
                id="modeTravail"
                value={
                  isEditing
                    ? editedPreferences.modeTravailRecherche
                    : preferences.modeTravailRecherche
                }
                onChange={(e) =>
                  isEditing &&
                  setEditedPreferences({
                    ...editedPreferences,
                    modeTravailRecherche: e.target.value,
                  })
                }
                disabled={!isEditing}
                className={`${inputBaseStyle} ${
                  isEditing ? enabledCls : disabledCls
                }`}>
                <option value="">Sélectionner...</option>
                {modeTravailOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Villes */}
          <div className="space-y-3">
            <label className="text-gray-700 text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Villes souhaitées
            </label>
            <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-3 bg-gray-50 rounded-lg border border-gray-200">
              {(
                (isEditing
                  ? editedPreferences.villesTravailRecherche
                  : preferences.villesTravailRecherche) || []
              ).length === 0 ? (
                <span className="text-sm text-gray-400">
                  Aucune ville ajoutée
                </span>
              ) : (
                (
                  (isEditing
                    ? editedPreferences.villesTravailRecherche
                    : preferences.villesTravailRecherche) || []
                ).map((ville, index) => (
                  <span
                    key={`${ville}-${index}`}
                    className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-400 rounded-md bg-white hover:bg-gray-100">
                    {ville}
                    <button
                      onClick={() => isEditing && removeVille(index)}
                      disabled={!isEditing}
                      className={`text-gray-500 ${
                        isEditing
                          ? "hover:text-red-600"
                          : "opacity-50 cursor-not-allowed"
                      }`}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                value={newVille}
                onChange={(e) => isEditing && setNewVille(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    isEditing && addVille();
                  }
                }}
                placeholder="ex. Casablanca, Rabat, Paris"
                disabled={!isEditing}
                className={`${inputBaseStyle} ${
                  isEditing ? enabledCls : disabledCls
                }`}
              />
              <button
                onClick={addVille}
                disabled={!isEditing || !newVille.trim()}
                className={`${
                  !isEditing || !newVille.trim()
                    ? "border border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                } inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-white`}>
                <Plus className="h-4 w-4" />
                <span className="ml-1">Ajouter</span>
              </button>
            </div>
          </div>

          {/* Langues */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Compétences linguistiques
              </h3>
              <span className="text-sm text-gray-500">
                {(isEditing ? editedLanguages : langues).length} langue(s)
              </span>
            </div>

            <div className="space-y-3">
              {(isEditing ? editedLanguages : langues).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4 border-2 border-dashed border-gray-200 rounded-md">
                  Aucune langue ajoutée
                </p>
              ) : (
                (isEditing ? editedLanguages : langues).map((langue, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <input
                      type="text"
                      value={langue.nom}
                      onChange={(e) =>
                        isEditing && updateLanguageName(index, e.target.value)
                      }
                      className={`${inputBaseStyle} ${
                        isEditing ? enabledCls : disabledCls
                      } flex-1`}
                      placeholder="ex. Français"
                      disabled={!isEditing}
                    />
                    <select
                      value={langue.niveau}
                      onChange={(e) =>
                        isEditing && updateLanguageLevel(index, e.target.value)
                      }
                      className={`${inputBaseStyle} ${
                        isEditing ? enabledCls : disabledCls
                      } sm:w-44`}
                      disabled={!isEditing}>
                      {niveauOptions.map((niveau) => (
                        <option key={niveau} value={niveau}>
                          {niveau}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => isEditing && removeLanguage(index)}
                      disabled={!isEditing}
                      className={`flex-shrink-0 w-full sm:w-10 flex items-center justify-center rounded-md h-10 p-2 ${
                        isEditing
                          ? "text-red-600 hover:text-red-700 hover:bg-red-100"
                          : "text-gray-300 cursor-not-allowed"
                      }`}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sm:hidden ml-2">Supprimer</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Ajouter une langue */}
            <div className="flex flex-col sm:flex-row gap-3 items-end pt-4 border-t border-gray-100">
              <div className="flex-1 space-y-2 w-full">
                <label
                  htmlFor="newLanguage"
                  className="text-sm font-medium text-gray-700">
                  Ajouter une langue
                </label>
                <input
                  id="newLanguage"
                  type="text"
                  value={newLanguageName}
                  onChange={(e) =>
                    isEditing && setNewLanguageName(e.target.value)
                  }
                  onKeyDown={(e) => {
                    e.key === "Enter" &&
                      (e.preventDefault(), isEditing && addLanguage());
                  }}
                  placeholder="ex. Anglais"
                  disabled={!isEditing}
                  className={`${inputBaseStyle} ${
                    isEditing ? enabledCls : disabledCls
                  }`}
                />
              </div>
              <select
                value={newLanguageLevel}
                onChange={(e) =>
                  isEditing && setNewLanguageLevel(e.target.value)
                }
                className={`${inputBaseStyle} ${
                  isEditing ? enabledCls : disabledCls
                } sm:w-44 w-full`}
                disabled={!isEditing}>
                {niveauOptions.map((niveau) => (
                  <option key={niveau} value={niveau}>
                    {niveau}
                  </option>
                ))}
              </select>
              <button
                onClick={addLanguage}
                disabled={!isEditing || !newLanguageName.trim()}
                className={`${buttonOutlineStyle} flex-shrink-0 w-full sm:w-auto disabled:border-gray-300 disabled:text-gray-400`}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
