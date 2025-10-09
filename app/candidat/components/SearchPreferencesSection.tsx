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
const niveauOptions = ["Débutant", "Intermédiaire", "Courant", "Natif"];

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
  const [newLanguageLevel, setNewLanguageLevel] = useState("Débutant");
  const addLanguage = () => {
    if (newLanguageName.trim()) {
      setEditedLanguages([
        ...editedLanguages,
        { nom: newLanguageName.trim(), niveau: newLanguageLevel },
      ]);
      setNewLanguageName("");
      setNewLanguageLevel("Débutant");
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
    setNewLanguageLevel("Débutant");
  };

  const inputBaseStyle =
    "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus:border-gray-900 focus:outline-none";
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
        {!isEditing ? (
          // Lecture
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-medium">
                  <Search className="h-3.5 w-3.5" />
                  <span>Type de travail recherché</span>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {preferences.typeTravailRecherche || "—"}
                </p>
              </div>

              <div className="space-y-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-medium">
                  <Laptop className="h-3.5 w-3.5" />
                  <span>Mode de travail</span>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {preferences.modeTravailRecherche || "—"}
                </p>
              </div>

              <div className="space-y-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-medium">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Villes souhaitées</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(preferences.villesTravailRecherche || []).length === 0 ? (
                    <span className="text-sm text-gray-400">—</span>
                  ) : (
                    preferences.villesTravailRecherche.map((v, i) => (
                      <span
                        key={`${v}-${i}`}
                        className="px-2 py-1 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-800">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Langues lecture */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Compétences linguistiques
              </h3>
              <div className="flex flex-wrap gap-3">
                {editedLanguages.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Aucune langue spécifiée.
                  </p>
                ) : (
                  editedLanguages.map((langue, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      {langue.nom}
                      <span className="ml-2 font-normal text-gray-500">
                        ({langue.niveau})
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          // Edition
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
                  value={editedPreferences.typeTravailRecherche}
                  onChange={(e) =>
                    setEditedPreferences({
                      ...editedPreferences,
                      typeTravailRecherche: e.target.value,
                    })
                  }
                  className={inputBaseStyle}>
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
                  value={editedPreferences.modeTravailRecherche}
                  onChange={(e) =>
                    setEditedPreferences({
                      ...editedPreferences,
                      modeTravailRecherche: e.target.value,
                    })
                  }
                  className={inputBaseStyle}>
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
              <label className="text-gray-700 text-sm">Villes souhaitées</label>
              <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-3 bg-gray-50 rounded-lg border border-gray-200">
                {(editedPreferences.villesTravailRecherche || []).length ===
                0 ? (
                  <span className="text-sm text-gray-400">
                    Aucune ville ajoutée
                  </span>
                ) : (
                  (editedPreferences.villesTravailRecherche || []).map(
                    (ville, index) => (
                      <span
                        key={`${ville}-${index}`}
                        className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-400 rounded-md bg-white hover:bg-gray-100">
                        {ville}
                        <button
                          onClick={() => removeVille(index)}
                          className="text-gray-500 hover:text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </span>
                    )
                  )
                )}
              </div>
              <div className="flex gap-2">
                <input
                  value={newVille}
                  onChange={(e) => setNewVille(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addVille();
                    }
                  }}
                  placeholder="ex. Casablanca, Rabat, Paris"
                  className={inputBaseStyle}
                />
                <button
                  onClick={addVille}
                  className={`${buttonOutlineStyle} flex items-center gap-1`}>
                  <Plus className="h-4 w-4" />
                  Ajouter
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
                  {editedLanguages.length} langue(s)
                </span>
              </div>

              <div className="space-y-3">
                {editedLanguages.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4 border-2 border-dashed border-gray-200 rounded-md">
                    Aucune langue ajoutée
                  </p>
                ) : (
                  editedLanguages.map((langue, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <input
                        type="text"
                        value={langue.nom}
                        onChange={(e) =>
                          updateLanguageName(index, e.target.value)
                        }
                        className={`${inputBaseStyle} flex-1`}
                        placeholder="ex. Français"
                      />
                      <select
                        value={langue.niveau}
                        onChange={(e) =>
                          updateLanguageLevel(index, e.target.value)
                        }
                        className={`${inputBaseStyle} sm:w-44`}>
                        {niveauOptions.map((niveau) => (
                          <option key={niveau} value={niveau}>
                            {niveau}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeLanguage(index)}
                        className="flex-shrink-0 w-full sm:w-10 flex items-center justify-center rounded-md text-red-600 hover:text-red-700 hover:bg-red-100 h-10 p-2">
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
                    onChange={(e) => setNewLanguageName(e.target.value)}
                    onKeyDown={(e) => {
                      e.key === "Enter" && (e.preventDefault(), addLanguage());
                    }}
                    placeholder="ex. Anglais"
                    className={inputBaseStyle}
                  />
                </div>
                <select
                  value={newLanguageLevel}
                  onChange={(e) => setNewLanguageLevel(e.target.value)}
                  className={`${inputBaseStyle} sm:w-44 w-full`}>
                  {niveauOptions.map((niveau) => (
                    <option key={niveau} value={niveau}>
                      {niveau}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addLanguage}
                  disabled={!newLanguageName.trim()}
                  className={`${buttonOutlineStyle} flex-shrink-0 w-full sm:w-auto disabled:border-gray-300 disabled:text-gray-400`}>
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
