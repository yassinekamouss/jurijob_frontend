import React from 'react';
import { Recruteur } from '@/app/types/DataFormDataRegister';

type Option = {
  value: string;
  label: string;
};



type Errors = {
  [key: string]: string | undefined;
};

// type RecruiterFieldsProps = {
//   formData: FormData;
//   onFieldChange: (field: keyof FormData, value: any) => void;
//   errors?: Errors;
//   className?: string;
// };
interface RecruiterFieldsProps {
  formData: Recruteur;
  onFieldChange: (field: keyof Recruteur, value: any) => void;
  errors: Partial<Record<keyof Recruteur, string>>;
  className?: string;
}

const RecruiterFields: React.FC<RecruiterFieldsProps> = ({
  formData,
  onFieldChange,
  errors = {},
  className = '',
}) => {
  const typeOrganisation: Option[] = [
    { value: 'cabinet-avocat', label: "Cabinet d'Avocats" },
    { value: 'entreprise', label: "Service Juridique d'Entreprise" },
    { value: 'cabinet-recrutement', label: 'Cabinet de Recrutement' },
    { value: 'administration', label: 'Administration Publique' },
    { value: 'association', label: 'Association/ONG' },
    { value: 'startup', label: 'Startup/Scale-up' },
    { value: 'autre', label: 'Autre' },
  ];

  const tailleEntreprise: Option[] = [
    { value: '1-10', label: '1-10 employés' },
    { value: '11-50', label: '11-50 employés' },
    { value: '51-200', label: '51-200 employés' },
    { value: '201-500', label: '201-500 employés' },
    { value: '501-1000', label: '501-1000 employés' },
    { value: '1000+', label: 'Plus de 1000 employés' },
  ];

  const recruitmentFocus: Option[] = [
    { value: 'avocats', label: 'Avocats' },
    { value: 'juristes', label: "Juristes d'Entreprise" },
    { value: 'paralegaux', label: 'Paralegaux' },
    { value: 'assistants-juridiques', label: 'Assistants Juridiques' },
    { value: 'notaires', label: 'Notaires' },
    { value: 'huissiers', label: 'Huissiers' },
    { value: 'compliance', label: 'Compliance Officers' },
    { value: 'stagiaires', label: 'Stagiaires en Droit' },
  ];
  const ville : Option []= [
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


  const handleChange = (field: string, value: any) => {
    onFieldChange(field as any, value);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Informations entreprise
        </h3>
        <p className="text-sm text-gray-600">
          Renseignez les détails de votre organisation pour optimiser vos recherches
        </p>
      </div>

      {/* Nom entreprise et poste */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-800">
            Nom de l'entreprise *
          </label>
          <input
            type="text"
            placeholder="Nom de votre organisation"
            value={formData.nomEntreprise || ''}
            onChange={(e) => handleChange('nomEntreprise', e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
            required
          />
          {errors.nomEntreprise && <p className="text-red-500 text-sm">{errors.nomEntreprise}</p>}
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-800">
            Votre poste *
          </label>
          <input
            type="text"
            placeholder="Ex: Responsable RH, Directeur Juridique"
            value={formData.position || ''}
            onChange={(e) => handleChange('position', e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
            required
          />
          {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
        </div> */}
      </div>

      {/* Type et taille */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-800">
            Type d'organisation *
          </label>
          <select
            value={formData.typeOrganisation || ''}
            onChange={(e) => handleChange('typeOrganisation', e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
            required
          >
            <option value="">Sélectionnez le type</option>
            {typeOrganisation.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.typeOrganisation && <p className="text-red-500 text-sm">{errors.typeOrganisation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">
            Taille de l'entreprise *
          </label>
          <select
            value={formData.tailleEntreprise || ''}
            onChange={(e) => handleChange('tailleEntreprise', e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
            required
          >
            <option value="">Nombre d'employés</option>
            {tailleEntreprise.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.tailleEntreprise && <p className="text-red-500 text-sm">{errors.tailleEntreprise}</p>}
        </div>
      </div>

      {/* Site web */}
      <div>
        <label className="block text-sm font-medium text-gray-800">
          Site web de l'entreprise
        </label>
        <input
          type="url"
          placeholder="https://www.votre-entreprise.com"
          value={formData.siteWeb || ''}
          onChange={(e) => handleChange('siteWeb', e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2"
        />
        <p className="text-gray-500 text-sm">Optionnel - Aide à valider votre profil</p>
      </div>

      {/* Ville et Code postal */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-800">Ville *</label>
          <input
            type="text"
            placeholder="Paris, Lyon, Marseille..."
            value={formData.ville || ''}
            onChange={(e) => handleChange('ville', e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800">Code postal *</label>
          <input
            type="text"
            placeholder="75001"
            value={formData.codePostal || ''}
            onChange={(e) => handleChange('codePostal', e.target.value)}
            className="border border-gray-300 rounded-md w-full p-2"
            required
          />
        </div>
      </div>

      {/* Profils recherchés */}
      {/* <div>
        <label className="block text-sm font-medium text-gray-800">
          Profils recherchés *
        </label>
        <select
          multiple
          value={formData.recrutementFocus || []}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
            handleChange('recrutementFocus', values);
          }}
          className="border border-gray-300 rounded-md w-full p-2 h-32"
          required
        >
          {recrutementFocus.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <p className="text-gray-500 text-sm">
          Types de profils que vous recrutez habituellement
        </p>
      </div> */}

      {/* Préférences de recrutement */}
      {/* <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Préférences de recrutement</h4>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.recrutementUrgent || false}
              onChange={(e) => handleChange('recrutementUrgent', e.target.checked)}
            />
            <span>Recrutement urgent</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.profilsInternationaux || false}
              onChange={(e) => handleChange('profilsInternationaux', e.target.checked)}
            />
            <span>Profils internationaux</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.remotePositions || false}
              onChange={(e) => handleChange('remotePositions', e.target.checked)}
            />
            <span>Télétravail proposé</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.internships || false}
              onChange={(e) => handleChange('internships', e.target.checked)}
            />
            <span>Stages et alternances</span>
          </label>
        </div>
      </div> */}
    </div>
  );
};

export default RecruiterFields;
