import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface CandidateFieldsProps {
  formData: Record<string, any>;
  onFieldChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
  className?: string;
}

const CandidateFields: React.FC<CandidateFieldsProps> = ({
  formData,
  onFieldChange,
  errors = {},
  className = '',
}) => {
  const specializations: Option[] = [
    { value: 'droit-affaires', label: 'Droit des Affaires' },
    { value: 'droit-social', label: 'Droit Social' },
    { value: 'droit-fiscal', label: 'Droit Fiscal' },
    { value: 'droit-immobilier', label: 'Droit Immobilier' },
    { value: 'droit-penal', label: 'Droit Pénal' },
    { value: 'droit-famille', label: 'Droit de la Famille' },
    { value: 'droit-public', label: 'Droit Public' },
    { value: 'droit-international', label: 'Droit International' },
    { value: 'propriete-intellectuelle', label: 'Propriété Intellectuelle' },
    { value: 'droit-environnement', label: "Droit de l'Environnement" },
  ];

  const experienceLevels: Option[] = [
    { value: 'etudiant', label: 'Étudiant en Droit' },
    { value: 'junior', label: 'Junior (0-2 ans)' },
    { value: 'confirme', label: 'Confirmé (3-7 ans)' },
    { value: 'senior', label: 'Senior (8-15 ans)' },
    { value: 'expert', label: 'Expert (15+ ans)' },
  ];

  const educationLevels: Option[] = [
    { value: 'licence', label: 'Licence en Droit' },
    { value: 'master1', label: 'Master 1 Droit' },
    { value: 'master2', label: 'Master 2 Droit' },
    { value: 'capa', label: "CAPA (Certificat d'Aptitude)" },
    { value: 'doctorat', label: 'Doctorat en Droit' },
    { value: 'autre', label: 'Autre formation juridique' },
  ];

  const languages: Option[] = [
    { value: 'francais', label: 'Français' },
    { value: 'anglais', label: 'Anglais' },
    { value: 'espagnol', label: 'Espagnol' },
    { value: 'allemand', label: 'Allemand' },
    { value: 'italien', label: 'Italien' },
    { value: 'arabe', label: 'Arabe' },
  ];

  const handleChange = (field: string, value: any) => {
    onFieldChange(field, value);
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
            value={formData.experienceLevel || ''}
            onChange={(e) => handleChange('experienceLevel', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            required
          >
            <option value="">Sélectionnez votre niveau</option>
            {experienceLevels.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.experienceLevel && (
            <p className="text-xs text-red-500 mt-1">{errors.experienceLevel}</p>
          )}
        </div>

        {/* Formation juridique */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Formation juridique *
          </label>
          <select
            value={formData.educationLevel || ''}
            onChange={(e) => handleChange('educationLevel', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            required
          >
            <option value="">Votre niveau d'études</option>
            {educationLevels.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.educationLevel && (
            <p className="text-xs text-red-500 mt-1">{errors.educationLevel}</p>
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
          value={formData.specializations || []}
          onChange={(e) =>
            handleChange(
              'specializations',
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        >
          {specializations.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.specializations && (
          <p className="text-xs text-red-500 mt-1">{errors.specializations}</p>
        )}
      </div>

      {/* --- LANGUES --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Langues parlées
        </label>
        <p className="text-xs text-gray-500 mb-1">
          Indiquez les langues que vous maîtrisez
        </p>
        <select
          multiple
          value={formData.languages || []}
          onChange={(e) =>
            handleChange(
              'languages',
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
        >
          {languages.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* --- CHECKBOXES --- */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Préférences de recherche</h4>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              name: 'openToOpportunities',
              label: 'Ouvert aux opportunités',
              description: 'Recevoir des propositions de recruteurs',
            },
            {
              name: 'activelySearching',
              label: 'Recherche active',
              description: "Actuellement en recherche d'emploi",
            },
            {
              name: 'remoteWork',
              label: 'Télétravail accepté',
              description: 'Ouvert au travail à distance',
            },
            {
              name: 'geographicalMobility',
              label: 'Mobilité géographique',
              description: 'Prêt à déménager pour un poste',
            },
          ].map((checkbox) => (
            <label
              key={checkbox.name}
              className="flex items-start space-x-3 border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <input
                type="checkbox"
                checked={!!formData[checkbox.name]}
                onChange={(e) =>
                  handleChange(checkbox.name, e.target.checked)
                }
                className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black"
              />
              <div>
                <span className="text-sm font-medium text-gray-800">
                  {checkbox.label}
                </span>
                <p className="text-xs text-gray-500">{checkbox.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateFields;
