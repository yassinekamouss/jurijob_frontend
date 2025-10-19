"use client";

import React, { useEffect, useState } from "react";
import DemandeCard from "./DemandeCard";
import Pagination from "@/app/components/Pagination";
import { Briefcase } from "lucide-react";

import { useDemandes } from "../hooks/useDemandes";

const DemandesList: React.FC = () => {
  const { demandes, loading, error, page, total, limit, setPage } = useDemandes(4);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement des demandes...</p>
        </div>
      </div>
    );
  }

  if (demandes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <Briefcase className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune demande</h3>
        <p className="text-gray-600">Aucune demande n'a été trouvée pour le moment.</p>
      </div>
    );
  }

return (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {demandes.map((demande) => (
        <DemandeCard key={demande._id} {...demande} />
      ))}
    </div>

    <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
  </div>
);
};

export default DemandesList;