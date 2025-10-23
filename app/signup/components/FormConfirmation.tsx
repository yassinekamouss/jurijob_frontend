"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type FormData from "@/app/types/DataFormDataRegister";
import CustomModal from "@/app/components/CustomModal";

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
    // Affiche le chargement pendant l’envoi
    setModal((prev) => ({
      ...prev,
      isOpen: true,
      showLoading: true,
      title: "Création du compte...",
      message: "Veuillez patienter pendant l’envoi de vos informations.",
    }));

    try {
      await onSubmit();

      // ✅ Succès → on désactive le chargement et on affiche le message
      setModal({
        isOpen: true,
        showLoading: false,
        type: "success",
        title: "Compte créé avec succès !",
        message: "Vous pouvez maintenant vous connecter avec vos identifiants.",
      });
    } catch (error: any) {
      // ❌ Erreur → idem mais avec message d’erreur
      setModal({
        isOpen: true,
        showLoading: false,
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

      {/* ✅ Infos de l’utilisateur */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h3 className="font-semibold text-lg mb-3 border-b pb-1">Infos de votre compte</h3>

        {/* 🖼️ Afficher l'image en premier */}
        {formData.user.imageUrl && (
          <div className="flex flex-col items-center mb-4">
            <img
              src={
                formData.user.imageUrl instanceof File
                  ? URL.createObjectURL(formData.user.imageUrl)
                  : formData.user.imageUrl
              }
              alt="Photo de profil"
              className="w-28 h-28 object-cover rounded-full border-2 border-gray-300 shadow-sm"
            />
            <span className="mt-2 text-sm text-gray-600 font-medium">
              Photo de profil
            </span>
          </div>
        )}

        {/* 🧾 Autres informations */}
        <ul className="space-y-1">
          {Object.keys(formData.user)
            .filter((field) => field !== "imageUrl") // ⬅️ on exclut imageUrl
            .map((field) => {
              const value = (formData.user as any)[field];
              return (
                <li key={field} className="flex justify-between">
                  <span className="font-medium capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </span>
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

      {/* ✅ Modal */}
      <CustomModal
        isOpen={modal.isOpen}
        type={modal.type}
        showLoading={modal.showLoading}
        title={modal.title}
        message={modal.message}
        onClose={handleModalClose}
        confirmText={modal.type === "success" ? "Je me connecte" : "Fermer"}
      />
    </div>
  );
};

export default FormConfirmation;
