import React, { useState } from "react";
import Select from "react-select";
import { Trash2, Plus } from "lucide-react";
import type Demande from "@/app/types/Demande";
import { langues, niveauxLangue } from "@/app/constants/options";

interface Step3LanguesProps {
  data: Partial<Demande>;
  onNext: (data: Partial<Demande>) => void;
  onPrev: () => void;
}

interface OptionType {
  value: string;
  label: string;
}

const createOptions = (items: string[]): OptionType[] =>
  items.map((item) => ({ value: item, label: item }));

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderRadius: "0.75rem",
    padding: "0.125rem",
    borderColor: state.isFocused ? "#000" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px #000" : "none",
    "&:hover": {
      borderColor: "#000",
    },
  }),
};

const Step3Langues: React.FC<Step3LanguesProps> = ({ data, onNext, onPrev }) => {
  const [languesList, setLanguesList] = useState<{ nom: string; niveau: string }[]>(
    data.langues && data.langues.length > 0 ? data.langues : []
  );

  const handleAddLangue = () => {
    setLanguesList([...languesList, { nom: "", niveau: "" }]);
  };

  const handleRemoveLangue = (index: number) => {
    setLanguesList(languesList.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    key: "nom" | "niveau",
    value: string
  ) => {
    const updated = [...languesList];
    updated[index][key] = value;
    setLanguesList(updated);
  };

  const handleNext = () => {
    // Filtrer les langues vides
    const validLangues = languesList.filter(
      (lang) => lang.nom.trim() !== "" && lang.niveau.trim() !== ""
    );
    onNext({ langues: validLangues });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Langues requises</h2>
        <p className="text-sm text-gray-600">
          Ajoutez les langues souhaitées pour ce poste (optionnel)
        </p>
      </div>

      <div className="space-y-4">
        {languesList.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-500 mb-4">Aucune langue ajoutée</p>
            <button
              onClick={handleAddLangue}
              className="text-black underline font-medium hover:no-underline"
            >
              + Ajouter une langue
            </button>
          </div>
        ) : (
          languesList.map((lang, index) => (
            <div
              key={index}
              className="flex gap-3 items-start p-4 border border-gray-200 rounded-xl bg-gray-50"
            >
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">
                    Langue
                  </label>
                  <Select
                    options={createOptions(langues)}
                    value={
                      lang.nom
                        ? { value: lang.nom, label: lang.nom }
                        : null
                    }
                    onChange={(option) =>
                      handleChange(index, "nom", option?.value || "")
                    }
                    placeholder="Choisir une langue"
                    styles={customStyles}
                    isClearable
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-700">
                    Niveau
                  </label>
                  <Select
                    options={createOptions(niveauxLangue)}
                    value={
                      lang.niveau
                        ? { value: lang.niveau, label: lang.niveau }
                        : null
                    }
                    onChange={(option) =>
                      handleChange(index, "niveau", option?.value || "")
                    }
                    placeholder="Choisir un niveau"
                    styles={customStyles}
                    isClearable
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemoveLangue(index)}
                className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {languesList.length > 0 && (
        <button
          onClick={handleAddLangue}
          className="flex items-center gap-2 text-sm text-black font-medium hover:underline"
        >
          <Plus className="w-4 h-4" />
          Ajouter une autre langue
        </button>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          className="border border-gray-300 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-medium"
        >
          Retour
        </button>
        <button
          onClick={handleNext}
          className="bg-black text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-colors font-medium"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step3Langues;