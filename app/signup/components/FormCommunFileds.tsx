import React, { useState } from 'react';
import Icon from './FormularIcons';
import { User } from '@/app/types/DataFormDataRegister';
// import { Candidat } from '@/app/types/candidatFormDataRegister';

interface CommonFieldsProps {

  formData: User;

  onFieldChange: (field: keyof User, value: any) => void;
  errors: Partial<Record<keyof User, string>>;
  className?: string;
}

const CommonFields: React.FC<CommonFieldsProps> = ({
  formData,
  onFieldChange,
  errors = {},
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleChange = (field: string, value: string) => {
    onFieldChange(field as any, value);
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '', bg: 'bg-gray-300' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: '', color: '', bg: 'bg-gray-300' },
      { strength: 1, label: 'Très faible', color: 'text-red-600', bg: 'bg-red-500' },
      { strength: 2, label: 'Faible', color: 'text-orange-500', bg: 'bg-orange-400' },
      { strength: 3, label: 'Moyen', color: 'text-yellow-500', bg: 'bg-yellow-400' },
      { strength: 4, label: 'Fort', color: 'text-green-600', bg: 'bg-green-500' },
      { strength: 5, label: 'Très fort', color: 'text-green-700', bg: 'bg-green-600' },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password || '');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* --- HEADER --- */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Informations personnelles
        </h3>
        <p className="text-sm text-gray-500">
          Renseignez vos informations de base pour créer votre compte
        </p>
      </div>

      {/* --- NOM / PRENOM --- */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Prénom */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            placeholder="Votre prénom"
            value={formData.prenom || ''}
            onChange={(e) => handleChange('prenom', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
          {errors.prenom && (
            <p className="text-xs text-red-500 mt-1">{errors.prenom}</p>
          )}
        </div>

        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            placeholder="Votre nom"
            value={formData.nom || ''}
            onChange={(e) => handleChange('nom', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
          {errors.nom && (
            <p className="text-xs text-red-500 mt-1">{errors.nom}</p>
          )}
        </div>
      </div>

      {/* --- EMAIL --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
        <input
          type="email"
          placeholder="votre.email@exemple.com"
          value={formData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Utilisée pour la connexion et les notifications importantes
        </p>
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* --- TELEPHONE --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
        <input
          type="tel"
          placeholder="+33 1 23 45 67 89"
          value={formData.telephone || ''}
          onChange={(e) => handleChange('telephone', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        />
        {errors.telephone && <p className="text-xs text-red-500 mt-1">{errors.telephone}</p>}
      </div>

      {/* --- MOT DE PASSE --- */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Créez un mot de passe sécurisé"
          value={formData.password || ''}
          onChange={(e) => handleChange('password', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>

        {/* Barre de force du mot de passe */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-300 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.bg}`}
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${passwordStrength.color}`}>
                {passwordStrength.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Utilisez au moins 8 caractères avec majuscules, minuscules, chiffres et symboles
            </p>
          </div>
        )}
      </div>

      {/* --- CONFIRMATION MOT DE PASSE --- */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirmez votre mot de passe"
          value={formData.confirmPassword || ''}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>

      {formData.confirmPassword && formData.confirmPassword !== formData.password && (
        <p className="text-xs text-red-500 mt-1">Les mots de passe ne correspondent pas</p>
      )}
    </div>
  );
};

export default CommonFields;
