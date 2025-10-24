import React, { useState } from "react";
import type Demande from "@/app/types/Demande";

interface Step1InfosProps {
  data: Partial<Demande>;
  onNext: (data: Partial<Demande>) => void;
}

const Step1Infos: React.FC<Step1InfosProps> = ({ data, onNext }) => {
  const [titre, setTitre] = useState(data.titre || "");
  const [description, setDescription] = useState(data.description || "");
  const [errors, setErrors] = useState<{ titre?: string; description?: string }>({});

  const validate = (): boolean => {
    const newErrors: { titre?: string; description?: string } = {};

    if (!titre.trim()) {
      newErrors.titre = "Le titre est requis";
    }

    if (description && description.length > 1000) {
      newErrors.description = "La description ne peut pas dépasser 1000 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext({ titre: titre.trim(), description: description.trim() });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Informations générales</h2>
        <p className="text-sm text-gray-600">
          Commencez par donner un titre et une description à votre demande
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Titre de la demande <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={titre}
          onChange={(e) => {
            setTitre(e.target.value);
            if (errors.titre) setErrors({ ...errors, titre: undefined });
          }}
          className={`w-full border rounded-xl p-3 transition-colors ${
            errors.titre ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black`}
          placeholder="Ex: Recherche avocat spécialisé en droit des affaires"
          maxLength={150}
        />
        {errors.titre && (
          <p className="text-red-500 text-sm mt-1">{errors.titre}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">{titre.length}/150 caractères</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors({ ...errors, description: undefined });
          }}
          className={`w-full border rounded-xl p-3 transition-colors ${
            errors.description ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-black`}
          rows={6}
          placeholder="Décrivez en détail votre besoin, le contexte, et vos attentes..."
          maxLength={1000}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">{description.length}/1000 caractères</p>
      </div>

      <div className="flex justify-end">
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

export default Step1Infos;