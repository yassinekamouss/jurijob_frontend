'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type FormData from '@/app/types/DataFormDataRegister';
interface FormConfirmationProps {
  formData: FormData;
  onSubmit: () => void;
}

const FormConfirmation: React.FC<FormConfirmationProps> = ({ formData, onSubmit }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  // Champs
  // const personalFields = ['firstName', 'lastName', 'email', 'phone', 'password'];
  // const professionalFields = ['experienceLevel', 'educationLevel', 'specializations', 'languages', 'openToOpportunities', 'remoteWork'];

  const handleSubmit = () => {
    onSubmit();          // Optionnel : appeler ton backend
    setShowModal(true);  // Afficher le modal
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirige vers page login
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Vérification des informations</h2>

      {/* Infos du compte */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h3 className="font-semibold text-lg mb-3 border-b pb-1">Infos de votre compte</h3>
        <ul className="space-y-1">
          {Object.keys(formData.user).map((field) => (
            <li key={field} className="flex justify-between">
              <span className="font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
              <span>{(formData.user as any)[field] || '-'}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Infos professionnelles
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h3 className="font-semibold text-lg mb-3 border-b pb-1">Infos professionnelles</h3>
        <ul className="space-y-1">
          {professionalFields.map((field) => (
            <li key={field} className="flex justify-between">
              <span className="font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
              <span>{formData[field] || '-'}</span>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Bouton Soumettre */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Soumettre
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Compte créé avec succès !</h2>
            <p className="mb-6">Vous pouvez maintenant vous connecter avec vos identifiants.</p>
            <button
              onClick={handleLoginRedirect}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Je me connecte
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormConfirmation;
