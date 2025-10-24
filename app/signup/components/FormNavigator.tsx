"use client";
import { useState, ReactNode } from "react";
import ProgressIndicator from "./ProgressionIndicator";

interface NavigatorFormProps {
  children: (currentStep: number) => ReactNode;
  onNextStep: (currentStep: number) => boolean; // ✅ fonction de validation
}

export default function NavigatorForm({
  children,
  onNextStep,
}: NavigatorFormProps) {
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
      <div className="w-full max-w-2xl bg-card border border-border rounded-xl p-6 shadow-md mt-2">
        {children(currentStep)}
      </div>

      {/* ✅ Boutons de navigation */}
      <div className="flex justify-between w-full max-w-2xl mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-lg transition-all ${
            currentStep === 1
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-secondary text-secondary-foreground hover:opacity-90"
          }`}>
          Précédent
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep === 3}
          className={`px-4 py-2 rounded-lg transition-all ${
            currentStep === 3
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}>
          Suivant
        </button>
      </div>
    </div>
  );
}
