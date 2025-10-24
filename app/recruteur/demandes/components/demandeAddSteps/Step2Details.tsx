import React, { useState } from "react";
import Select from "react-select";
import type Demande from "@/app/types/Demande";
import {
  postes,
  niveauxExperience,
  typesTravailRecherche,
  modesTravailRecherche,
  villes,
  formationsJuridiques,
  specialisations,
  domainesExperience,
} from "@/app/constants/options";

interface Step2DetailsProps {
  data: Partial<Demande>;
  onNext: (data: Partial<Demande>) => void;
  onPrev: () => void;
}

interface OptionType {
  value: string;
  label: string;
}

const createOptions = (items: string[]): OptionType[] =>
  items.map((item) => ({ value: item, label: item }));

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderRadius: "0.75rem",
    padding: "0.25rem",
    borderColor: state.isFocused ? "#000" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px #000" : "none",
    "&:hover": {
      borderColor: "#000",
    },
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#f3f4f6",
    borderRadius: "0.5rem",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#111827",
    fontWeight: "500",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#6b7280",
    "&:hover": {
      backgroundColor: "#e5e7eb",
      color: "#111827",
    },
  }),
};

const Step2Details: React.FC<Step2DetailsProps> = ({ data, onNext, onPrev }) => {
  const [formValues, setFormValues] = useState({
    posteRecherche: data.posteRecherche || [],
    niveauExperience: data.niveauExperience || [],
    typeTravail: data.typeTravail || [],
    modeTravail: data.modeTravail || [],
    villesTravail: data.villesTravail || [],
    formationJuridique: data.formationJuridique || [],
    specialisations: data.specialisations || [],
    domainExperiences: data.domainExperiences || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formValues.posteRecherche.length === 0) {
      newErrors.posteRecherche = "Sélectionnez au moins un poste";
    }
    if (formValues.niveauExperience.length === 0) {
      newErrors.niveauExperience = "Sélectionnez au moins un niveau d'expérience";
    }
    if (formValues.typeTravail.length === 0) {
      newErrors.typeTravail = "Sélectionnez au moins un type de travail";
    }
    if (formValues.modeTravail.length === 0) {
      newErrors.modeTravail = "Sélectionnez au moins un mode de travail";
    }
    if (formValues.formationJuridique.length === 0) {
      newErrors.formationJuridique = "Sélectionnez au moins une formation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext(formValues);
    }
  };

  const handleSelectChange = (field: keyof typeof formValues) => (
    selectedOptions: readonly OptionType[] | null
  ) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setFormValues((prev) => ({ ...prev, [field]: values }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const renderSelect = (
    label: string,
    field: keyof typeof formValues,
    options: string[],
    required = false,
    placeholder = "Sélectionnez..."
  ) => (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        isMulti
        options={createOptions(options)}
        value={createOptions(options).filter((opt) =>
          formValues[field].includes(opt.value)
        )}
        onChange={handleSelectChange(field)}
        placeholder={placeholder}
        styles={customStyles}
        className={errors[field] ? "border-2 border-red-500 rounded-xl" : ""}
        noOptionsMessage={() => "Aucune option disponible"}
      />
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Détails du poste</h2>
        <p className="text-sm text-gray-600">
          Précisez les critères de recherche pour votre demande
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderSelect("Postes recherchés", "posteRecherche", postes, true, "Sélectionnez les postes")}
        {renderSelect("Niveaux d'expérience", "niveauExperience", niveauxExperience, true, "Sélectionnez les niveaux")}
        {renderSelect("Types de travail", "typeTravail", typesTravailRecherche, true, "Stage, Embauche...")}
        {renderSelect("Modes de travail", "modeTravail", modesTravailRecherche, true, "Présentiel, Télétravail...")}
        {renderSelect("Villes de travail", "villesTravail", villes, false, "Sélectionnez les villes")}
        {renderSelect("Formations juridiques", "formationJuridique", formationsJuridiques, true, "Sélectionnez les formations")}
        {renderSelect("Spécialisations", "specialisations", specialisations, false, "Sélectionnez les spécialisations")}
        {renderSelect("Domaines d'expérience", "domainExperiences", domainesExperience, false, "Sélectionnez les domaines")}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          className="border border-gray-300 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-medium"
        >
          Retour
        </button>
        <button
          onClick={handleNext}
          className="bg-black text-white px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-colors font-medium"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step2Details;