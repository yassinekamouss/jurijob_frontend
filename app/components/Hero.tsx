import { Users, Target } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texte */}
          <Reveal
            direction="left"
            duration={1}
            delay={0.2}
            className="space-y-8">
            <div className="space-y-6">
              <Reveal direction="up" duration={0.8} delay={0.4}>
                <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full">
                  <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Plateforme juridique n°1 au Maroc
                  </span>
                </div>
              </Reveal>

              <Reveal direction="up" duration={1} delay={0.6}>
                <h1 className="text-5xl lg:text-7xl font-bold text-black leading-tight">
                  <span className="block">Relier les talents</span>
                  <span className="block bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
                    juridiques
                  </span>
                  <span className="block">aux</span>
                  <span className="block relative">
                    opportunités
                    {/* Soulignement animé en reveal */}
                    <Reveal direction="up" delay={1.5} duration={1}>
                      <div className="absolute -bottom-2 left-0 h-1 bg-black w-full" />
                    </Reveal>
                  </span>
                </h1>
              </Reveal>

              <Reveal direction="up" duration={0.8} delay={0.8}>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Jurijob est la plateforme de référence au Maroc qui comble le
                  fossé entre les jeunes diplômés en droit ambitieux et les
                  recruteurs visionnaires.
                </p>
              </Reveal>
            </div>

            {/* Boutons CTA (sans motion, design actuel) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-md transition">
                Je suis diplômé(e)
              </button>
              <button className="border border-black text-black hover:bg-gray-50 px-8 py-3 rounded-md transition">
                Je suis recruteur
              </button>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal
            direction="right"
            duration={1}
            delay={0.4}
            className="relative">
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-full h-full border-2 border-gray-200 rounded-3xl" />

              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/fallback.png"
                  alt="Espace de travail juridique moderne"
                  width={1080}
                  height={720}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Cartes flottantes */}
              <Reveal direction="up" duration={0.8} delay={1.2}>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-black">1 250+</div>
                      <div className="text-sm text-gray-600">
                        Utilisateurs actifs
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="down" duration={0.8} delay={1.4}>
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <div className="font-semibold text-black">98%</div>
                      <div className="text-sm text-gray-600">
                        Taux d’adéquation
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
