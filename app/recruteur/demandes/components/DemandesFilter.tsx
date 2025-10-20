"use client";

import React, { useState } from "react";
import { Filter, XCircle, ChevronDown, ChevronUp, RotateCcw, EyeOff, Eye } from "lucide-react";
import Select from "react-select";
import {
  niveauxExperience,
  villes,
  specialisations,
  formationsJuridiques,
  modesTravailRecherche,
  domainesExperience,
} from "@/app/constants/options";

interface DemandesFilterProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const DemandesFilter: React.FC<DemandesFilterProps> = ({ onFilterChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [filters, setFilters] = useState({
    titre: "",
    statut: "",
    niveauExperience: [] as string[],
    villesTravail: [] as string[],
    specialisations: [] as string[],
    formationJuridique: [] as string[],
    modeTravail: [] as string[],
    domainExperiences: [] as string[],
  });

  const handleChange = (name: string, value: string | string[]) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const reset = {
      titre: "",
      statut: "",
      niveauExperience: [],
      villesTravail: [],
      specialisations: [],
      formationJuridique: [],
      modeTravail: [],
      domainExperiences: [],
    };
    setFilters(reset);
    onFilterChange(reset);
  };

  const hasActiveFilters = Object.values(filters).some((val) =>
    Array.isArray(val) ? val.length > 0 : val !== ""
  );

  const toOptions = (arr: string[]) => arr.map((v) => ({ value: v, label: v }));

  return (
  
<div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl shadow-lg mb-8">
  {/* En-tête */}
  <div className="bg-white border-b border-gray-100 px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Titre et icône principale */}
      <div className="flex items-center gap-3">
        <div className="bg-black p-2 rounded-xl">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Filtres de recherche</h3>
          <p className="text-xs text-gray-500">Affinez vos résultats</p>
        </div>
      </div>

      {/* Boutons icônes */}
      <div className="flex items-center gap-4">
        {/* Réinitialiser */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex flex-col items-center text-gray-600 hover:text-black transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5 mb-1" />
            <span className="text-[11px] font-medium">Réinitialiser</span>
          </button>
        )}

        {/* Afficher / Masquer */}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="flex flex-col items-center text-gray-600 hover:text-black transition-all duration-300"
        >
          {isVisible ? (
            <>
              <EyeOff className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium">Masquer</span>
            </>
          ) : (
            <>
              <Eye className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium">Afficher</span>
            </>
          )}
        </button>
      </div>
    </div>
  </div>


      {/* Contenu des filtres */}
      {isVisible && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Titre */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Titre du poste
              </label>
              <input
                type="text"
                name="titre"
                value={filters.titre}
                onChange={(e) => handleChange("titre", e.target.value)}
                placeholder="Ex: Avocat senior..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-[11px] text-sm 
                           focus:border-black focus:outline-none transition-all duration-300 
                           bg-white hover:border-gray-300 placeholder-gray-400"
              />
            </div>

            {/* Statut */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Statut
              </label>
              <Select
                name="statut"
                options={toOptions(["ouverte", "fermee"])}
                value={
                  filters.statut
                    ? { value: filters.statut, label: filters.statut }
                    : null
                }
                onChange={(selectedOption) =>
                  handleChange("statut", selectedOption ? selectedOption.value : "")
                }
                placeholder="Sélectionnez..."
                className="text-sm"
              />
            </div>

            {/* Niveaux d'expérience */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Niveau d'expérience
              </label>
              <Select
                isMulti
                name="niveauExperience"
                options={toOptions(niveauxExperience)}
                value={filters.niveauExperience.map((v) => ({ value: v, label: v }))}
                onChange={(selected) =>
                  handleChange(
                    "niveauExperience",
                    selected ? selected.map((opt) => opt.value) : []
                  )
                }
                placeholder="Sélectionnez..."
                className="text-sm"
              />
            </div>

            {/* Villes */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Villes
              </label>
              <Select
                isMulti
                name="villesTravail"
                options={toOptions(villes)}
                value={filters.villesTravail.map((v) => ({ value: v, label: v }))}
                onChange={(selected) =>
                  handleChange(
                    "villesTravail",
                    selected ? selected.map((opt) => opt.value) : []
                  )
                }
                placeholder="Sélectionnez..."
                className="text-sm"
              />
            </div>

            {/* Spécialisations */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Spécialisations
              </label>
              <Select
                isMulti
                name="specialisations"
                options={toOptions(specialisations)}
                value={filters.specialisations.map((v) => ({ value: v, label: v }))}
                onChange={(selected) =>
                  handleChange(
                    "specialisations",
                    selected ? selected.map((opt) => opt.value) : []
                  )
                }
                placeholder="Sélectionnez..."
                className="text-sm"
              />
            </div>

            {/* Formation juridique */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Formation juridique
              </label>
              <Select
                isMulti
                name="formationJuridique"
                options={toOptions(formationsJuridiques)}
                value={filters.formationJuridique.map((v) => ({ value: v, label: v }))}
                onChange={(selected) =>
                  handleChange(
                    "formationJuridique",
                    selected ? selected.map((opt) => opt.value) : []
                  )
                }
                placeholder="Sélectionnez..."
                className="text-sm"
              />
            </div>

            {/* Mode de travail */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Mode de travail
              </label>
              <Select
                isMulti
                name="modeTravail"
                options={toOptions(modesTravailRecherche)}
                value={filters.modeTravail.map((v) => ({ value: v, label: v }))}
                onChange={(selected) =>
                  handleChange(
                    "modeTravail",
                    selected ? selected.map((opt) => opt.value) : []
                  )
                }
                placeholder="Sélectionnez..."
                className="text-sm"
              />
            </div>

            {/* Domaines d'expérience */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Domaines d'expérience
              </label>
              <Select
                isMulti
                name="domainExperiences"
                options={toOptions(domainesExperience)}
                value={filters.domainExperiences.map((v) => ({ value: v, label: v }))}
                onChange={(selected) =>
                  handleChange(
                    "domainExperiences",
                    selected ? selected.map((opt) => opt.value) : []
                  )
                }
                placeholder="Sélectionnez..."
                className="text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandesFilter;