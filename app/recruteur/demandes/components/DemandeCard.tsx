"use client";

import React, { useState } from "react";
import { MoreVertical , Briefcase, MapPin, Clock, BookOpen, Edit2, Trash2, XCircle, Eye, CheckCircle } from "lucide-react";
import  type Demande from "@/app/types/Demande";
import { useAuth } from "@/app/context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";
import { toast } from "react-hot-toast";
import { useDemandeDetails } from "../hooks/useDemandeDetails";
import DemandeDetailsModal from "./DemandeDetailsModal";

interface DemandeCardProps extends Demande {
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>;
  onToggleStatut: (id: string, nouveauStatut: string) => Promise<{ success: boolean; message: string }>;
}


const DemandeCard: React.FC<DemandeCardProps> = ({
  _id,
  titre,
  description,
  posteRecherche,
  niveauExperience,
  typeTravail,
  modeTravail,
  villesTravail,
  formationJuridique,
  specialisations,
  domainExperiences,
  langues,
  statut,
  onDelete,
  onToggleStatut,
}) => {

  const [openDropdown, setOpenDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "edit">("delete");

const { selectedDemande, fetchDemandeDetails, setSelectedDemande } = useDemandeDetails();

const handleToggleStatut = async () => {
   setOpenDropdown(false); 
  const nouveauStatut = statut === "ouverte" ? "fermée" : "ouverte";
  const result = await onToggleStatut(_id, nouveauStatut);

  if (result.success) {
    toast.success(`Statut modifié avec succès : ${nouveauStatut}`);
  } else {
    toast.error(result.message);
  }
};


const handleVoir = () => {
  setOpenDropdown(false);

  // Récupère les détails de la demande
  fetchDemandeDetails(_id).catch((err: any) => {
    console.error("Erreur lors de la récupération des détails :", err);
    toast.error(err.message || "Erreur lors de la récupération des détails");
  });
};

const handleDelete = async () => {
  try {
    const result = await onDelete(_id);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setShowModal(false);
  } catch (error) {
    toast.error("Erreur lors de la suppression");
    console.error("Erreur suppression demande :", error);
  }
};

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 mb-6 overflow-hidden group">
      {/* En-tête avec titre, statut et actions */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2 className="font-bold text-xl text-gray-900 mb-2">{titre}</h2>
            {description && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {description.length > 40 ? description.slice(0, 40) + "..." : description}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Statut Badge */}
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                statut === "ouverte"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-gray-100 text-gray-600 border border-gray-300"
              }`}
            >
              {statut === "ouverte" ? " Ouverte" : " Fermée"}
            </span>

          
          {/* Actions Dropdown */}
<div className="relative">
  <button
    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
    onClick={() => setOpenDropdown(!openDropdown)}
    title="Actions"
  >
    <MoreVertical  className="w-5 h-5 text-gray-600" />
  </button>

  {openDropdown && (
    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
      <ul className="flex flex-col py-1">
        <li>
          <button 
           onClick={handleVoir}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 w-full rounded-lg">
            <Eye className="w-4 h-4 text-green-600" />
            Voir les détails
          </button>
        </li>
        <li>
          <button
          
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 w-full rounded-lg">
            <Edit2 className="w-4 h-4 text-blue-600" />
            Modifier
          </button>
        </li>
        <li>
          {statut === "ouverte" ? (
            <button 
            onClick={handleToggleStatut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 w-full rounded-lg">
              <XCircle className="w-4 h-4 text-orange-600" />
              Fermer
            </button>
          ) : (
            <button 
            onClick={handleToggleStatut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 w-full rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Ouvrir
            </button>
          )}
        </li>
        <li>
          <button
            onClick={() => {
              setModalType("delete");
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 w-full rounded-lg"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
            Supprimer
          </button>
        </li>

      </ul>
    </div>
  )}
</div>

          </div>
        </div>
      </div>

      {/* Corps avec informations */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Poste recherché */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Poste recherché
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {posteRecherche.length > 1 
                  ? `${posteRecherche[0]}...` 
                  : posteRecherche[0]}
              </p>
            </div>
          </div>

          {/* Niveau d'expérience */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-purple-50 rounded-xl">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Expérience requise
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {niveauExperience.length > 1 
                  ? `${niveauExperience[0]}...` 
                  : niveauExperience[0]}
              </p>
            </div>
          </div>

          {/* Formation */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-green-50 rounded-xl">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Formation juridique
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {formationJuridique.length > 1 
                  ? `${formationJuridique[0]}...` 
                  : formationJuridique[0]}
              </p>
            </div>
          </div>

          {/* Villes */}
          {villesTravail && villesTravail.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-orange-50 rounded-xl">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Localisation
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  {villesTravail.length > 1 
                    ? `${villesTravail[0]}...` 
                    : villesTravail[0]}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tags type et mode de travail */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gray-100">
          {typeTravail.length > 0 && (
            <span className="px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg text-xs font-semibold border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              {typeTravail.length > 1 ? `${typeTravail[0]}...` : typeTravail[0]}
            </span>
          )}
          {modeTravail.length > 0 && (
            <span className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200 hover:border-blue-300 transition-colors duration-200">
              {modeTravail.length > 1 ? `${modeTravail[0]}...` : modeTravail[0]}
            </span>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        title={modalType === "delete" ? "Confirmer la suppression" : "Confirmer la modification"}
        message={
          modalType === "delete"
            ? "Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible."
            : "Êtes-vous sûr de vouloir modifier cette demande ? Les changements seront enregistrés."
        }
        confirmText={modalType === "delete" ? "Supprimer" : "Modifier"}
        onConfirm={() => {
          if (modalType === "delete") handleDelete();
          // sinon tu pourras ajouter handleEdit() ici
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
        type={modalType}
      />


<DemandeDetailsModal
  isOpen={!!selectedDemande}
  demande={selectedDemande}
  onClose={() => setSelectedDemande(null)}
/>

    </div>
  );
};

export default DemandeCard;