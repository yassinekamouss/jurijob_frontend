import { Check } from "lucide-react";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Tarification simple et transparente
            </h2>
            <p className="text-lg text-gray-600">
              Choisissez l’offre qui correspond à vos besoins
            </p>
          </div>
        </Reveal>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* For Graduates */}
          <Reveal>
            <div className="border-2 border-green-200 bg-green-50 rounded-xl p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center pb-8">
                <h3 className="text-2xl font-bold text-black">
                  Pour les diplômés
                </h3>
                <div className="text-4xl font-bold text-black mt-4">
                  Gratuit
                </div>
                <p className="text-gray-600 mt-2">
                  Toujours gratuit pour les diplômés en droit
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Créez un profil professionnel",
                  "Téléchargez et validez votre CV",
                  "Soyez découvert par des recruteurs",
                  "Ressources d’accompagnement de carrière",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Rejoindre en tant que diplômé(e)
              </button>
            </div>
          </Reveal>

          {/* For Recruiters */}
          <Reveal delay={0.05}>
            <div className="border-2 border-black rounded-xl p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center pb-8">
                <h3 className="text-2xl font-bold text-black">
                  Pour les recruteurs
                </h3>
                <div className="text-4xl font-bold text-black mt-4">
                  Contactez-nous
                </div>
                <p className="text-gray-600 mt-2">
                  Tarification personnalisée selon vos besoins
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Accès à une base de CV sélectionnée",
                  "Profils validés par l’administration",
                  "Critères de recherche personnalisés",
                  "Support dédié au compte",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-black" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full border border-black text-black py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Contacter les ventes
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
