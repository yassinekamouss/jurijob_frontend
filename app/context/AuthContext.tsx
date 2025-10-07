"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, logoutRequest, refreshRequest, getMeRequest } from "@/app/lib/api/authApi";
import { apiFetch } from "@/app/lib/api/apiFetch";
import { useRouter } from "next/navigation";
import {User} from "@/app/types/user";


interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //  Login
  const login = async (email: string, password: string) => {
    try {
      const data = await loginRequest(email, password);
      setUser(data.user);
      setAccessToken(data.accessToken);
      return data.user;
    } catch (error) {
      console.error("Erreur login:", error);
      return null;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Erreur logout:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  // Initialisation de la session au chargement
  useEffect(() => {
    const initAuth = async () => {
      try {
        const refreshData = await refreshRequest();
        const meData = await getMeRequest(refreshData.accessToken);
        setAccessToken(refreshData.accessToken);
        setUser(meData.user);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // fetchWithAuth (gère le refresh auto)
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    let token = accessToken;

    if (!token) {
      try {
        const refreshData = await refreshRequest();
        token = refreshData.accessToken;
        setAccessToken(token);
      } catch {
        setUser(null);
        router.push("/login");
        throw new Error("Session expirée. Veuillez vous reconnecter.");
      }
    }

    return apiFetch(url, options, token);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};
