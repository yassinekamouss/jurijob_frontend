import { LogOut } from "lucide-react";
import Brand from "@/app/components/Brand";

interface HeaderProps {
  candidateName: string;
  onLogout: () => void;
}

export function Header({ candidateName, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Brand />
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-black">
              Dashboard <span className="text-gray-500">— {candidateName}</span>
            </h1>
          </div>

          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}