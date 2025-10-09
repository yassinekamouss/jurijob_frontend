import { useState } from "react";
import {
  Edit2,
  Check,
  X,
  GraduationCap,
  Scale,
  Briefcase,
  Plus,
  Trash2,
} from "lucide-react";
import { ProfessionalInfo } from "@/app/types/professionalInfo";

interface ProfessionalInfoSectionProps {
  data: ProfessionalInfo;
  onSave: (data: ProfessionalInfo) => void;
}

export function ProfessionalInfoSection({ data, onSave }: ProfessionalInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const [newSpecialisation, setNewSpecialisation] = useState("");
  const [newDomain, setNewDomain] = useState("");

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(data);
    setIsEditing(false);
    setNewSpecialisation("");
    setNewDomain("");
  };

  const addSpecialisation = () => {
    if (newSpecialisation.trim()) {
      setEditedData((prevData) => ({
        ...prevData,
        specialisations: [...prevData.specialisations, newSpecialisation.trim()],
      }));
      setNewSpecialisation("");
    }
  };

  const removeSpecialisation = (index: number) => {
    setEditedData((prevData) => ({
      ...prevData,
      specialisations: prevData.specialisations.filter((_, i) => i !== index),
    }));
  };

  const addDomain = () => {
    if (newDomain.trim()) {
      setEditedData((prevData) => ({
        ...prevData,
        domainExperiences: [...prevData.domainExperiences, newDomain.trim()],
      }));
      setNewDomain("");
    }
  };

  const removeDomain = (index: number) => {
    setEditedData((prevData) => ({
      ...prevData,
      domainExperiences: prevData.domainExperiences.filter((_, i) => i !== index),
    }));
  };

  const renderInfoItem = (icon: React.ReactNode, label: string, value: string) => (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-black">{value || "—"}</p>
    </div>
  );

  const renderListItem = (icon: React.ReactNode, label: string, items: string[]) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="px-2 py-1 text-sm border border-gray-300 rounded-md text-gray-800 bg-gray-50"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  const renderInputField = (
    label: string,
    id: string,
    value: string,
    placeholder: string,
    onChange: (v: string) => void
  ) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-gray-700 text-sm">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-gray-900 outline-none transition"
      />
    </div>
  );

  const renderSelectField = (
    label: string,
    id: string,
    value: string,
    onChange: (v: string) => void,
    options: string[]
  ) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-gray-700 text-sm">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-gray-900 outline-none transition bg-white"
      >
        <option value="">Sélectionner...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const renderEditableList = (
    label: string,
    items: string[],
    newItem: string,
    setNewItem: (v: string) => void,
    addItem: () => void,
    removeItem: (index: number) => void,
    placeholder: string
  ) => (
    <div className="space-y-3 pt-4 border-t border-gray-200">
      <label className="text-gray-700 text-sm">{label}</label>
      <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-3 bg-gray-50 rounded-lg border border-gray-200">
        {items.length === 0 ? (
          <span className="text-sm text-gray-400">Aucun élément ajouté</span>
        ) : (
          items.map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-400 rounded-md bg-white hover:bg-gray-100"
            >
              {item}
              <button
                onClick={() => removeItem(index)}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </span>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:border-gray-900 outline-none transition"
        />
        <button
          onClick={addItem}
          className="flex items-center gap-1 px-3 py-2 border border-gray-900 rounded-md text-sm hover:bg-gray-900 hover:text-white transition"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-white border-l-4 border-black shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-black font-medium">Informations professionnelles</h2>
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

      <div className="p-6">
        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInfoItem(
              <Briefcase className="h-4 w-4" />,
              "Poste actuel",
              data.posteActuel
            )}
            {renderInfoItem(
              <GraduationCap className="h-4 w-4" />,
              "Formation juridique",
              data.formationJuridique
            )}
            {renderInfoItem(
              <Briefcase className="h-4 w-4" />,
              "Niveau d'expérience",
              data.niveauExperience
            )}
            {renderListItem(
              <Scale className="h-4 w-4" />,
              "Spécialisations",
              data.specialisations
            )}
            {renderListItem(
              <Briefcase className="h-4 w-4" />,
              "Domaines d'expérience",
              data.domainExperiences
            )}
          </div>
        ) : (
          <div className="space-y-7 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {renderInputField(
                "Poste actuel",
                "posteActuel",
                editedData.posteActuel,
                "ex. Juriste d'entreprise",
                (v) => setEditedData({ ...editedData, posteActuel: v })
              )}

              {renderInputField(
                "Formation juridique",
                "formation",
                editedData.formationJuridique,
                "ex. Master en Droit",
                (v) => setEditedData({ ...editedData, formationJuridique: v })
              )}

              {renderSelectField(
                "Niveau d'expérience",
                "niveau",
                editedData.niveauExperience,
                (v) => setEditedData({ ...editedData, niveauExperience: v }),
                ["Débutant", "Junior", "Intermédiaire", "Senior", "Expert"]
              )}
            </div>

            {renderEditableList(
              "Spécialisations",
              editedData.specialisations,
              newSpecialisation,
              setNewSpecialisation,
              addSpecialisation,
              removeSpecialisation,
              "ex. Droit des affaires"
            )}

            {renderEditableList(
              "Domaines d'expérience",
              editedData.domainExperiences,
              newDomain,
              setNewDomain,
              addDomain,
              removeDomain,
              "ex. Corporate Law"
            )}
          </div>
        )}
      </div>
    </section>
  );
}