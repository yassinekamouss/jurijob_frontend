"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import UserMenu from "@/app/recruteur/components/UserMenu";
import NavLink from "@/app/recruteur/components/NavLink";

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { href: "/recruteur", label: "Tableau de bord", icon: "📊" },
    { href: "/recruteur/demandes", label: "Mes demandes", icon: "📋" },
    { href: "/recruteur/suivi", label: "Suivi", icon: "📈" },
    { href: "/recruteur/candidats", label: "Candidats", icon: "👥" },
    { href: "/recruteur/profil", label: "Profil entreprise", icon: "🏢" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/recruteur" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-gray-900">
                RecruteLaw
              </div>
            </Link>
          </div>

          {/* Navigation principale */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={pathname === item.href}
              />
            ))}
          </div>

          {/* User menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/recruteur/parametres"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Paramètres
            </Link>
            <UserMenu user={user} />
          </div>
        </div>
      </div>

      {/* Navigation mobile */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}