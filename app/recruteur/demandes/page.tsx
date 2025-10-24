"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DemandesList from "./components/DemandesList";
import DemandesFilter from "./components/DemandesFilter";
import { Plus, ArrowLeft } from "lucide-react";
import MultiStepFormDemande from "./components/demandeAddSteps/MultiStepFormDemande";

const Page = () => {
  const [filters, setFilters] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  // --- Animation config ---
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* --- En-tête --- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes demandes</h1>

        {/* --- Bouton Ajouter / Retour --- */}
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-2 px-4 py-2 border border-black rounded-xl transition-all duration-300 
            ${isAdding ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"}`}
        >
          {isAdding ? (
            <>
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Ajouter une demande</span>
            </>
          )}
        </button>
      </div>

      {/* --- Contenu avec animation --- */}
      <AnimatePresence mode="wait">
        {!isAdding ? (
          <motion.div
            key="demandes"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariants}
            transition={{ duration: 0.4 }}
          >
            <DemandesFilter onFilterChange={setFilters} />
            <DemandesList filters={filters} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariants}
            transition={{ duration: 0.4 }}
            className="border border-gray-200 rounded-2xl shadow-md p-6 bg-white"
          >
            <h2 className="text-lg font-semibold mb-4">Nouvelle demande</h2>
    <MultiStepFormDemande onSuccess={() => setIsAdding(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
