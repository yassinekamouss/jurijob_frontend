"use client";

import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { BarChart3, FileText, Users, Settings, LogOut, User, Mail, LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export default function Navbar() {
  const pathname = usePathname();
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const profileMenuRef = useRef<HTMLDivElement>(null);

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
      href: "/recruteur/dashboard",
      label: "Dashboard",
      icon: BarChart3
    },
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
      await logout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <>
      {/* Navbar Desktop & Tablet */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Image
                    src="/images/logo_jurijob.webp"
                    alt="TalentMatch Logo"
                    width={120}
                    height={40}
                  
                  />
                </div>
              </Link>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
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
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {user.prenom}
                    </span>
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt="Photo de profil"
                     className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover border-2 border-gray-300"
                      />
                    ) : (
                      <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center rounded-full bg-black text-white font-semibold text-sm">
                        {user.prenom[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Menu Dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        {user.imageUrl ? (
                          <img
                            src={user.imageUrl}
                            alt="Photo de profil"
                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-300"
                          />
                        ) : (
                          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-black text-white font-semibold">
                            {user.prenom[0].toUpperCase()}
                          </div>
                        )}
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
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <User className="w-3.5 h-3.5" />
                          <span className="font-medium">Nom complet</span>
                        </div>
                        <p className="text-sm text-gray-900 ml-5">
                          {user.prenom} {user.nom || ''}
                        </p>
                      </div>

                      <div className="px-4 py-2">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="font-medium">Email</span>
                        </div>
                        <p className="text-sm text-gray-900 ml-5 break-all">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 mt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:block text-sm text-gray-500">Chargement...</div>
            )}
          </div>
        </div>
      </nav>

      {/* Navigation Mobile - Bottom Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div className="flex w-screen justify-between overflow-x-hidden">
  {navItems.map((item) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-all ${
          isActive
            ? "text-white bg-black"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
        <span className="text-[10px] font-medium leading-tight text-center px-1">
          {item.label}
        </span>
      </Link>
    );
  })}
</div>

      </div>

      {/* Spacer pour le contenu mobile */}
      <div className="md:hidden h-[60px]"></div>
    </>
  );
}