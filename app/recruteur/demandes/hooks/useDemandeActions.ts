"use client";

import { useCallback } from "react";
import { useAuth } from "@/app/context/AuthContext";

export function useDemandeActions(setDemandes: any) {
  const { fetchWithAuth } = useAuth();

  const deleteDemande = useCallback(
    async (id: string) => {
      try {
        const res = await fetchWithAuth(`/demandes/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Erreur de suppression");

        setDemandes((prev: any[]) => prev.filter((d) => d._id !== id));
        return { success: true, message: data.message };
      } catch (err: any) {
        console.error("Erreur suppression demande:", err);
        return { success: false, message: err.message || "Une erreur est survenue" };
      }
    },
    [fetchWithAuth, setDemandes]
  );

  const updateDemandeStatut = useCallback(
    async (id: string, nouveauStatut: string) => {
      try {
        const res = await fetchWithAuth(`/demandes/update/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statut: nouveauStatut }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Erreur de mise à jour du statut");

        setDemandes((prev: any[]) =>
          prev.map((d) => (d._id === id ? { ...d, statut: nouveauStatut } : d))
        );
        return { success: true, message: data.message };
      } catch (err: any) {
        console.error("Erreur mise à jour statut demande :", err);
        return { success: false, message: err.message || "Une erreur est survenue" };
      }
    },
    [fetchWithAuth, setDemandes]
  );

  return {
    deleteDemande,
    updateDemandeStatut,
  };
}
