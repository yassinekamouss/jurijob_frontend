import React from "react";
import { X, Briefcase, Clock, MapPin, BookOpen, Globe, Award, Building2, Calendar } from "lucide-react";
import type Demande from "@/app/types/Demande";

interface DemandeDetailsModalProps {
  isOpen: boolean;
  demande: Demande | null;
  onClose: () => void;
}

const DemandeDetailsModal: React.FC<DemandeDetailsModalProps> = ({
  isOpen,
  demande,
  onClose,
}) => {
  if (!isOpen || !demande) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 ">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="pr-12">
            <h2 className="text-3xl font-bold mb-3">{demande.titre}</h2>
            {demande.description && (
              <p className="text-gray-300 text-base leading-relaxed">
                {demande.description}
              </p>
            )}
          </div>

          {/* Statut Badge */}
          <div className="mt-4">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                demande.statut === "ouverte"
                  ? "bg-white text-gray-900"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {demande.statut === "ouverte" ? "Ouverte" : "Fermée"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="space-y-8">
            {/* Section 1: Informations principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Poste recherché */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-900">
                  <Briefcase className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Poste recherché</h3>
                </div>
                <div className="pl-7">
                  {demande.posteRecherche.map((poste, index) => (
                    <div
                      key={index}
                      className="mb-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-800"
                    >
                      {poste}
                    </div>
                  ))}
                </div>
              </div>

              {/* Niveau d'expérience */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-900">
                  <Clock className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Niveau d'expérience</h3>
                </div>
                <div className="pl-7">
                  {demande.niveauExperience.map((niveau, index) => (
                    <div
                      key={index}
                      className="mb-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-800"
                    >
                      {niveau}
                    </div>
                  ))}
                </div>
              </div>

              {/* Formation juridique */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-900">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Formation juridique</h3>
                </div>
                <div className="pl-7">
                  {demande.formationJuridique.map((formation, index) => (
                    <div
                      key={index}
                      className="mb-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-800"
                    >
                      {formation}
                    </div>
                  ))}
                </div>
              </div>

              {/* Villes de travail */}
              {demande.villesTravail && demande.villesTravail.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-900">
                    <MapPin className="w-5 h-5" />
                    <h3 className="font-bold text-lg">Localisation</h3>
                  </div>
                  <div className="pl-7">
                    {demande.villesTravail.map((ville, index) => (
                      <div
                        key={index}
                        className="mb-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-800"
                      >
                        {ville}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Section 2: Type et mode de travail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type de travail */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-900">
                  <Building2 className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Type de travail</h3>
                </div>
                <div className="pl-7 flex flex-wrap gap-2">
                  {demande.typeTravail.map((type, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mode de travail */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-900">
                  <Globe className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Mode de travail</h3>
                </div>
                <div className="pl-7 flex flex-wrap gap-2">
                  {demande.modeTravail.map((mode, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Section 3: Compétences et spécialisations */}
            {((demande.specialisations && demande.specialisations.length > 0) || (demande.domainExperiences && demande.domainExperiences.length > 0)) && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Spécialisations */}
                  {demande.specialisations && demande.specialisations.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-900">
                        <Award className="w-5 h-5" />
                        <h3 className="font-bold text-lg">Spécialisations</h3>
                      </div>
                      <div className="pl-7 space-y-2">
                        {demande.specialisations.map((spec, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-700 flex items-center"
                          >
                            <span className="w-2 h-2 bg-gray-900 rounded-full mr-3"></span>
                            {spec}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Domaines d'expérience */}
                  {demande.domainExperiences && demande.domainExperiences.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-900">
                        <Briefcase className="w-5 h-5" />
                        <h3 className="font-bold text-lg">Domaines d'expérience</h3>
                      </div>
                      <div className="pl-7 space-y-2">
                        {demande.domainExperiences.map((domaine, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-700 flex items-center"
                          >
                            <span className="w-2 h-2 bg-gray-900 rounded-full mr-3"></span>
                            {domaine}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>
              </>
            )}

            {/* Section 4: Langues */}
            {demande.langues && demande.langues.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-900">
                  <Globe className="w-5 h-5" />
                  <h3 className="font-bold text-lg">Langues requises</h3>
                </div>
                <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {demande.langues.map((langue, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 bg-gray-50 border-l-4 border-gray-900 rounded-lg"
                    >
                      <div className="font-semibold text-gray-900 text-sm">
                        {langue.nom}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {langue.niveau}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-8 py-5">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                Demande de recrutement
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandeDetailsModal;