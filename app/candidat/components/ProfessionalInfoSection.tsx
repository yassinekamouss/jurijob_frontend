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

export function ProfessionalInfoSection({
  data,
  onSave,
}: ProfessionalInfoSectionProps) {
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
        specialisations: [
          ...prevData.specialisations,
          newSpecialisation.trim(),
        ],
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
      domainExperiences: prevData.domainExperiences.filter(
        (_, i) => i !== index
      ),
    }));
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
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition w-full sm:w-auto justify-center">
            <Edit2 className="h-4 w-4" />
            Modifier
          </button>
        ) : (
          <div className="flex gap-3 w-full sm:w-auto flex-col sm:flex-row">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 justify-center">
              <X className="h-4 w-4" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800 justify-center">
              <Check className="h-4 w-4" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Form-style view with disabled fields when not editing */}
        <div className="space-y-7 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label htmlFor="posteActuel" className="text-gray-700 text-sm">
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
              <label htmlFor="formation" className="text-gray-700 text-sm">
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
              <label htmlFor="niveau" className="text-gray-700 text-sm">
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
                className={selectCls(isEditing)}>
                <option value="">Sélectionner...</option>
                {[
                  "Débutant",
                  "Junior",
                  "Intermédiaire",
                  "Senior",
                  "Expert",
                ].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Spécialisations */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <label className="text-gray-700 text-sm flex items-center gap-2">
              <Scale className="h-4 w-4" /> Spécialisations
            </label>
            <div
              className={`flex flex-wrap gap-2 min-h-[2.5rem] p-3 rounded-lg border ${
                isEditing
                  ? "bg-gray-50 border-gray-200"
                  : "bg-gray-50 border-gray-200"
              }`}>
              {(
                (isEditing
                  ? editedData.specialisations
                  : data.specialisations) || []
              ).length === 0 ? (
                <span className="text-sm text-gray-400">
                  Aucun élément ajouté
                </span>
              ) : (
                (isEditing
                  ? editedData.specialisations
                  : data.specialisations
                ).map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-400 rounded-md bg-white hover:bg-gray-100">
                    {item}
                    <button
                      onClick={() => isEditing && removeSpecialisation(index)}
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
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                value={newSpecialisation}
                onChange={(e) =>
                  isEditing && setNewSpecialisation(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    isEditing && addSpecialisation();
                  }
                }}
                placeholder="ex. Droit des affaires"
                disabled={!isEditing}
                className={inputCls(isEditing)}
              />
              <button
                onClick={addSpecialisation}
                disabled={!isEditing || !newSpecialisation.trim()}
                className={`flex items-center gap-1 px-3 py-2 border rounded-md text-sm ${
                  !isEditing || !newSpecialisation.trim()
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                } justify-center`}>
                <Plus className="h-4 w-4" />
                Ajouter
              </button>
            </div>
          </div>

          {/* Domaines d'expérience */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <label className="text-gray-700 text-sm flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Domaines d'expérience
            </label>
            <div
              className={`flex flex-wrap gap-2 min-h-[2.5rem] p-3 rounded-lg border ${
                isEditing
                  ? "bg-gray-50 border-gray-200"
                  : "bg-gray-50 border-gray-200"
              }`}>
              {(
                (isEditing
                  ? editedData.domainExperiences
                  : data.domainExperiences) || []
              ).length === 0 ? (
                <span className="text-sm text-gray-400">
                  Aucun élément ajouté
                </span>
              ) : (
                (isEditing
                  ? editedData.domainExperiences
                  : data.domainExperiences
                ).map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 text-sm border border-gray-400 rounded-md bg-white hover:bg-gray-100">
                    {item}
                    <button
                      onClick={() => isEditing && removeDomain(index)}
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
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                value={newDomain}
                onChange={(e) => isEditing && setNewDomain(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    isEditing && addDomain();
                  }
                }}
                placeholder="ex. Corporate Law"
                disabled={!isEditing}
                className={inputCls(isEditing)}
              />
              <button
                onClick={addDomain}
                disabled={!isEditing || !newDomain.trim()}
                className={`flex items-center gap-1 px-3 py-2 border rounded-md text-sm ${
                  !isEditing || !newDomain.trim()
                    ? "border-gray-300 text-gray-400 cursor-not-allowed"
                    : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                } justify-center`}>
                <Plus className="h-4 w-4" />
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
