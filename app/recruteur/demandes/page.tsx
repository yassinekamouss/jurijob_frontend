"use client";
import React, { useState } from "react";
import DemandesList from "./components/DemandesList";
import DemandesFilter from "./components/DemandesFilter";

const Page = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mes demandes</h1>

      {/* Le filtre est isolé et garde son propre state */}
      <DemandesFilter onFilterChange={setFilters} />

      {/* La liste ne dépend que des filters */}
      <DemandesList filters={filters} />
    </div>
  );
};

export default Page;
