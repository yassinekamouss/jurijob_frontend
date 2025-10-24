"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
import type Demande from "@/app/types/Demande";

import Step1Infos from "./Step1Infos";
import Step2Details from "./Step2Details";
import Step3Langues from "./Step3Langues";
import Step4Confirmation from "./Step4Confirmation";

type FormData = Omit<Demande, "_id" | "statut"  | "createdAt" | "updatedAt">;

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
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-200 rounded-2xl shadow-sm p-6 bg-white"
    >
      {/* Indicateur de progression */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-colors ${
                    step > s ? "bg-black" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>Informations</span>
          <span>Détails</span>
          <span>Langues</span>
          <span>Confirmation</span>
        </div>
      </div>

      {steps[step - 1]}
    </motion.div>
  );
};

export default MultiStepFormDemande;