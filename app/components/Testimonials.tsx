import { Quote } from "lucide-react";
import Reveal from "./Reveal";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Cette plateforme m'a aidée à décrocher mon premier poste d'assistante juridique. Le processus a été fluide et le soutien de l'équipe exceptionnel. Je recommande vivement Jurijob à tout diplômé en droit souhaitant démarrer sa carrière.",
      name: "Amina Benali",
      role: "Juriste Junior",
      type: "graduate",
    },
    {
      quote:
        "Nous avons gagné du temps et trouvé des candidats qualifiés plus rapidement que par les méthodes de recrutement traditionnelles. Les profils vérifiés par l'administration nous ont rassurés sur la qualité des candidatures. Jurijob est devenu notre plateforme de référence.",
      name: "Mohamed El Fassi",
      role: "DRH, Cabinet d'avocats",
      type: "recruiter",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Histoires de réussite
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez les retours des diplômés et des recruteurs qui ont
              réussi avec Jurijob
            </p>
          </div>
        </Reveal>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
  {testimonials.map((testimonial, index) => (
    <Reveal key={index} delay={index * 0.05}>
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
        <Quote className="w-10 h-10 text-black mb-6" />
        <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed flex-grow">
          &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="flex items-center gap-4 mt-auto">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-black font-semibold">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <div className="font-semibold text-black">
              {testimonial.name}
            </div>
            <div className="text-gray-600">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </Reveal>
  ))}
</div>
      </div>
    </section>
  );
}
