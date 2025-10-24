"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
import type Demande from "@/app/types/Demande";
import Icon from "../../../../signup/components/FormularIcons";

import Step1Infos from "./Step1Infos";
import Step2Details from "./Step2Details";
import Step3Langues from "./Step3Langues";
import Step4Confirmation from "./Step4Confirmation";

type FormData = Omit<Demande, "_id" | "statut" | "createdAt" | "updatedAt">;

interface MultiStepFormDemandeProps {
  onSuccess: () => void;
}

const MultiStepFormDemande: React.FC<MultiStepFormDemandeProps> = ({ onSuccess }) => {
  const { fetchWithAuth } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    titre: "",
    description: "",
    posteRecherche: [],
    niveauExperience: [],
    typeTravail: [],
    modeTravail: [],
    villesTravail: [],
    formationJuridique: [],
    specialisations: [],
    domainExperiences: [],
    langues: [],
  });

  const handleNext = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const validateForm = (): boolean => {
    if (!formData.titre.trim()) {
      setError("Le titre est requis");
      return false;
    }
    if (formData.posteRecherche.length === 0) {
      setError("Veuillez sélectionner au moins un poste");
      return false;
    }
    if (formData.niveauExperience.length === 0) {
      setError("Veuillez sélectionner au moins un niveau d'expérience");
      return false;
    }
    if (formData.typeTravail.length === 0) {
      setError("Veuillez sélectionner au moins un type de travail");
      return false;
    }
    if (formData.modeTravail.length === 0) {
      setError("Veuillez sélectionner au moins un mode de travail");
      return false;
    }
    if (formData.formationJuridique.length === 0) {
      setError("Veuillez sélectionner au moins une formation juridique");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetchWithAuth("/demandes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Erreur lors de la création de la demande");
      }

      onSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
      console.error("Erreur soumission :", err);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, label: "Informations", icon: "FileText" },
    { id: 2, label: "Détails", icon: "Settings" },
    { id: 3, label: "Langues", icon: "Globe" },
    { id: 4, label: "Confirmation", icon: "ClipboardCheck" },
  ];

  const totalSteps = steps.length;

  const getStepStatus = (id: number) => {
    if (id < step) return "completed";
    if (id === step) return "current";
    return "upcoming";
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

  const getConnectorClasses = (id: number) => {
    return id < step ? "bg-black h-1" : "bg-gray-200 h-1";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-100 rounded-2xl shadow-sm p-8 bg-white max-w-3xl mx-auto"
    >
      {/* Barre d'étapes stylée */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-center">
          {steps.map((st, index) => {
            const status = getStepStatus(st.id);
            const isLast = index === totalSteps - 1;

            return (
              <div key={st.id} className="flex items-center">
                {/* Icône et label */}
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStepClasses(
                      status
                    )}`}
                  >
                    {status === "completed" ? (
                      <Icon name="Check" size={22} />
                    ) : (
                      <Icon name={st.icon as any} size={22} />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium mt-3 text-center ${status === "current"
                      ? "text-black"
                      : status === "completed"
                        ? "text-gray-600"
                        : "text-gray-400"
                      }`}
                  >
                    {st.label}
                  </span>
                </div>

                {/* Ligne de connexion */}
                {!isLast && (
                  <div className="w-16 h-0.5 mx-4 transition-all duration-300 rounded-full bg-gray-300 relative">
                    <div
                      className={`absolute top-0 left-0 h-full transition-all duration-300 rounded-full ${getConnectorClasses(
                        st.id
                      )}`}
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>


        {/* Barre de progression */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progression</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Étape active */}
      {
        [
          <Step1Infos key="1" data={formData} onNext={handleNext} />,
          <Step2Details key="2" data={formData} onNext={handleNext} onPrev={handlePrev} />,
          <Step3Langues key="3" data={formData} onNext={handleNext} onPrev={handlePrev} />,
          <Step4Confirmation
            key="4"
            data={formData}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />,
        ][step - 1]
      }
    </motion.div >
  );
};

export default MultiStepFormDemande;
