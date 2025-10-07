"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  Mail,
  Lock,
  GraduationCap,
  Building2,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user = await login(email, password);
    setLoading(false);

    if (!user) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    // Redirection selon le rôle
    switch (user.role) {
      case "candidat":
        router.push("/candidat/dashboard");
        break;
      case "recruteur":
        router.push("/recruteur/dashboard");
        break;
      case "admin":
        router.push("/admin/dashboard");
        break;
      default:
        router.push("/");
        break;
    }
  }

  return (
    <main className="pt-16 min-h-screen flex bg-white">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center bg-gray-50 p-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl text-black mb-6 leading-tight">
              Connexion Recruteurs & Diplômés
            </h2>
            <p className="text-lg text-black/70 leading-relaxed">
              La plateforme qui connecte les talents juridiques aux meilleures
              opportunités.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-black mb-2">Pour les Recruteurs</h3>
                <p className="text-sm text-black/70">
                  Accédez aux meilleurs profils juridiques
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-black mb-2">Pour les Diplômés</h3>
                <p className="text-sm text-black/70">
                  Trouvez votre premier poste ou évoluez
                </p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-black pl-6">
            <blockquote className="text-black/80 mb-3">
              "Interface simple, résultats rapides."
            </blockquote>
            <div className="text-sm text-black/60">— Utilisateur JURIJOB</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-xl text-black tracking-tight">JURIJOB</h1>
              <p className="text-sm text-black/60">Recrutement Juridique</p>
            </div>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl text-black mb-2">Connexion à JURIJOB</h2>
              <p className="text-black/60">Accédez à votre espace professionnel</p>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-black text-sm">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                  <input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full pl-11 border border-black/20 rounded-md focus:border-black/40 transition"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-black text-sm">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full pl-11 pr-11 border border-black/20 rounded-md focus:border-black/40 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/60"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-black/60">
                  <input
                    type="checkbox"
                    className="rounded border-black/20 focus:ring-black/20"
                  />
                  Se souvenir de moi
                </label>
                <button
                  type="button"
                  className="text-sm text-black hover:text-black/70 transition"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-black text-white rounded-md hover:bg-black/90 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion..." : "Se connecter"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              {/* Separator */}
              <div className="relative my-6">
                <div className="h-px bg-black/10" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-black/50">
                  ou
                </span>
              </div>

              {/* Google */}
              <button
                type="button"
                className="w-full h-12 border border-black/20 rounded-md text-black hover:bg-black/5 flex items-center justify-center transition"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
                    1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
                    3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66
                    -2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16
                    -4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35
                    -2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
                    8.55 1 10.22 1 12s.43 3.45 1.18 
                    4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 
                    4.21 1.64l3.15-3.15C17.45 
                    2.09 14.97 1 12 1 7.7 1 
                    3.99 3.47 2.18 7.07l3.66 
                    2.84c.87-2.6 3.3-4.53 
                    6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continuer avec Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}