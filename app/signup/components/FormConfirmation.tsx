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

  const handleSubmit = () => {
    onSubmit();
    setShowModal(true);
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Vérification des informations</h2>

      {/* ✅ Infos du compte */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h3 className="font-semibold text-lg mb-3 border-b pb-1">Infos de votre compte</h3>
        <ul className="space-y-1">
          {Object.keys(formData.user).map((field) => {
            const value = (formData.user as any)[field];

            // ✅ Cas spécial pour l'image
            if (field === 'imageUrl') {
              if (!value) return null;

              return (
                <li key={field} className="flex flex-col items-center gap-2">
                  <span className="font-medium capitalize">Photo de profil</span>
                  {value instanceof File ? (
                    <img
                      src={URL.createObjectURL(value)}
                      alt="Aperçu de l'image"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  ) : (
                    <img
                      src={value}
                      alt="Image existante"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  )}
                </li>
              );
            }

            // ✅ Pour les autres champs
            return (
              <li key={field} className="flex justify-between">
                <span className="font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
                <span>{value || '-'}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ✅ Bouton Soumettre */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Soumettre
        </button>
      </div>

      {/* ✅ Modal de succès */}
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
