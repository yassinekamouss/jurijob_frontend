import { LogOut } from "lucide-react";
import Brand from "@/app/components/Brand";

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

          <button
            onClick={onLogout}
            // Classes de base pour mobile (bouton icône carré) + classes pour écrans plus grands
            className="inline-flex items-center justify-center p-2 md:px-4 md:py-2 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            aria-label="Déconnexion" // Ajout d'un aria-label pour l'accessibilité quand le texte est caché
          >
            {/* La marge de l'icône ne s'applique que sur les écrans moyens et plus */}
            <LogOut className="h-4 w-4 md:mr-2" />
            
            {/* Le texte du bouton est caché sur mobile et s'affiche sur les écrans moyens et plus */}
            <span className="hidden md:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
}