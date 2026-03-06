import { LogOut } from "lucide-react";
import Brand from "@/app/components/Brand";
import Link from "next/link";

export function Header({ candidateName, onLogout }: {
  candidateName: string;
  onLogout: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4"> {/* Ajustement du padding horizontal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4"> {/* Réduction du gap pour mobile */}
            <Brand />
            Dashboard

            {/* Ce conteneur sera caché sur mobile et affiché en flex sur les écrans moyens et plus */}
            <div className="hidden md:flex items-center gap-4">
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-black text-sm sm:text-base whitespace-nowrap"> {/* Empêche le texte de passer à la ligne */}
                <span className="text-gray-500">— {candidateName}</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/candidat/dashboard"
              className="inline-flex items-center justify-center p-2 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span className="hidden md:inline">Dashboard</span>
              <span className="md:hidden">Dash.</span>
            </Link>

            <Link
              href="/candidat/parcours"
              className="inline-flex items-center justify-center p-2 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md text-black bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span className="hidden md:inline">Mon Parcours</span>
              <span className="md:hidden">Parcours</span>
            </Link>

            <button
              onClick={onLogout}
              className="inline-flex items-center justify-center p-2 md:px-4 md:py-2 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              aria-label="Déconnexion"
            >
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}