import { useState } from "react";
import Select from "react-select";
import {
  Edit2,
  Check,
  X,
  Scale,
  Briefcase,
} from "lucide-react";
import { ProfessionalInfo } from "@/app/types/professionalInfo";
import {
  niveauxExperience,
  specialisations,
  domainesExperience,
} from "@/app/constants/options";

interface ProfessionalInfoSectionProps {
  data: ProfessionalInfo;
  onSave: (data: ProfessionalInfo) => void;
}

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
    borderRadius: "0.375rem",
    padding: "0.125rem",
    borderColor: state.isFocused ? "#000" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #000" : "none",
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
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#111827",
    fontWeight: "500",
    fontSize: "0.875rem",
  }),
  multiValueRemove: (base: any, state: any) => ({
    ...base,
    color: "#6b7280",
    "&:hover": {
      backgroundColor: state.isDisabled ? "#f3f4f6" : "#e5e7eb",
      color: "#111827",
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
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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

export function ProfessionalInfoSection({
  data,
  onSave,
}: ProfessionalInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(data);
    setIsEditing(false);
  };

  const handleSpecialisationsChange = (selectedOptions: readonly OptionType[] | null) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setEditedData({
      ...editedData,
      specialisations: values,
    });
  };

  const handleDomainsChange = (selectedOptions: readonly OptionType[] | null) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setEditedData({
      ...editedData,
      domainExperiences: values,
    });
  };

  const inputCls = (enabled: boolean) =>
    `w-full border rounded-md px-3 py-2 outline-none transition ${
      enabled
        ? "border-gray-300 focus:border-gray-900 bg-white"
        : "border-gray-200 bg-gray-50 cursor-not-allowed"
    }`;

  const selectCls = inputCls;

  return (
    <section className="bg-white border-l-4 border-black shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-black font-medium">
          Informations professionnelles
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition w-full sm:w-auto justify-center"
          >
            <Edit2 className="h-4 w-4" />
            Modifier
          </button>
        ) : (
          <div className="flex gap-3 w-full sm:w-auto flex-col sm:flex-row">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 justify-center"
            >
              <X className="h-4 w-4" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800 justify-center"
            >
              <Check className="h-4 w-4" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="space-y-7 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label htmlFor="posteActuel" className="text-gray-700 text-sm font-medium">
                Poste actuel
              </label>
              <input
                id="posteActuel"
                value={isEditing ? editedData.posteActuel : data.posteActuel}
                onChange={(e) =>
                  isEditing &&
                  setEditedData({ ...editedData, posteActuel: e.target.value })
                }
                placeholder="ex. Juriste d'entreprise"
                disabled={!isEditing}
                className={inputCls(isEditing)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="formation" className="text-gray-700 text-sm font-medium">
                Formation juridique
              </label>
              <input
                id="formation"
                value={
                  isEditing
                    ? editedData.formationJuridique
                    : data.formationJuridique
                }
                onChange={(e) =>
                  isEditing &&
                  setEditedData({
                    ...editedData,
                    formationJuridique: e.target.value,
                  })
                }
                placeholder="ex. Master en Droit"
                disabled={!isEditing}
                className={inputCls(isEditing)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="niveau" className="text-gray-700 text-sm font-medium">
                Niveau d'expérience
              </label>
              <select
                id="niveau"
                value={
                  isEditing
                    ? editedData.niveauExperience
                    : data.niveauExperience
                }
                onChange={(e) =>
                  isEditing &&
                  setEditedData({
                    ...editedData,
                    niveauExperience: e.target.value,
                  })
                }
                disabled={!isEditing}
                className={selectCls(isEditing)}
              >
                <option value="">Sélectionner...</option>
                {niveauxExperience.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Spécialisations avec react-select */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
              <Scale className="h-4 w-4" /> 
              Spécialisations
            </label>
            <Select
              isMulti
              options={createOptions(specialisations)}
              value={createOptions(specialisations).filter((opt) =>
                (isEditing ? editedData.specialisations : data.specialisations).includes(
                  opt.value
                )
              )}
              onChange={handleSpecialisationsChange}
              isDisabled={!isEditing}
              placeholder="Sélectionnez vos spécialisations..."
              styles={customStyles}
              noOptionsMessage={() => "Aucune option disponible"}
              closeMenuOnSelect={false}
              classNamePrefix="react-select"
            />
            {(isEditing ? editedData.specialisations : data.specialisations).length === 0 && (
              <p className="text-xs text-gray-500 italic">
                Aucune spécialisation sélectionnée
              </p>
            )}
          </div>

          {/* Domaines d'expérience avec react-select */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> 
              Domaines d'expérience
            </label>
            <Select
              isMulti
              options={createOptions(domainesExperience)}
              value={createOptions(domainesExperience).filter((opt) =>
                (isEditing ? editedData.domainExperiences : data.domainExperiences).includes(
                  opt.value
                )
              )}
              onChange={handleDomainsChange}
              isDisabled={!isEditing}
              placeholder="Sélectionnez vos domaines d'expérience..."
              styles={customStyles}
              noOptionsMessage={() => "Aucune option disponible"}
              closeMenuOnSelect={false}
              classNamePrefix="react-select"
            />
            {(isEditing ? editedData.domainExperiences : data.domainExperiences).length === 0 && (
              <p className="text-xs text-gray-500 italic">
                Aucun domaine d'expérience sélectionné
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}