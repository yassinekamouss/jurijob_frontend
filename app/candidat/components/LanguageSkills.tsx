import { Languages } from "lucide-react";

interface Language {
  name: string;
  level: string;
}

interface LanguageSkillsProps {
  languages: Language[];
}

export function LanguageSkills({ languages }: LanguageSkillsProps) {
  return (
    // Remplacement de <Card> par <div>
    <div className="border-gray-200 shadow-sm rounded-lg bg-white">
      {/* Remplacement de <CardHeader> par <div> */}
      <div className="p-6">
        {/* Remplacement de <CardTitle> par <h2> */}
        <h2 className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
          <Languages className="h-5 w-5 text-gray-700" />
          Compétences linguistiques
        </h2>
      </div>
      {/* Remplacement de <CardContent> par <div> */}
      <div className="p-6 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((language, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <h3 className="text-gray-900 mb-2 font-medium">{language.name}</h3>
              {/* Remplacement de <Badge> par <span> */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800">
                {language.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

