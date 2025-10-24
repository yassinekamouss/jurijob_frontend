import { useState } from "react";
import Select from "react-select";
import {
  Edit2,
  Check,
  X,
  MapPin,
  Laptop,
  Plus,
  Trash2,
  Briefcase,
  Languages,
} from "lucide-react";
import { Language, SearchPreferences } from "@/app/types/searchPreferences";
import {
  typesTravailRecherche,
  modesTravailRecherche,
  villes,
  langues,
  niveauxLangue,
} from "@/app/constants/options";

interface OptionType {
  value: string;
  label: string;
}

// Fonction helper pour créer les options
const createOptions = (items: string[]): OptionType[] =>
  items.map((item) => ({ value: item, label: item }));

// Styles personnalisés pour react-select
const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "40px",
    borderRadius: "0.375rem",
    borderColor: state.isFocused ? "#000" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #000" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    backgroundColor: state.isDisabled ? "#f9fafb" : "#fff",
    cursor: state.isDisabled ? "not-allowed" : "default",
    "&:hover": {
      borderColor: state.isDisabled ? "#d1d5db" : "#000",
    },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#f3f4f6",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#111827",
    fontWeight: "500",
    fontSize: "0.875rem",
    padding: "2px 6px",
  }),
  multiValueRemove: (base: any, state: any) => ({
    ...base,
    color: "#6b7280",
    "&:hover": {
      backgroundColor: state.isDisabled ? "#f3f4f6" : "#ef4444",
      color: state.isDisabled ? "#6b7280" : "#fff",
    },
    display: state.isDisabled ? "none" : "flex",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#9ca3af",
    fontSize: "0.875rem",
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: "0.5rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    zIndex: 50,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#000"
      : state.isFocused
      ? "#f3f4f6"
      : "#fff",
    color: state.isSelected ? "#fff" : "#111827",
    cursor: "pointer",
    fontSize: "0.875rem",
    "&:active": {
      backgroundColor: state.isSelected ? "#000" : "#e5e7eb",
    },
  }),
};

export function SearchPreferencesSection({
  preferences,
  langues: languesData,
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
  const [editedLanguages, setEditedLanguages] = useState(languesData);

  // Gestion langues
  const [newLanguageName, setNewLanguageName] = useState("");
  const [newLanguageLevel, setNewLanguageLevel] = useState("");

  const addLanguage = () => {
    if (newLanguageName.trim() && newLanguageLevel) {
      setEditedLanguages([
        ...editedLanguages,
        { nom: newLanguageName.trim(), niveau: newLanguageLevel },
      ]);
      setNewLanguageName("");
      setNewLanguageLevel("");
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
    setEditedLanguages(languesData);
    setIsEditing(false);
    setNewLanguageName("");
    setNewLanguageLevel("");
  };

  // Handlers pour react-select
  const handleTypeTravailChange = (selectedOptions: readonly OptionType[] | null) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setEditedPreferences({
      ...editedPreferences,
      typeTravailRecherche: values,
    });
  };

  const handleModeTravailChange = (selectedOptions: readonly OptionType[] | null) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setEditedPreferences({
      ...editedPreferences,
      modeTravailRecherche: values,
    });
  };

  const handleVillesChange = (selectedOptions: readonly OptionType[] | null) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setEditedPreferences({
      ...editedPreferences,
      villesTravailRecherche: values,
    });
  };

  const buttonPrimaryStyle =
    "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors";
  const buttonGhostStyle =
    "inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100 transition-colors";


    // Filtrer les langues déjà sélectionnées
const getAvailableLanguages = () => {
  // Récupérer toutes les langues déjà choisies
  const selectedLanguages = (isEditing ? editedLanguages : languesData).map(
    (langue) => langue.nom
  );

  // Retourner uniquement les langues non encore sélectionnées
  return langues.filter((langue) => !selectedLanguages.includes(langue));
};


  return (
    <section className="bg-white border-l-4 border-black shadow-sm overflow-hidden font-sans max-w-7xl mx-auto my-8">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-base font-semibold text-gray-900">
          Préférences de recherche & Langues
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className={`${buttonGhostStyle} w-full sm:w-auto`}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Modifier
          </button>
        ) : (
          <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
            <button
              onClick={handleCancel}
              className={`${buttonGhostStyle} w-full sm:w-auto`}
            >
              <X className="h-4 w-4 mr-1" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className={`${buttonPrimaryStyle} w-full sm:w-auto`}
            >
              <Check className="h-4 w-4 mr-1" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="space-y-8 max-w-4xl">
          {/* Types de travail recherché avec react-select */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Types de travail recherchés
            </label>
            <Select
              isMulti
              options={createOptions(typesTravailRecherche)}
              value={createOptions(typesTravailRecherche).filter((opt) =>
                (isEditing
                  ? editedPreferences.typeTravailRecherche
                  : preferences.typeTravailRecherche || []
                ).includes(opt.value)
              )}
              onChange={handleTypeTravailChange}
              isDisabled={!isEditing}
              placeholder="Sélectionnez les types de travail..."
              styles={customStyles}
              noOptionsMessage={() => "Aucune option disponible"}
              closeMenuOnSelect={false}
              classNamePrefix="react-select"
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
            {((isEditing
              ? editedPreferences.typeTravailRecherche
              : preferences.typeTravailRecherche) || []
            ).length === 0 && (
              <p className="text-xs text-gray-500 italic">
                Aucun type de travail sélectionné
              </p>
            )}
          </div>

          {/* Mode de travail avec react-select */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Laptop className="h-4 w-4" />
              Modes de travail
            </label>
            <Select
              isMulti
              options={createOptions(modesTravailRecherche)}
              value={createOptions(modesTravailRecherche).filter((opt) =>
                (isEditing
                  ? editedPreferences.modeTravailRecherche
                  : preferences.modeTravailRecherche || []
                ).includes(opt.value)
              )}
              onChange={handleModeTravailChange}
              isDisabled={!isEditing}
              placeholder="Sélectionnez les modes de travail..."
              styles={customStyles}
              noOptionsMessage={() => "Aucune option disponible"}
              closeMenuOnSelect={false}
              classNamePrefix="react-select"
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
            {((isEditing
              ? editedPreferences.modeTravailRecherche
              : preferences.modeTravailRecherche) || []
            ).length === 0 && (
              <p className="text-xs text-gray-500 italic">
                Aucun mode de travail sélectionné
              </p>
            )}
          </div>

          {/* Villes avec react-select */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Villes souhaitées
            </label>
            <Select
              isMulti
              options={createOptions(villes)}
              value={createOptions(villes).filter((opt) =>
                (isEditing
                  ? editedPreferences.villesTravailRecherche
                  : preferences.villesTravailRecherche || []
                ).includes(opt.value)
              )}
              onChange={handleVillesChange}
              isDisabled={!isEditing}
              placeholder="Sélectionnez les villes..."
              styles={customStyles}
              noOptionsMessage={() => "Aucune option disponible"}
              closeMenuOnSelect={false}
              classNamePrefix="react-select"
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
            {((isEditing
              ? editedPreferences.villesTravailRecherche
              : preferences.villesTravailRecherche) || []
            ).length === 0 && (
              <p className="text-xs text-gray-500 italic">
                Aucune ville sélectionnée
              </p>
            )}
          </div>

          {/* Langues */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Compétences linguistiques
              </h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {(isEditing ? editedLanguages : languesData).length} langue(s)
              </span>
            </div>

            <div className="space-y-3">
              {(isEditing ? editedLanguages : languesData).length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                  <Languages className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 font-medium">
                    Aucune langue ajoutée
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Ajoutez vos compétences linguistiques ci-dessous
                  </p>
                </div>
              ) : (
                (isEditing ? editedLanguages : languesData).map((langue, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <label className="text-xs font-medium text-gray-600">
                        Langue
                      </label>
                      {isEditing ? (
                      <Select
                        options={createOptions(getAvailableLanguages().concat(langue.nom ? [langue.nom] : []))}
                        value={langue.nom ? { value: langue.nom, label: langue.nom } : null}
                        onChange={(option) => updateLanguageName(index, option?.value || "")}
                        placeholder="Choisir une langue"
                        styles={customStyles}
                        isClearable
                        classNamePrefix="react-select"
                        menuPortalTarget={document.body}
                         menuPosition="fixed"
                      />
                      ) : (
                        <div className="h-10 flex items-center px-3 bg-white border border-gray-200 rounded-md text-sm">
                          {langue.nom}
                        </div>
                      )}
                    </div>

                    <div className="sm:w-48 space-y-2">
                      <label className="text-xs font-medium text-gray-600">
                        Niveau
                      </label>
                      {isEditing ? (
                        <Select
                          options={createOptions(niveauxLangue)}
                          value={
                            langue.niveau
                              ? { value: langue.niveau, label: langue.niveau }
                              : null
                          }
                          onChange={(option) =>
                            updateLanguageLevel(index, option?.value || "")
                          }
                          placeholder="Choisir un niveau"
                          styles={customStyles}
                          isClearable
                          classNamePrefix="react-select"
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                        />
                      ) : (
                        <div className="h-10 flex items-center px-3 bg-white border border-gray-200 rounded-md text-sm">
                          {langue.niveau}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => isEditing && removeLanguage(index)}
                      disabled={!isEditing}
                      className={`flex-shrink-0 w-full sm:w-10 h-10 flex items-center justify-center rounded-md mt-6 ${
                        isEditing
                          ? "text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sm:hidden ml-2">Supprimer</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Ajouter une langue */}
            {isEditing && (
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Ajouter une nouvelle langue
                </h4>
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                  <div className="flex-1 w-full space-y-2">
                    <label className="text-xs font-medium text-gray-600">
                      Langue
                    </label>
                     <Select
                    options={createOptions(getAvailableLanguages())}
                    value={
                      newLanguageName
                        ? { value: newLanguageName, label: newLanguageName }
                        : null
                    }
                    onChange={(option) => setNewLanguageName(option?.value || "")}
                    placeholder="Sélectionnez une langue..."
                    styles={customStyles}
                    isClearable
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                  />
                  </div>

                  <div className="sm:w-48 w-full space-y-2">
                    <label className="text-xs font-medium text-gray-600">
                      Niveau
                    </label>
                    <Select
                      options={createOptions(niveauxLangue)}
                      value={
                        newLanguageLevel
                          ? { value: newLanguageLevel, label: newLanguageLevel }
                          : null
                      }
                      onChange={(option) =>
                        setNewLanguageLevel(option?.value || "")
                      }
                      placeholder="Sélectionnez ..."
                      styles={customStyles}
                      isClearable
                      classNamePrefix="react-select"
                      menuPortalTarget={document.body}
                      menuPosition="fixed"

                    />
                  </div>

                  <button
                    onClick={addLanguage}
                    disabled={!newLanguageName.trim() || !newLanguageLevel}
                    className={`h-10 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors w-full sm:w-auto ${
                      !newLanguageName.trim() || !newLanguageLevel
                        ? "border border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50"
                        : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-white"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}