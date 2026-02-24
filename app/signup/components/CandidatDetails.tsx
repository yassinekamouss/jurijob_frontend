"use client";

import React from 'react';
import {
    Plus,
    Trash2,
    GraduationCap,
    Briefcase,
    FileText,
    Calendar,
    Building2,
    BookOpen,
    Upload,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    formationsJuridiques,
    ecolesMaroc,
    specialisations,
    typesExperience,
    postes
} from "@/app/constants/options";
import { Candidat, Formation, Experience } from '@/app/types/DataFormDataRegister';

interface CandidatDetailsProps {
    formData: Candidat;
    onFieldChange: (field: keyof Candidat, value: any) => void;
    errors: Partial<Record<keyof Candidat, string>>;
    className?: string;
}

const CandidatDetails: React.FC<CandidatDetailsProps> = ({
    formData,
    onFieldChange,
    errors = {},
    className = '',
}) => {
    const formations = formData.formations || [];
    const experiences = formData.experiences || [];

    // --- Handlers for Formations ---
    const addFormation = () => {
        const newFormation: Formation = {
            id: Math.random().toString(36).substr(2, 9),
            anneeDebut: '',
            anneeFin: '',
            niveau: '',
            domaine: '',
            ecole: '',
            diplomaFile: null
        };
        onFieldChange('formations', [...formations, newFormation]);
    };

    const removeFormation = (id: string) => {
        onFieldChange('formations', formations.filter(f => f.id !== id));
    };

    const updateFormation = (id: string, field: keyof Formation, value: any) => {
        onFieldChange('formations', formations.map(f => f.id === id ? { ...f, [field]: value } : f));
    };

    const handleFileUpload = (id: string, file: File | null) => {
        if (file && file.type !== 'application/pdf') {
            alert("Veuillez sélectionner un fichier PDF uniquement.");
            return;
        }
        updateFormation(id, 'diplomaFile', file);
    };

    // --- Handlers for Experiences ---
    const addExperience = () => {
        const newExperience: Experience = {
            id: Math.random().toString(36).substr(2, 9),
            debut: '',
            fin: '',
            type: '',
            entreprise: '',
            poste: ''
        };
        onFieldChange('experiences', [...experiences, newExperience]);
    };

    const removeExperience = (id: string) => {
        onFieldChange('experiences', experiences.filter(e => e.id !== id));
    };

    const updateExperience = (id: string, field: keyof Experience, value: any) => {
        onFieldChange('experiences', experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    return (
        <div className={`max-w-4xl mx-auto p-2 space-y-12 pb-10 ${className}`}>
            {/* Header section */}
            <div className="text-center space-y-4 mb-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Détails du parcours
                </h3>
                <p className="text-sm text-gray-500">
                    Détaillez vos formations et expériences pour permettre aux recruteurs de mieux vous connaître.
                </p>
            </div>

            {/* --- FORMATIONS SECTION --- */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <GraduationCap size={20} />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800">Formations</h4>
                    </div>
                    <button
                        type="button"
                        onClick={addFormation}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-sm"
                    >
                        <Plus size={16} />
                        Ajouter
                    </button>
                </div>

                <div className="grid gap-6">
                    <AnimatePresence>
                        {formations.map((formation) => (
                            <motion.div
                                key={formation.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative p-5 bg-white border border-gray-200 rounded-2xl shadow-sm"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeFormation(formation.id)}
                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                    <div className="space-y-4">
                                        {/* Ecole / Université */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Building2 size={14} className="text-gray-400" />
                                                École / Université
                                            </label>
                                            <select
                                                value={formation.ecole}
                                                onChange={(e) => updateFormation(formation.id, 'ecole', e.target.value)}
                                                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                            >
                                                <option value="">Sélectionner une institution</option>
                                                {ecolesMaroc.map(e => <option key={e} value={e}>{e}</option>)}
                                            </select>
                                        </div>

                                        {/* Niveau d'études */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <BookOpen size={14} className="text-gray-400" />
                                                Niveau d'études
                                            </label>
                                            <select
                                                value={formation.niveau}
                                                onChange={(e) => updateFormation(formation.id, 'niveau', e.target.value)}
                                                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                            >
                                                <option value="">Sélectionner un niveau</option>
                                                {formationsJuridiques.map(n => <option key={n} value={n}>{n}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Domaine Juridique */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <FileText size={14} className="text-gray-400" />
                                                Domaine d'études
                                            </label>
                                            <select
                                                value={formation.domaine}
                                                onChange={(e) => updateFormation(formation.id, 'domaine', e.target.value)}
                                                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                            >
                                                <option value="">Sélectionner un domaine</option>
                                                {specialisations.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    Année Début
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1980"
                                                    max="2030"
                                                    placeholder="Année"
                                                    value={formation.anneeDebut}
                                                    onChange={(e) => updateFormation(formation.id, 'anneeDebut', e.target.value)}
                                                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    Année Fin
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1980"
                                                    max="2035"
                                                    placeholder="Année"
                                                    value={formation.anneeFin}
                                                    onChange={(e) => updateFormation(formation.id, 'anneeFin', e.target.value)}
                                                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* File Upload for Diploma */}
                                    <div className="md:col-span-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Diplôme (Format PDF)</label>
                                            <div className={`relative border-2 border-dashed rounded-xl p-3 transition-all ${formation.diplomaFile ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}`}>
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(e) => handleFileUpload(formation.id, e.target.files?.[0] || null)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="flex items-center justify-center gap-3">
                                                    {formation.diplomaFile ? (
                                                        <>
                                                            <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                                                                <FileText size={18} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-medium text-green-800 truncate">{formation.diplomaFile.name}</p>
                                                                <p className="text-[10px] text-green-600">{(formation.diplomaFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    updateFormation(formation.id, 'diplomaFile', null);
                                                                }}
                                                                className="relative z-20 p-1 hover:bg-green-100 rounded-full text-green-700"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload size={18} className="text-gray-400" />
                                                            <span className="text-xs text-gray-500 font-medium">Glissez votre diplôme ou cliquez pour parcourir</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {formations.length === 0 && (
                        <div className="text-center py-6 border-2 border-dashed rounded-2xl border-gray-200">
                            <p className="text-sm text-gray-500">Aucune formation ajoutée</p>
                        </div>
                    )}
                </div>
            </section>

            {/* --- EXPERIENCES SECTION --- */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Briefcase size={20} />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800">Expériences</h4>
                    </div>
                    <button
                        type="button"
                        onClick={addExperience}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-sm"
                    >
                        <Plus size={16} />
                        Ajouter
                    </button>
                </div>

                <div className="grid gap-6">
                    <AnimatePresence>
                        {experiences.map((exp) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative p-5 bg-white border border-gray-200 rounded-2xl shadow-sm"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeExperience(exp.id)}
                                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                    <div className="space-y-4">
                                        {/* Entreprise */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Building2 size={14} className="text-gray-400" />
                                                Entreprise
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Ex: Cabinet Benjelloun"
                                                value={exp.entreprise}
                                                onChange={(e) => updateExperience(exp.id, 'entreprise', e.target.value)}
                                                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                            />
                                        </div>

                                        {/* Type de contrat */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <FileText size={14} className="text-gray-400" />
                                                Type d'expérience
                                            </label>
                                            <select
                                                value={exp.type}
                                                onChange={(e) => updateExperience(exp.id, 'type', e.target.value)}
                                                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                            >
                                                <option value="">Sélectionner un type</option>
                                                {typesExperience.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Poste occupé */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <Briefcase size={14} className="text-gray-400" />
                                                Poste
                                            </label>
                                            <select
                                                value={exp.poste}
                                                onChange={(e) => updateExperience(exp.id, 'poste', e.target.value)}
                                                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                            >
                                                <option value="">Sélectionner un poste</option>
                                                {postes.map(p => <option key={p} value={p}>{p}</option>)}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    Début
                                                </label>
                                                <input
                                                    type="month"
                                                    value={exp.debut}
                                                    onChange={(e) => updateExperience(exp.id, 'debut', e.target.value)}
                                                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    Fin
                                                </label>
                                                <input
                                                    type="month"
                                                    value={exp.fin}
                                                    onChange={(e) => updateExperience(exp.id, 'fin', e.target.value)}
                                                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {experiences.length === 0 && (
                        <div className="text-center py-6 border-2 border-dashed rounded-2xl border-gray-200">
                            <p className="text-sm text-gray-500">Aucune expérience ajoutée</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CandidatDetails;
