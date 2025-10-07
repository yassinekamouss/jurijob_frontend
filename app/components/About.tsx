import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* En-tête centré */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              À propos de Jurijob
            </h2>
          </div>
        </Reveal>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Image professionnelle */}
          <Reveal direction="right">
            <div className="relative">
              <div className="absolute inset-0 bg-black transform translate-x-4 translate-y-4 rounded-sm"></div>
              <Image
                src="/images/_.jpeg"
                alt="Palais de justice représentant la justice et le professionnalisme juridique"
                width={1080}
                height={720}
                className="relative w-full h-[500px] object-cover rounded-sm shadow-xl"
              />
            </div>
          </Reveal>

          {/* Texte */}
          <div className="space-y-10">
            <Reveal>
              <div>
                <h3 className="text-2xl font-semibold text-black mb-4 border-l-4 border-black pl-4">
                  Notre mission
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Nous nous engageons à rapprocher les talents du droit et les
                  employeurs visionnaires au Maroc. Notre plateforme simplifie
                  le processus de recrutement tout en maintenant les plus hauts
                  standards de professionnalisme et d’intégrité.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h3 className="text-2xl font-semibold text-black mb-6 border-l-4 border-black pl-4">
                  Nos valeurs
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-black text-white flex items-center justify-center rounded-sm font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-1 text-lg">
                        Sérieux
                      </h4>
                      <p className="text-gray-600">
                        Nous maintenons des standards professionnels dans toutes
                        nos interactions
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-black text-white flex items-center justify-center rounded-sm font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-1 text-lg">
                        Neutralité
                      </h4>
                      <p className="text-gray-600">
                        Nous offrons une plateforme impartiale pour l’égalité
                        des chances
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-black text-white flex items-center justify-center rounded-sm font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-1 text-lg">
                        Responsabilité éthique
                      </h4>
                      <p className="text-gray-600">
                        Nous respectons les plus hautes exigences éthiques de la
                        profession juridique
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Statistiques optionnelles */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">500+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Diplômés en droit
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">150+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Cabinets d’avocats
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">95%</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Taux de réussite
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">24/7</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Support
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
