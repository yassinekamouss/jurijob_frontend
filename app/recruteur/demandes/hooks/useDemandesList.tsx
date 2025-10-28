"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/context/AuthContext";
import type Demande from "@/app/types/Demande";
import type DemandesResponse from "@/app/types/DemandesResponse";

export function useDemandesList(limit = 4, filters: Record<string, any> = {}) {
  const { fetchWithAuth, user } = useAuth();

  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
      else if (value) params.append(key, value.toString());
    });
    return params.toString();
  }, [page, limit, filters]);

  const fetchDemandes = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const query = buildQueryParams();
      const res = await fetchWithAuth(`/demandes/recruteur/allDemandes?${query}`);
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
  }, [user, buildQueryParams, fetchWithAuth]);

  useEffect(() => {
    fetchDemandes();
  }, [fetchDemandes]);

  return {
    demandes,
    loading,
    error,
    page,
    total,
    limit,
    setPage,
    refresh: fetchDemandes,
    setDemandes, // pour mettre à jour localement après actions
  };
}
