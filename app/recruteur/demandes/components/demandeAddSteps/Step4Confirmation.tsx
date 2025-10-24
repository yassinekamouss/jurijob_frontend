import React from "react";
import { AlertCircle } from "lucide-react";
import type Demande from "@/app/types/Demande";

interface Step4ConfirmationProps {
  data: Partial<Demande>;
  onPrev: () => void;
  onSubmit: () => void;
  loading: boolean;
  error?: string;
}

const Step4Confirmation: React.FC<Step4ConfirmationProps> = ({
  data,
  onPrev,
  onSubmit,
  loading,
  error,
}) => {
  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="border-b border-gray-200 pb-4 last:border-b-0">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      {content}
    </div>
  );

  const renderList = (items: string[]) =>
    items.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-sm italic">Non spécifié</p>
    );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Confirmation</h2>
        <p className="text-sm text-gray-600">
          Vérifiez les informations avant de créer votre demande
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Erreur</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-6 space-y-4 max-h-96 overflow-y-auto">
        {renderSection(
          "Informations générales",
          <>
            <p className="text-sm">
              <strong>Titre :</strong> {data.titre || "Non spécifié"}
            </p>
            {data.description && (
              <p className="text-sm mt-2">
                <strong>Description :</strong> {data.description}
              </p>
            )}
          </>
        )}

        {renderSection("Postes recherchés", renderList(data.posteRecherche || []))}
        
        {renderSection(
          "Niveaux d'expérience",
          renderList(data.niveauExperience || [])
        )}

        {renderSection("Types de travail", renderList(data.typeTravail || []))}
        
        {renderSection("Modes de travail", renderList(data.modeTravail || []))}

        {data.villesTravail && data.villesTravail.length > 0 &&
          renderSection("Villes de travail", renderList(data.villesTravail))}

        {renderSection(
          "Formations juridiques",
          renderList(data.formationJuridique || [])
        )}

        {data.specialisations && data.specialisations.length > 0 &&
          renderSection("Spécialisations", renderList(data.specialisations))}

        {data.domainExperiences && data.domainExperiences.length > 0 &&
          renderSection(
            "Domaines d'expérience",
            renderList(data.domainExperiences)
          )}

        {data.langues && data.langues.length > 0 &&
          renderSection(
            "Langues",
            <div className="space-y-2">
              {data.langues.map((lang, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                    {lang.nom}
                  </span>
                  <span className="text-sm text-gray-600">
                    Niveau: {lang.niveau}
                  </span>
                </div>
              ))}
            </div>
          )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          disabled={loading}
          className="border border-gray-300 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Retour
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="bg-black text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      Création en cours...
        </>
      ) : (
      "Créer la demande"
      )}
      </button>
      </div>
      </div>
      );
      };
      
export default Step4Confirmation;