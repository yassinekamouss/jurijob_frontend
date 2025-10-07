"use client";

import Link from "next/link";
import Brand from "./Brand";
import Reveal from "./Reveal";

export default function Header() {
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
    <Reveal direction="down" duration={0.8}>
      <header
        id="site-header"
        className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0">
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
                <Link
                  href="/signup"
                  className="bg-black text-white hover:bg-gray-800 rounded-lg px-6 py-2 transition">
                  Inscription
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </header>
    </Reveal>
  );
}
