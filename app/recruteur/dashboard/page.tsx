"use client";

import { useAuth } from "@/app/context/AuthContext";
import { User } from "@/app/types/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CandidatDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Attendre que le loading soit terminé
    if (!loading) {
      if (!user) {
        // Pas d'utilisateur = redirection login
        router.push("/login");
      } else if (user.role !== "recruteur") {
        // Mauvais rôle = redirection accueil
        router.push("/");
      }
    }
  }, [user, loading, router]);

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }


  return (  
     <div>
      {JSON.stringify(user)}
      </div>
    
  );
}