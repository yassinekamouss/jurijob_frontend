import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Commencez votre parcours dès aujourd'hui
        </h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Que vous soyez à la recherche de talents ou d'opportunités, nous
          avons construit le pont. Rejoignez la première plateforme marocaine de
          carrières juridiques et franchissez une nouvelle étape dans votre
          parcours professionnel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Bouton Graduate */}
          <Link
            href="/signup"
            className="bg-white text-black font-medium rounded-lg px-8 py-3 transition hover:bg-gray-100">
            S'inscrire en tant que diplômé(e)
          </Link>

          {/* Bouton Recruiter */}
          <Link
            href="/signup"
            className="border border-white text-white font-medium rounded-lg px-8 py-3 transition hover:bg-white hover:text-black">
            S'inscrire en tant que recruteur
          </Link>
        </div>
      </div>
    </section>
  );
}
