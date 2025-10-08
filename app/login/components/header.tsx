"use client";
import { useState } from "react";
import Link from "next/link";
import Brand from "@components/Brand";
import { Home, GraduationCap, Building2 } from "lucide-react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Brand />

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
            href="/"
              className="flex items-center px-4 py-2 text-sm text-black/70 hover:text-black hover:bg-black/5 rounded-md transition"
            >
              <Home className="w-4 h-4 mr-2" />
              Accueil
            </Link>

            {/* Dropdown menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-44 border border-black/20 rounded-md py-2 px-3 text-sm text-black flex items-center justify-between hover:bg-black/5 transition"
              >
                <span>{"S'inscrire"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 transition-transform ${
                    showMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-black/10 rounded-md shadow-lg py-2">
                  <Link
                    href="/signup/recruteur"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-black/5 w-full text-left"
                    onClick={() => console.log("Recruteur")}
                  >
                    <Building2 className="w-4 h-4" />
                    En tant que Recruteur
                  </Link>
                  <Link
                    href="/signup/candidat"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-black/5 w-full text-left"
                    onClick={() => console.log("Diplômé")}
                  >
                    <GraduationCap className="w-4 h-4" />
                    En tant que Diplômé
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
