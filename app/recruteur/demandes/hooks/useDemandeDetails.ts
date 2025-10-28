"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/app/context/AuthContext";
import type Demande from "@/app/types/Demande";

export function useDemandeDetails() {
  const { fetchWithAuth } = useAuth();
  const [selectedDemande, setSelectedDemande] = useState<Demande | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDemandeDetails = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const res = await fetchWithAuth(`/demandes/${id}`, { method: "GET" });
        if (!res.ok) throw new Error("Erreur récupération détails");
        const data = await res.json();
        setSelectedDemande(data.demande);
      } catch (err: any) {
        console.error("Erreur récupération détails :", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchWithAuth]
  );

  return { selectedDemande, fetchDemandeDetails, setSelectedDemande, loading };
}
