"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Edit2,
  Mail,
  Phone,
  User,
  GraduationCap,
  Briefcase,
  Globe,
  LogOut,
  Plus,
  X,
  Search,
  MapPin,
  Wifi,
} from "lucide-react";
import Brand from "@/app/components/Brand";

/**
 * CandidateDashboard - version sans shadcn (Next.js + Tailwind only)
 * - Modales implémentées par rendu conditionnel
 * - Inputs / Selects / Switch natifs
 * - Même shape des données et mêmes actions
 */

interface CandidateInfo {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  photo: string;
  niveauExperience: string;
  formation: string;
  anneeFormation: string;
  specialisations: string[];
  langues: string[];
  typeRecherche: string;
  mobiliteGeographique: string[];
  teleTravailAccepte: boolean;
  rechercheActive: boolean;
}

export default function CandidateDashboard() {
  const [candidate, setCandidate] = useState<CandidateInfo>({
    prenom: "Marie",
    nom: "Dubois",
    email: "marie.dubois@email.com",
    telephone: "+33 6 12 34 56 78",
    photo:
      "https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXd5ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTk2NDQ2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    niveauExperience: "Junior (0-2 ans)",
    formation: "Master 2 Droit des Affaires",
    anneeFormation: "2023",
    specialisations: ["Droit commercial", "Droit des sociétés", "Droit fiscal"],
    langues: ["Français (natif)", "Anglais (courant)", "Espagnol (intermédiaire)"],
    typeRecherche: "Emploi",
    mobiliteGeographique: ["Paris", "Île-de-France"],
    teleTravailAccepte: true,
    rechercheActive: true,
  });

  // local edit state used by modals
  const [editData, setEditData] = useState<CandidateInfo>(candidate);

  // modal toggles
  const [isPersonalOpen, setPersonalOpen] = useState(false);
  const [isProfOpen, setProfOpen] = useState(false);
  const [isPrefsOpen, setPrefsOpen] = useState(false);

  // temp inputs
  const [newSpecialisation, setNewSpecialisation] = useState("");
  const [newLangue, setNewLangue] = useState("");
  const [newVille, setNewVille] = useState("");

  // Re-sync editData when opening modals or when candidate changes
  useEffect(() => {
    setEditData(candidate);
  }, [candidate]);

  // Simple accessible modal (trap focus minimal)
  function Modal({
    title,
    open,
    onClose,
    children,
    width = "max-w-md",
  }: {
    title: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
  }) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!open) return;
      const previous = document.activeElement as HTMLElement | null;
      const firstFocusable = ref.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        previous?.focus();
      };
    }, [open, onClose]);

    if (!open) return null;
    return (
      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <div
          className="fixed inset-0 bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          ref={ref}
          className={`relative z-50 ${width} w-full bg-white rounded-lg shadow-lg p-6 overflow-auto max-h-[85vh]`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 id="modal-title" className="text-lg font-semibold">
              {title}
            </h3>
            <button
              aria-label="Fermer"
              onClick={onClose}
              className="p-2 rounded hover:bg-muted/50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  }

  // CRUD helpers for lists
  const addSpecialisation = () => {
    if (!newSpecialisation.trim()) return;
    setEditData((prev) => ({
      ...prev,
      specialisations: [...prev.specialisations, newSpecialisation.trim()],
    }));
    setNewSpecialisation("");
  };
  const removeSpecialisation = (i: number) =>
    setEditData((prev) => ({
      ...prev,
      specialisations: prev.specialisations.filter((_, idx) => idx !== i),
    }));

  const addLangue = () => {
    if (!newLangue.trim()) return;
    setEditData((prev) => ({ ...prev, langues: [...prev.langues, newLangue.trim()] }));
    setNewLangue("");
  };
  const removeLangue = (i: number) =>
    setEditData((prev) => ({ ...prev, langues: prev.langues.filter((_, idx) => idx !== i) }));

  const addVille = () => {
    if (!newVille.trim()) return;
    setEditData((prev) => ({
      ...prev,
      mobiliteGeographique: [...prev.mobiliteGeographique, newVille.trim()],
    }));
    setNewVille("");
  };
  const removeVille = (i: number) =>
    setEditData((prev) => ({
      ...prev,
      mobiliteGeographique: prev.mobiliteGeographique.filter((_, idx) => idx !== i),
    }));

  // Save/cancel handlers for each modal
  const handleSavePersonal = () => {
    setCandidate(editData);
    setPersonalOpen(false);
  };
  const handleCancelPersonal = () => {
    setEditData(candidate);
    setPersonalOpen(false);
  };

  const handleSaveProf = () => {
    setCandidate(editData);
    setProfOpen(false);
  };
  const handleCancelProf = () => {
    setEditData(candidate);
    setProfOpen(false);
  };

  const handleSavePrefs = () => {
    setCandidate(editData);
    setPrefsOpen(false);
  };
  const handleCancelPrefs = () => {
    setEditData(candidate);
    setPrefsOpen(false);
  };

  const handleLogout = () => {
    alert("Déconnexion réussie");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Brand />
            <div className="h-6 border-l border-gray-200" />
            <span className="text-sm text-gray-500">Tableau de bord candidat</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Connecté en tant que</span>
            <div className="px-2 py-0.5 bg-gray-100 rounded text-sm">{candidate.prenom} {candidate.nom}</div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm px-3 py-1 rounded hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Card */}
            <section className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-black" />
                  <h2 className="text-lg font-medium">Informations personnelles</h2>
                </div>
                <div>
                  <button
                    onClick={() => { setEditData(candidate); setPersonalOpen(true); }}
                    className="flex items-center gap-2 text-sm px-3 py-1 rounded border"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                </div>
              </div>

              <div className="mt-4 flex gap-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {candidate.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={candidate.photo} alt="avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-lg font-semibold">{candidate.prenom[0]}{candidate.nom[0]}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{candidate.prenom} {candidate.nom}</h3>
                  <p className="text-sm text-gray-500">Juriste en recherche d'opportunités</p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{candidate.telephone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Professional Card */}
            <section className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-black" />
                  <h2 className="text-lg font-medium">Informations professionnelles</h2>
                </div>
                <div>
                  <button
                    onClick={() => { setEditData(candidate); setProfOpen(true); }}
                    className="flex items-center gap-2 text-sm px-3 py-1 rounded border"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Niveau d'expérience</h4>
                  <div className="inline-block px-3 py-1 rounded border text-sm">{candidate.niveauExperience}</div>
                </div>

                <div>
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <GraduationCap className="w-4 h-4" />
                    Formation juridique
                  </h4>
                  <div className="bg-gray-50 rounded p-4">
                    <p className="text-sm">{candidate.formation}</p>
                    <p className="text-xs text-gray-500 mt-1">Année d'obtention : {candidate.anneeFormation}</p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">Spécialisations juridiques</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.specialisations.map((s, i) => (
                      <span key={i} className="bg-gray-100 px-3 py-1 rounded text-sm">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Globe className="w-4 h-4" />
                    Langues parlées
                  </h4>
                  <div className="space-y-2">
                    {candidate.langues.map((l, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <span className="text-sm">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Preferences Card */}
            <section className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-black" />
                  <h2 className="text-lg font-medium">Préférences de recherche</h2>
                </div>
                <div>
                  <button
                    onClick={() => { setEditData(candidate); setPrefsOpen(true); }}
                    className="flex items-center gap-2 text-sm px-3 py-1 rounded border"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Type de recherche</h4>
                  <div className="inline-block px-3 py-1 rounded bg-gray-100 text-sm">{candidate.typeRecherche}</div>
                </div>

                <div>
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    Mobilité géographique
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.mobiliteGeographique.map((v, i) => (
                      <span key={i} className="px-3 py-1 rounded border text-sm">{v}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Télétravail accepté</span>
                    </div>
                    <div className="px-3 py-1 rounded text-sm bg-gray-50">{candidate.teleTravailAccepte ? "Oui" : "Non"}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Recherche active</span>
                    </div>
                    <div className="px-3 py-1 rounded text-sm bg-gray-50">{candidate.rechercheActive ? "Active" : "Passive"}</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium mb-3">Statut du profil</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Profil complété</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full bg-black" style={{ width: "95%" }} />
                </div>
                <p className="text-xs text-gray-500">
                  Votre profil est presque complet. Ajoutez une lettre de motivation pour atteindre 100%.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium mb-3">Visibilité</h3>
              <div className="text-sm text-gray-500">
                <div className="flex items-center justify-between">
                  <span>Profil visible</span>
                  <span className="text-green-600 border border-green-600 px-2 py-0.5 rounded text-sm">Actif</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Votre profil est visible par les recruteurs partenaires de JuriJob.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium mb-3">Conseils</h3>
              <div className="text-sm text-gray-500 space-y-2">
                <p>• Maintenez vos informations à jour</p>
                <p>• Ajoutez des spécialisations pertinentes</p>
                <p>• Vérifiez votre profil régulièrement</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ---- Personal Modal ---- */}
      <Modal title="Modifier les informations personnelles" open={isPersonalOpen} onClose={handleCancelPersonal}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Photo de profil (URL)</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={editData.photo}
              onChange={(e) => setEditData({ ...editData, photo: e.target.value })}
              placeholder="https://example.com/photo.jpg"
              type="url"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Prénom</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={editData.prenom}
                onChange={(e) => setEditData({ ...editData, prenom: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Nom</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={editData.nom}
                onChange={(e) => setEditData({ ...editData, nom: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full border rounded px-3 py-2"
              type="email"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Téléphone</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={editData.telephone}
              onChange={(e) => setEditData({ ...editData, telephone: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={handleCancelPersonal} className="px-4 py-2 rounded border">Annuler</button>
            <button onClick={handleSavePersonal} className="px-4 py-2 rounded bg-sky-600 text-white">Enregistrer</button>
          </div>
        </div>
      </Modal>

      {/* ---- Professional Modal ---- */}
      <Modal title="Modifier les informations professionnelles" open={isProfOpen} onClose={handleCancelProf} width="max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Niveau d'expérience</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={editData.niveauExperience}
              onChange={(e) => setEditData({ ...editData, niveauExperience: e.target.value })}
            >
              <option>Débutant (0 ans)</option>
              <option>Junior (0-2 ans)</option>
              <option>Confirmé (2-5 ans)</option>
              <option>Senior (5-10 ans)</option>
              <option>Expert (10+ ans)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Formation juridique</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={editData.formation}
                onChange={(e) => setEditData({ ...editData, formation: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Année d'obtention</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={editData.anneeFormation}
                onChange={(e) => setEditData({ ...editData, anneeFormation: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Spécialisations juridiques</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editData.specialisations.map((s, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                  <span className="text-sm">{s}</span>
                  <button onClick={() => removeSpecialisation(i)} aria-label={`Supprimer ${s}`} className="p-1">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 border rounded px-3 py-2"
                placeholder="Ajouter une spécialisation"
                value={newSpecialisation}
                onChange={(e) => setNewSpecialisation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSpecialisation()}
              />
              <button onClick={addSpecialisation} className="px-3 py-2 border rounded">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Langues parlées</label>
            <div className="space-y-2 mb-2">
              {editData.langues.map((l, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded p-2">
                  <span className="text-sm">{l}</span>
                  <button onClick={() => removeLangue(i)} className="p-1">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 border rounded px-3 py-2"
                placeholder="Ex: Anglais (courant)"
                value={newLangue}
                onChange={(e) => setNewLangue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addLangue()}
              />
              <button onClick={addLangue} className="px-3 py-2 border rounded">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={handleCancelProf} className="px-4 py-2 rounded border">Annuler</button>
            <button onClick={handleSaveProf} className="px-4 py-2 rounded bg-sky-600 text-white">Enregistrer</button>
          </div>
        </div>
      </Modal>

      {/* ---- Preferences Modal ---- */}
      <Modal title="Modifier les préférences de recherche" open={isPrefsOpen} onClose={handleCancelPrefs}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Type de recherche</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={editData.typeRecherche}
              onChange={(e) => setEditData({ ...editData, typeRecherche: e.target.value })}
            >
              <option>Emploi</option>
              <option>Stage</option>
              <option>Alternance</option>
              <option>Freelance</option>
              <option>Toutes opportunités</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Mobilité géographique</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editData.mobiliteGeographique.map((v, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                  <span className="text-sm">{v}</span>
                  <button onClick={() => removeVille(i)} className="p-1">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                className="flex-1 border rounded px-3 py-2"
                placeholder="Ajouter une ville/région"
                value={newVille}
                onChange={(e) => setNewVille(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addVille()}
              />
              <button onClick={addVille} className="px-3 py-2 border rounded">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm">Télétravail accepté</label>
              <p className="text-xs text-gray-500">Acceptez-vous les postes en télétravail ?</p>
            </div>
            <input
              type="checkbox"
              checked={editData.teleTravailAccepte}
              onChange={(e) => setEditData({ ...editData, teleTravailAccepte: e.target.checked })}
              className="w-6 h-6"
              aria-label="Télétravail accepté"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm">Recherche active</label>
              <p className="text-xs text-gray-500">Votre profil sera plus visible aux recruteurs</p>
            </div>
            <input
              type="checkbox"
              checked={editData.rechercheActive}
              onChange={(e) => setEditData({ ...editData, rechercheActive: e.target.checked })}
              className="w-6 h-6"
              aria-label="Recherche active"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={handleCancelPrefs} className="px-4 py-2 rounded border">Annuler</button>
            <button onClick={handleSavePrefs} className="px-4 py-2 rounded bg-sky-600 text-white">Enregistrer</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
