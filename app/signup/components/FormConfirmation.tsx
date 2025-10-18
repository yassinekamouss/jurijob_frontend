"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type FormData from "@/app/types/DataFormDataRegister";
import CustomModal from "@/app/components/CustomModal"; // chemin à ajuster selon ton arborescence

interface FormConfirmationProps {
  formData: FormData;
  onSubmit: () => Promise<void>;
}

const FormConfirmation: React.FC<FormConfirmationProps> = ({ formData, onSubmit }) => {
  const router = useRouter();
  const [modal, setModal] = useState({
    isOpen: false,
    showLoading: false, 
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const handleSubmit = async () => {
    try {
      await onSubmit(); // Appel au backend
      setModal({
        isOpen: true,
        showLoading : true,
        type: "success",
        title: "Compte créé avec succès !",
        message: "Vous pouvez maintenant vous connecter avec vos identifiants.",
      });
    } catch (error: any) {
      setModal({
        isOpen: true,
        showLoading : true,
        type: "error",
        title: "Erreur lors de l’inscription",
        message: error.message || "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  const handleModalClose = () => {
    setModal({ ...modal, isOpen: false });
    if (modal.type === "success") router.push("/login");
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

            if (field === "imageUrl") {
              if (!value) return null;
              return (
                <li key={field} className="flex flex-col items-center gap-2">
                  <span className="font-medium capitalize">Photo de profil</span>
                  <img
                    src={value instanceof File ? URL.createObjectURL(value) : value}
                    alt="Aperçu de l'image"
                    className="w-24 h-24 object-cover rounded-full border"
                  />
                </li>
              );
            }

            return (
              <li key={field} className="flex justify-between">
                <span className="font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</span>
                <span>{value || "-"}</span>
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

      {/*  Modal (succès ou erreur) */}
      <CustomModal
        isOpen={modal.isOpen}
        type={modal.type}
        showLoading={true}
        title={modal.title}
        message={modal.message}
        onClose={handleModalClose}
        confirmText={modal.type === "success" ? "Je me connecte" : "Fermer"}
      />
    </div>
  );
};

export default FormConfirmation;
