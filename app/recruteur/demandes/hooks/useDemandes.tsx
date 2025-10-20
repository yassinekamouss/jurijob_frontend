// 📁 app/recruteur/demandes/hooks/useDemandes.ts

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import type Demande from "@/app/types/Demande";
import type DemandesResponse from "@/app/types/DemandesResponse";

export function useDemandes(limit = 4 , filters: Record<string, any> = {}) {
  const { fetchWithAuth, user } = useAuth();

  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchDemandes = async (currentPage: number, currentFilters = filters) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
 
      const queryParams = new URLSearchParams({ page: String(page), limit: String(limit) });
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) value.forEach((v) => queryParams.append(key, v));
      else if (value) queryParams.append(key, value.toString());
    });

      const res = await fetchWithAuth(`/demandes/recruteur/allDemandes?${queryParams}`);

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
    fetchDemandes(page, filters);
  }, [user, page, filters]);

  return {
    demandes,
    loading,
    error,
    page,
    total,
    limit,
    setPage,
    onRefresh: () => fetchDemandes(page, filters),
  };
}
