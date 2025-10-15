import { Candidat } from '@/app/types/DataFormDataRegister';
import React from 'react';

interface Option {
  value: string;
  label: string;
}

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
  const specialisations: Option[] = [
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

  const niveauExperience: Option[] = [
    { value: 'etudiant', label: 'Étudiant en Droit' },
    { value: 'junior', label: 'Junior (0-2 ans)' },
    { value: 'confirme', label: 'Confirmé (3-7 ans)' },
    { value: 'senior', label: 'Senior (8-15 ans)' },
    { value: 'expert', label: 'Expert (15+ ans)' },
  ];

  const formationJuridique: Option[] = [
    { value: 'licence', label: 'Licence en Droit' },
    { value: 'master1', label: 'Master 1 Droit' },
    { value: 'master2', label: 'Master 2 Droit' },
    { value: 'capa', label: "CAPA (Certificat d'Aptitude)" },
    { value: 'doctorat', label: 'Doctorat en Droit' },
    { value: 'autre', label: 'Autre formation juridique' },
  ];

  const langues: Option[] = [
    { value: 'francais', label: 'Français' },
    { value: 'anglais', label: 'Anglais' },
    { value: 'espagnol', label: 'Espagnol' },
    { value: 'allemand', label: 'Allemand' },
    { value: 'italien', label: 'Italien' },
    { value: 'arabe', label: 'Arabe' },

  ];


  // Type de travail recherché
  const typeTravailRechercheOptions = [
    { value: 'stage', label: 'Stage' },
    { value: 'stage_preembauche', label: 'Stage préembauche' },
    { value: 'embauche', label: 'Embauche' },
  ];

  // Villes du Maroc
  const villesTravailRechercheOptions = [
    { value: 'casablanca', label: 'Casablanca' },
    { value: 'rabat', label: 'Rabat' },
    { value: 'marrakech', label: 'Marrakech' },
    { value: 'fes', label: 'Fès' },
    { value: 'tanger', label: 'Tanger' },
    { value: 'agadir', label: 'Agadir' },
    { value: 'meknes', label: 'Meknès' },
    { value: 'oujda', label: 'Oujda' },
    { value: 'tetouan', label: 'Tétouan' },
    { value: 'el_jadida', label: 'El Jadida' },
    { value: 'nador', label: 'Nador' },
    { value: 'kenitra', label: 'Kénitra' },
    { value: 'safi', label: 'Safi' },
    { value: 'berkane', label: 'Berkane' },
    { value: 'beni_mellal', label: 'Béni Mellal' },
    { value: 'essaouira', label: 'Essaouira' },
    { value: 'larache', label: 'Larache' },
    { value: 'khouribga', label: 'Khouribga' },
    { value: 'taza', label: 'Taza' },
    { value: 'errachidia', label: 'Errachidia' },
  ];

  // Mode de travail recherché
  const modeTravailRechercheOptions = [
    { value: 'sur_site', label: 'Sur site' },
    { value: 'teletravail', label: 'Télétravail' },
    { value: 'hybride', label: 'Hybride' },
  ];


  const domainExperiences: Option[] = [
    { value: 'banque-finance', label: 'Banque & Finance' },
    { value: 'technologie-numerique', label: 'Technologie & Numérique' },
    { value: 'sante-pharmaceutique', label: 'Santé & Pharmaceutique' },
    { value: 'energie-environnement', label: 'Énergie & Environnement' },
    { value: 'immobilier-construction', label: 'Immobilier & Construction' },
    { value: 'commerce-distribution', label: 'Commerce & Distribution' },
    { value: 'industrie-manufacturing', label: 'Industrie & Manufacturing' },
    { value: 'transport-logistique', label: 'Transport & Logistique' },
    { value: 'medias-communication', label: 'Médias & Communication' },
    { value: 'education-formation', label: 'Éducation & Formation' },
    { value: 'conseil-services', label: 'Conseil & Services' },
    { value: 'secteur-public', label: 'Secteur Public' }
  ];



  /*
  const industries = [
    { id: 'banking', label: 'Banque & Finance', icon: 'CreditCard' },
    { id: 'technology', label: 'Technologie & Numérique', icon: 'Smartphone' },
    { id: 'healthcare', label: 'Santé & Pharmaceutique', icon: 'Heart' },
    { id: 'energy', label: 'Énergie & Environnement', icon: 'Zap' },
    { id: 'real_estate', label: 'Immobilier & Construction', icon: 'Home' },
    { id: 'retail', label: 'Commerce & Distribution', icon: 'ShoppingCart' },
    { id: 'manufacturing', label: 'Industrie & Manufacturing', icon: 'Factory' },
    { id: 'transport', label: 'Transport & Logistique', icon: 'Truck' },
    { id: 'media', label: 'Médias & Communication', icon: 'Radio' },
    { id: 'education', label: 'Éducation & Formation', icon: 'BookOpen' },
    { id: 'consulting', label: 'Conseil & Services', icon: 'Users' },
    { id: 'public_sector', label: 'Secteur Public', icon: 'Building' }
  ];
  */








  const postes: Option[] = [
    { value: 'avocat', label: 'Avocat' },
    { value: 'juriste', label: 'Juriste' },
    { value: 'assistant-juridique', label: 'Assistant Juridique' },
    { value: 'conseil-juridique', label: 'Conseil Juridique' },
  ];
  /*
  
    value: 'Avocat',
    label: 'Avocat'
  [
      {
        id: 'lawyer',
        title: 'Avocat',
        description: 'Professionnel du droit inscrit au barreau',
        icon: 'Scale',
        requirements: ['Diplôme en droit', 'Inscription au barreau', 'Expérience en cabinet']
      },
      {
        id: 'paralegal',
        title: 'Juriste',
        description: 'Spécialiste juridique en entreprise ou cabinet',
        icon: 'FileText',
        requirements: ['Formation juridique', 'Expérience pratique', 'Spécialisation sectorielle']
      },
      {
        id: 'legal_assistant',
        title: 'Assistant Juridique',
        description: 'Support administratif et technique juridique',
        icon: 'Users',
        requirements: ['Formation administrative', 'Connaissance procédures', 'Outils bureautiques']
      },
      {
        id: 'legal_counsel',
        title: 'Conseil Juridique',
        description: 'Consultant en droit des affaires',
        icon: 'Briefcase',
        requirements: ['Expertise sectorielle', 'Conseil stratégique', 'Relations clients']
      }
    ];
  */
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
            {niveauExperience.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
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
            {formationJuridique.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
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
            <option key={opt.value} value={opt.value}>
              {opt.label}
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
              <option key={opt.value} value={opt.value}>
                {opt.label}
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



      {/* --- CHECKBOXES ---
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
      </div> */}

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
            <option key={opt.value} value={opt.value}>
              {opt.label}
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
          {domainExperiences.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
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
          {typeTravailRechercheOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
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
          {modeTravailRechercheOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
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
          {villesTravailRechercheOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
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
