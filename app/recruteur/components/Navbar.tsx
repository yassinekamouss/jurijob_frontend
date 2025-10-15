"use client";

import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FileText, Users, Settings, LogOut, User, Mail, LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function Navbar() {
  const pathname = usePathname();
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const { user , logout} = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems: NavItem[] = [
    { 
      href: "/recruteur/demandes", 
      label: "Demandes",
      icon: FileText 
    },
    { 
      href: "/recruteur/candidats", 
      label: "Candidats",
      icon: Users 
    },
    { 
      href: "/recruteur/parametres", 
      label: "Paramètres",
      icon: Settings 
    },
  ];


const handleLogout = async () => {
  try {
    await logout(); // Appelle la fonction du AuthContext
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};


  return (
    <>
      {/* Navbar Desktop & Tablet */}
      <nav className="bg-[#223047] text-white shadow-lg md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <Image
                    src="/images/logo_jurijob.webp"
                    alt="TalentMatch Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
              </Link>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Profil avec Menu Dropdown */}
            {user ? (
              <div className="relative block" ref={profileMenuRef}>
                <div 
                  className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-200">
                      {user.prenom}
                    </span>
                    <div className="h-9 w-9 flex items-center justify-center rounded-full bg-white text-[#223047] font-semibold text-sm">
                      {user.prenom[0].toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Menu Dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#223047] text-white font-semibold">
                          {user.prenom[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {user.prenom} {user.nom || ''}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <div className="px-4 py-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <User className="w-4 h-4" />
                          <span className="font-medium">Nom complet:</span>
                        </div>
                        <p className="text-sm text-gray-900 ml-6">
                          {user.prenom} {user.nom || ''}
                        </p>
                      </div>

                      <div className="px-4 py-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Mail className="w-4 h-4" />
                          <span className="font-medium">Email:</span>
                        </div>
                        <p className="text-sm text-gray-900 ml-6 break-all">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 mt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:block text-sm text-gray-300">Chargement...</div>
            )}
          </div>
        </div>
      </nav>

      {/* Navigation Mobile - Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#223047] border-t border-gray-600 shadow-lg z-50">
        <div className="grid grid-cols-3 gap-1 px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 rounded-lg transition-all ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-gray-400"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}