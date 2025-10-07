import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="flex items-center" aria-label="Accueil JuriJob">
      <div className="bg-black text-white px-3 py-1 font-bold">JURI</div>
      <div className="border border-black px-3 py-1 font-bold text-black">
        JOB
      </div>
    </Link>
  );
}
