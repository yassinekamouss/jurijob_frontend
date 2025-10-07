'use client';
import { useState, ReactNode } from "react";
import ProgressIndicator from './ProgressionIndicator';


interface NavigatorFormProps {
  children: (currentStep: number) => ReactNode;
  onNextStep: (currentStep: number) => boolean; // ✅ fonction de validation
}

export default function NavigatorForm({ children, onNextStep }: NavigatorFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    // Demander au parent si on peut avancer
    const canGoNext = onNextStep(currentStep);
    if (!canGoNext) return;

    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* ✅ Indicateur de progression */}
      <ProgressIndicator currentStep={currentStep} />

      {/* ✅ Contenu dynamique (selon l’étape actuelle) */}
      <div className="w-full max-w-xl bg-white border border-gray-300 rounded-xl p-6 shadow-md mt-4">
        {children(currentStep)}
      </div>

      {/* ✅ Boutons de navigation */}
      <div className="flex justify-between w-full max-w-xl mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 border rounded-lg ${currentStep === 1
            ? 'text-gray-400 border-gray-300 cursor-not-allowed'
            : 'text-black border-black hover:bg-black hover:text-white'
            } transition-all`}
        >
          Précédent
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === 3}
          className={`px-4 py-2 border rounded-lg ${currentStep === 3
            ? 'text-gray-400 border-gray-300 cursor-not-allowed'
            : 'text-black border-black hover:bg-black hover:text-white'
            } transition-all`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}