import { useState } from "react";
import { Edit2, Check, X, Search, MapPin, Laptop, Plus, Trash2 } from "lucide-react";

// Interfaces originales
interface Language {
  nom: string;
  niveau: string;
}

interface SearchPreferences {
  typeDeRecherche: string;
  mobiliteGeographique: string;
  teletravailAccepte: boolean;
}

interface SearchPreferencesSectionProps {
  preferences: SearchPreferences;
  langues: Language[];
  onSavePreferences: (preferences: SearchPreferences) => void;
  onSaveLanguages: (langues: Language[]) => void;
}

// Définitions des options pour les Selects
const rechercheOptions = ["Emploi", "Stage", "Alternance", "Mission"];
const mobiliteOptions = ["Locale", "Régionale", "Nationale", "Internationale"];
const niveauOptions = ["Débutant", "Intermédiaire", "Courant", "Natif"];

/**
 * Composant pour gérer et afficher les préférences de recherche et les langues.
 * Remplace les composants Shadcn/ui par des éléments HTML natifs stylisés avec Tailwind.
 */
export function SearchPreferencesSection({
  preferences,
  langues,
  onSavePreferences,
  onSaveLanguages,
}: SearchPreferencesSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPreferences, setEditedPreferences] = useState(preferences);
  const [editedLanguages, setEditedLanguages] = useState(langues);
  const [newLanguageName, setNewLanguageName] = useState("");
  const [newLanguageLevel, setNewLanguageLevel] = useState("Débutant");

  // Styles communs pour les éléments remplacés
  const inputBaseStyle = "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";
  const buttonPrimaryStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-50";
  const buttonGhostStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100 disabled:opacity-50";
  const buttonOutlineStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-50";

  const handleSave = () => {
    onSavePreferences(editedPreferences);
    onSaveLanguages(editedLanguages);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPreferences(preferences);
    setEditedLanguages(langues);
    setIsEditing(false);
    setNewLanguageName("");
    setNewLanguageLevel("Débutant");
  };

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

  return (
    <section className="bg-white rounded-lg border-l-4 border-gray-600 shadow-xl overflow-hidden font-sans max-w-7xl mx-auto my-8">
      {/* En-tête de section */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Préférences de recherche & Langues</h2>
        
        {/* Boutons Modifier / Enregistrer / Annuler */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={`${buttonGhostStyle} p-2`} // Adjusted padding for icon-only/small button
            aria-label="Modifier les préférences"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className={buttonGhostStyle}
              aria-label="Annuler les modifications"
            >
              <X className="h-4 w-4 mr-1" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className={buttonPrimaryStyle}
              aria-label="Enregistrer les modifications"
            >
              <Check className="h-4 w-4 mr-1" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        {!isEditing ? (
          /* Mode Lecture */
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Type de recherche */}
              <div className="space-y-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-medium">
                  <Search className="h-3.5 w-3.5" />
                  <span>Type de recherche</span>
                </div>
                <p className="text-lg font-medium text-gray-900">{preferences.typeDeRecherche}</p>
              </div>

              {/* Mobilité géographique */}
              <div className="space-y-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-medium">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Mobilité géographique</span>
                </div>
                <p className="text-lg font-medium text-gray-900">{preferences.mobiliteGeographique}</p>
              </div>

              {/* Télétravail */}
              <div className="space-y-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-medium">
                  <Laptop className="h-3.5 w-3.5" />
                  <span>Télétravail</span>
                </div>
                <p className={`text-lg font-medium ${preferences.teletravailAccepte ? 'text-green-600' : 'text-red-600'}`}>
                  {preferences.teletravailAccepte ? "Accepté" : "Non accepté"}
                </p>
              </div>
            </div>

            {/* Compétences linguistiques (Mode Lecture) */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compétences linguistiques</h3>
              <div className="flex flex-wrap gap-3">
                {langues.length === 0 ? (
                  <p className="text-sm text-gray-500">Aucune langue spécifiée.</p>
                ) : (
                  langues.map((langue, index) => (
                    <div
                      key={index}
                      // Simulation du style "Badge"
                      className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 transition-colors"
                    >
                      {langue.nom}
                      <span className="ml-2 font-normal text-gray-500">({langue.niveau})</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Mode Édition */
          <div className="space-y-8 max-w-4xl">
            {/* Formulaire de Préférences de Recherche */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Type de recherche */}
              <div className="space-y-2">
                <label htmlFor="typeRecherche" className="text-sm font-medium text-gray-700">Type de recherche</label>
                <select
                  id="typeRecherche"
                  value={editedPreferences.typeDeRecherche}
                  onChange={(e) =>
                    setEditedPreferences({ ...editedPreferences, typeDeRecherche: e.target.value })
                  }
                  className={inputBaseStyle}
                >
                  {rechercheOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Mobilité géographique */}
              <div className="space-y-2">
                <label htmlFor="mobilite" className="text-sm font-medium text-gray-700">Mobilité géographique</label>
                <select
                  id="mobilite"
                  value={editedPreferences.mobiliteGeographique}
                  onChange={(e) =>
                    setEditedPreferences({ ...editedPreferences, mobiliteGeographique: e.target.value })
                  }
                  className={inputBaseStyle}
                >
                  {mobiliteOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Télétravail Checkbox */}
            <div className="flex items-center gap-2 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="teletravail"
                checked={editedPreferences.teletravailAccepte}
                onChange={(e) =>
                  setEditedPreferences({
                    ...editedPreferences,
                    teletravailAccepte: e.target.checked,
                  })
                }
                className="rounded border-gray-400 h-4 w-4 text-gray-900 focus:ring-gray-900 cursor-pointer"
              />
              <label htmlFor="teletravail" className="cursor-pointer text-sm text-gray-900">
                J'accepte le télétravail
              </label>
            </div>

            {/* Section Langues */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Compétences linguistiques</h3>
                <span className="text-sm text-gray-500">{editedLanguages.length} langue(s)</span>
              </div>
              
              <div className="space-y-3">
                {editedLanguages.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4 border-2 border-dashed border-gray-200 rounded-md">
                    Aucune langue ajoutée
                  </p>
                ) : (
                  editedLanguages.map((langue, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {/* Champ Nom de la langue */}
                      <input
                        type="text"
                        value={langue.nom}
                        onChange={(e) => updateLanguageName(index, e.target.value)}
                        className={`${inputBaseStyle} flex-1`}
                        placeholder="ex. Français"
                        aria-label={`Nom de la langue ${index + 1}`}
                      />
                      
                      {/* Champ Niveau */}
                      <select
                        value={langue.niveau}
                        onChange={(e) => updateLanguageLevel(index, e.target.value)}
                        className={`${inputBaseStyle} sm:w-44`}
                        aria-label={`Niveau pour ${langue.nom}`}
                      >
                        {niveauOptions.map((niveau) => (
                            <option key={niveau} value={niveau}>{niveau}</option>
                        ))}
                      </select>

                      {/* Bouton Supprimer */}
                      <button
                        onClick={() => removeLanguage(index)}
                        className="flex-shrink-0 w-full sm:w-10 flex items-center justify-center rounded-md text-red-600 hover:text-red-700 hover:bg-red-100 transition-colors h-10 p-2"
                        aria-label={`Supprimer la langue ${langue.nom}`}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sm:hidden ml-2">Supprimer</span>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Ajouter une nouvelle langue */}
              <div className="flex flex-col sm:flex-row gap-3 items-end pt-4 border-t border-gray-100">
                <div className="flex-1 space-y-2 w-full">
                  <label htmlFor="newLanguage" className="text-sm font-medium text-gray-700">Ajouter une langue</label>
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

                {/* Sélecteur de niveau pour la nouvelle langue */}
                <select 
                    value={newLanguageLevel} 
                    onChange={(e) => setNewLanguageLevel(e.target.value)}
                    className={`${inputBaseStyle} sm:w-44 w-full`}
                    aria-label="Niveau de la nouvelle langue"
                >
                    {niveauOptions.map((niveau) => (
                        <option key={niveau} value={niveau}>{niveau}</option>
                    ))}
                </select>

                {/* Bouton Ajouter */}
                <button
                  onClick={addLanguage}
                  disabled={!newLanguageName.trim()}
                  className={`${buttonOutlineStyle} flex-shrink-0 w-full sm:w-auto disabled:border-gray-300 disabled:text-gray-400`}
                  aria-label="Ajouter la langue"
                >
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
