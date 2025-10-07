import { Scale, CheckCircle, Shield, Clock } from "lucide-react";
import Reveal from "./Reveal";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Scale,
      title: "Adapté au secteur juridique",
      description:
        "Une plateforme conçue spécifiquement pour les besoins uniques des professionnels du droit et des cabinets.",
    },
    {
      icon: CheckCircle,
      title: "Profils vérifiés par l’administration",
      description:
        "Chaque profil fait l’objet d’une validation rigoureuse pour garantir la qualité et l’authenticité des candidats.",
    },
    {
      icon: Shield,
      title: "Gratuit pour les diplômés",
      description:
        "Aucun coût pour les diplômés en droit souhaitant rejoindre la plateforme et se connecter à des employeurs.",
    },
    {
      icon: Clock,
      title: "Accès efficace aux CV",
      description:
        "Gagnez du temps grâce à un processus rationalisé qui vous présente rapidement des candidats préqualifiés.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Pourquoi choisir Jurijob&nbsp;?
            </h2>
            <p className="text-lg text-gray-600">
              Construire la confiance grâce à la qualité, la sécurité et
              l’efficacité
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Reveal key={index} delay={index * 0.05}>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full">
                  <div className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-semibold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600 flex-grow">{feature.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
