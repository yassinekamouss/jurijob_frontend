import React from 'react';
import Icon from './FormularIcons'; // ton composant d’icônes

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator = ({ currentStep }: ProgressIndicatorProps) => {
  const steps = [
    { id: 1, label: 'Informations', icon: 'FileText' },
    { id: 2, label: 'Spécialisation', icon: 'Settings' },
    { id: 3, label: 'Confirmation', icon: 'ClipboardCheck' },
  ];

  const totalSteps = steps.length;

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-text-secondary border-border';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getConnectorClasses = (stepId: number) => {
    if (stepId < currentStep) return 'bg-black h-1'; // noir et plus épais
    return 'bg-gray-100 h-1'; // gris clair pour les étapes à venir
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-10 px-4">
      {/* Étapes avec icônes et lignes de connexion */}
      <div className="flex items-center justify-center ml-20">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isLast = index === totalSteps - 1;

          return (
            <div key={step.id} className="flex items-center  flex-1">
              {/* Cercle + label */}
              <div className="flex flex-col items-center justify-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepClasses(
                    status
                  )}`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={22} />
                  ) : (
                    <Icon name={step.icon as any} size={22} />
                  )}
                </div>
                <span
                  className={`text-sm font-medium mt-3 text-center transition-colors duration-300 ${status === 'current'
                    ? 'text-primary'
                    : status === 'completed'
                      ? 'text-success'
                      : 'text-text-secondary'
                    }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Ligne de connexion */}
              {!isLast && (
                <div className="flex-1 mx-4">
                  <div
                    className={`transition-all duration-300 rounded-full ${getConnectorClasses(
                      step.id
                    )}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Barre de progression */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Progression</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
