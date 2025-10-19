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
        <select
          multiple
          value={formData.specialisations || []}
          onChange={(e) =>
            handleChange(
              'specialisations',
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        >
          {specialisations.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.specialisations && (
          <p className="text-xs text-red-500 mt-1">{errors.specialisations}</p>
        )}
      </div>

      {/* --- LANGUES --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Langues parlées *
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Indiquez les langues que vous maîtrisez et leur niveau
          </p>
          <select
            multiple
            value={formData.langues.map(l => l.nom) || []} // prend juste le nom
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, opt => opt.value);
              
              // Conserver les niveaux déjà choisis
              const updatedLangues = selected.map(lang => {
                const existing = formData.langues.find(l => l.nom === lang);
                return { nom: lang, niveau: existing?.niveau || '' }; // niveau vide par défaut
              });

              handleChange('langues', updatedLangues);
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          >
            {langues.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        {formData.langues.map((lang, index) => (
  <div key={lang.nom} className="mt-2">
    <label className="block text-sm font-medium text-gray-700">
      Niveau de {lang.nom.charAt(0).toUpperCase() + lang.nom.slice(1)}
    </label>
    <select
      value={lang.niveau}
      onChange={(e) => {
        const updatedLangues = [...formData.langues];
        updatedLangues[index].niveau = e.target.value;
        handleChange('langues', updatedLangues);
      }}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
    >
      <option value="">Sélectionnez le niveau</option>
      {['A1','A2','B1','B2','C1','C2'].map(n => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  </div>
))}




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
    <select
      multiple
      value={formData.domainExperiences || []}
      onChange={(e) =>
        handleChange(
          'domainExperiences',
          Array.from(e.target.selectedOptions, (opt) => opt.value)
        )
      }
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
          <option value="">Sélectionnez un domaine</option>
          {domainesExperience.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.domainExperiences && (
          <p className="text-xs text-red-500 mt-1">{errors.domainExperiences}</p>
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

      {/* Villes souhaitées */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Villes souhaitées *
        </label>
        <select
          multiple
          value={formData.villesTravailRecherche || []}
          onChange={(e) =>
            handleChange(
              'villesTravailRecherche',
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        >
          {villes.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.villesTravailRecherche && (
          <p className="text-xs text-red-500 mt-1">{errors.villesTravailRecherche}</p>
        )}
      </div>

    </div>
  );
};

export default CandidateFields;
