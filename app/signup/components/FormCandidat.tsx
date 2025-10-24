import { Candidat } from '@/app/types/DataFormDataRegister';
import React from 'react';
import {
  specialisations,
  niveauxExperience,
  formationsJuridiques,
  langues,
  typesTravailRecherche,
  villes,
  modesTravailRecherche,
  domainesExperience,
  postes,
} from "@/app/constants/options";


interface CandidateFieldsProps {
  formData: Candidat;
  onFieldChange: (field: keyof Candidat, value: any) => void;
  errors: Partial<Record<keyof Candidat, string>>;
  className?: string;
}

const CandidateFields: React.FC<CandidateFieldsProps> = ({
  formData,
  onFieldChange,
  errors = {},
  className = '',
}) => {


  // // Supprimer un élément d'un tableau dans formData
  // const handleRemoveItem = (field: keyof typeof formData, value: string) => {
  //   const current = Array.isArray(formData[field]) ? formData[field] : [];
  //   handleChange(
  //     field,
  //     current.filter((item: string) => item !== value)
  //   );
  // };


  const handleChange = (field: string, value: any) => {
    onFieldChange(field as any, value);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* --- HEADER --- */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Profil professionnel
        </h3>
        <p className="text-sm text-gray-500">
          Complétez votre profil pour améliorer vos chances de matching
        </p>
      </div>

      {/* --- EXPÉRIENCE ET FORMATION --- */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Niveau d'expérience */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Niveau d'expérience *
          </label>
          <select
            value={formData.niveauExperience || ''}
            onChange={(e) => handleChange('niveauExperience', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            required
          >
            <option value="">Sélectionnez votre niveau</option>
            {niveauxExperience.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.niveauExperience && (
            <p className="text-xs text-red-500 mt-1">{errors.niveauExperience}</p>
          )}
        </div>

        {/* Formation juridique */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Formation juridique *
          </label>
          <select
            value={formData.formationJuridique || ''}
            onChange={(e) => handleChange('formationJuridique', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            required
          >
            <option value="">Votre niveau d'études</option>
            {formationsJuridiques.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.formationJuridique && (
            <p className="text-xs text-red-500 mt-1">{errors.formationJuridique}</p>
          )}
        </div>
      </div>

      {/* --- SPÉCIALISATIONS --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Spécialisations juridiques *
        </label>
        <p className="text-xs text-gray-500 mb-1">
          Sélectionnez vos domaines d'expertise (plusieurs choix possibles)
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {specialisations.map((opt) => {
            const isChecked = (formData.specialisations || []).includes(opt);
            return (
              <label
                key={opt}
                className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-colors duration-200
            ${isChecked
                    ? "bg-blue-600 text-white border-blue-700 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    const current = Array.isArray(formData.specialisations)
                      ? formData.specialisations
                      : [];
                    if (isChecked) {
                      handleChange(
                        "specialisations",
                        current.filter((s) => s !== opt)
                      );
                    } else {
                      handleChange("specialisations", [...current, opt]);
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium">{opt}</span>
              </label>
            );
          })}
        </div>

        {/* Message d'erreur */}
        {errors.specialisations && (
          <p className="text-xs text-red-500 mt-1">
            {errors.specialisations}
          </p>
        )}

        {/* Liste des spécialités sélectionnées */}
        {formData.specialisations?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.specialisations.map((item) => (
              <div
                key={item}
                className="flex items-center bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() =>
                    handleChange(
                      "specialisations",
                      (formData.specialisations || []).filter(
                        (s) => s !== item
                      )
                    )
                  }
                  className="ml-2 text-blue-500 hover:text-red-600 transition-colors duration-150 font-bold"
                  aria-label={`Supprimer ${item}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>



      {/* --- LANGUES --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Langues parlées *
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Cochez les langues que vous maîtrisez, puis indiquez votre niveau
        </p>

        {/* Liste de langues à cocher */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {langues.map((opt) => {
            const isSelected = formData.langues.some((l) => l.nom === opt);

            return (
              <label
                key={opt}
                className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition-colors duration-200 ${isSelected
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {
                    const current = [...formData.langues];
                    if (isSelected) {
                      // Supprimer la langue décochée
                      handleChange(
                        "langues",
                        current.filter((l) => l.nom !== opt)
                      );
                    } else {
                      // Ajouter une nouvelle langue avec niveau vide
                      handleChange("langues", [...current, { nom: opt, niveau: "" }]);
                    }
                  }}
                  className="w-4 h-4 accent-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium">{opt}</span>
              </label>
            );
          })}
        </div>

        {/* Champs de niveau pour chaque langue sélectionnée */}
        {formData.langues.length > 0 && (
          <div className="mt-3 space-y-3">
            {formData.langues.map((lang, index) => (
              <div
                key={lang.nom}
                className="p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau de {lang.nom.charAt(0).toUpperCase() + lang.nom.slice(1)}
                </label>
                <select
                  value={lang.niveau}
                  onChange={(e) => {
                    const updatedLangues = [...formData.langues];
                    updatedLangues[index].niveau = e.target.value;
                    handleChange("langues", updatedLangues);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Sélectionnez le niveau</option>
                  {["A1", "A2", "B1", "B2", "C1", "C2"].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>




      {/* Poste recherché */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Poste recherché *
        </label>
        <select
          value={formData.PosteRecherche || ''}
          onChange={(e) => handleChange('PosteRecherche', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        >
          <option value="">Sélectionnez un poste</option>
          {postes.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.PosteRecherche && (
          <p className="text-xs text-red-500 mt-1">{errors.PosteRecherche}</p>
        )}
      </div>

      {/* Domaine d'expérience */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Domaine d'expérience *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {domainesExperience.map((opt) => {
            const isChecked = (formData.domainExperiences || []).includes(opt);
            return (
              <label
                key={opt}
                className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-colors duration-200
            ${isChecked
                    ? "bg-blue-600 text-white border-blue-700 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    const current = Array.isArray(formData.domainExperiences)
                      ? formData.domainExperiences
                      : [];
                    if (isChecked) {
                      handleChange(
                        "domainExperiences",
                        current.filter((s) => s !== opt)
                      );
                    } else {
                      handleChange("domainExperiences", [...current, opt]);
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium">{opt}</span>
              </label>
            );
          })}
        </div>

        {/* Message d'erreur */}
        {errors.domainExperiences && (
          <p className="text-xs text-red-500 mt-1">
            {errors.domainExperiences}
          </p>
        )}

        {/* Liste des domaines sélectionnées */}
        {formData.domainExperiences?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.domainExperiences.map((item) => (
              <div
                key={item}
                className="flex items-center bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() =>
                    handleChange(
                      "domainExperiences",
                      (formData.domainExperiences || []).filter(
                        (s) => s !== item
                      )
                    )
                  }
                  className="ml-2 text-blue-500 hover:text-red-600 transition-colors duration-150 font-bold"
                  aria-label={`Supprimer ${item}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Type de travail recherché */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Type de travail recherché *
        </label>
        <select
          value={formData.typeTravailRecherche || ''}
          onChange={(e) => handleChange('typeTravailRecherche', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        >
          <option value="">Sélectionnez un type</option>
          {typesTravailRecherche.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.typeTravailRecherche && (
          <p className="text-xs text-red-500 mt-1">{errors.typeTravailRecherche}</p>
        )}

      </div>

      {/* Mode de travail recherché */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mode de travail recherché *
        </label>
        <select
          value={formData.modeTravailRecherche || ''}
          onChange={(e) => handleChange('modeTravailRecherche', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        >
          <option value="">Sélectionnez un mode</option>
          {modesTravailRecherche.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.modeTravailRecherche && (
          <p className="text-xs text-red-500 mt-1">{errors.modeTravailRecherche}</p>
        )}
      </div>

      {/* Villes souhaitées (avec cases à cocher stylisées) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Villes souhaitées *
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {villes.map((opt) => {
            const isChecked = (formData.villesTravailRecherche || []).includes(opt);
            return (
              <label
                key={opt}
                className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-colors duration-200
            ${isChecked
                    ? "bg-blue-600 text-white border-blue-700 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    const current = Array.isArray(formData.villesTravailRecherche)
                      ? formData.villesTravailRecherche
                      : [];
                    if (isChecked) {
                      handleChange(
                        "villesTravailRecherche",
                        current.filter((s) => s !== opt)
                      );
                    } else {
                      handleChange("villesTravailRecherche", [...current, opt]);
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium">{opt}</span>
              </label>
            );
          })}
        </div>

        {/* Message d'erreur */}
        {errors.villesTravailRecherche && (
          <p className="text-xs text-red-500 mt-1">
            {errors.villesTravailRecherche}
          </p>
        )}

        {/* Liste des villes sélectionnées */}
        {formData.villesTravailRecherche?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.villesTravailRecherche.map((item) => (
              <div
                key={item}
                className="flex items-center bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm font-medium shadow-sm"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() =>
                    handleChange(
                      "villesTravailRecherche",
                      (formData.villesTravailRecherche || []).filter(
                        (s) => s !== item
                      )
                    )
                  }
                  className="ml-2 text-blue-500 hover:text-red-600 transition-colors duration-150 font-bold"
                  aria-label={`Supprimer ${item}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>



    </div>
  );
};

export default CandidateFields;
