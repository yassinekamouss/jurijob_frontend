"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Building2, GraduationCap } from "lucide-react";
import Brand from "./Brand";
import Reveal from "./Reveal";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const nav = [
    { href: "/#home", label: "Accueil" },
    { href: "/#how-it-works", label: "Comment ça marche" },
    { href: "/#about", label: "À propos" },
    { href: "/#contact", label: "Contact" },
    { href: "/#pricing", label: "Tarifs" },
  ];

  // Défilement fluide avec offset du header + fallback navigation
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.includes("#")) return; // liens sans ancre

    const id = href.split("#")[1];
    if (!id) return;

    const target =
      typeof document !== "undefined" ? document.getElementById(id) : null;
    if (!target) {
      // si la section n'est pas sur la page, laisser la navigation standard
      return;
    }

    // Empêcher le saut natif et appliquer un scroll fluide "pro"
    e.preventDefault();

    const headerEl = document.getElementById("site-header");
    const offset = (headerEl?.offsetHeight ?? 0) + 8; // marge de sécurité
    const targetTop =
      target.getBoundingClientRect().top + window.pageYOffset - offset;

    // Respect du mode réduit de mouvement
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      window.scrollTo(0, targetTop);
    } else {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }

    // Mettre à jour l'URL pour refléter l'ancre sans recharger
    const newUrl = `${window.location.pathname}#${id}`;
    window.history.pushState(null, "", newUrl);
  };

  return (
    <Reveal direction="down" duration={0.8} className="sticky top-0 z-50">
      <header
        id="site-header"
        className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brand */}
            <Reveal direction="right" duration={0.6}>
              <div>
                <Brand />
              </div>
            </Reveal>

            {/* Menu */}
            <nav
              className="hidden md:flex space-x-12"
              aria-label="Navigation principale">
              {nav.map((item, index) => (
                <Reveal
                  key={item.href}
                  delay={0.1 * index}
                  duration={0.6}
                  direction="down">
                  <div className="relative group">
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-gray-700 hover:text-black transition-colors">
                      {item.label}
                    </Link>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                  </div>
                </Reveal>
              ))}
            </nav>

            {/* Boutons (Connexion / Inscription) */}
            <Reveal direction="left" duration={0.8}>
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-black hover:bg-gray-200 transition">
                  Connexion
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="bg-black text-white hover:bg-gray-800 rounded-lg px-6 py-2 transition flex items-center gap-2">
                    Inscription
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-black/10 rounded-md shadow-lg py-2">
                      <Link
                        href="/signup/recruteur"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-black/5 w-full text-left"
                        onClick={() => console.log("Recruteur")}>
                        <Building2 className="w-4 h-4" />
                        En tant que Recruteur
                      </Link>
                      <Link
                        href="/signup/candidat"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-black/5 w-full text-left"
                        onClick={() => console.log("Diplômé")}>
                        <GraduationCap className="w-4 h-4" />
                        En tant que Diplômé
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>
    </Reveal>
  );
}
