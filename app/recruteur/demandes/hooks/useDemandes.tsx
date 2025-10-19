"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import type Demande from "@/app/types/Demande";
import type DemandesResponse from "@/app/types/DemandesResponse";

/**
 * Hook professionnel pour gérer la récupération et la pagination des demandes.
 * Réutilisable dans n'importe quel composant.
 */
export function useDemandes(limit = 4) {
  const { fetchWithAuth, user } = useAuth();

  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchDemandes = async (currentPage: number) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithAuth(
        `/demandes/recruteur/allDemandes?page=${currentPage}&limit=${limit}`
      );

      if (!res.ok) throw new Error("Erreur lors de la récupération des demandes");

      const data: DemandesResponse = await res.json();
      setDemandes(data.demandes);
      setTotal(data.total);
    } catch (err: any) {
      console.error("Erreur récupération demandes:", err);
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes(page);
  }, [user, page]);

  return {
    demandes,
    loading,
    error,
    page,
    total,
    limit,
    setPage,
    refresh: () => fetchDemandes(page),
  };
}
