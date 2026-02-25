import React, { useState, useEffect } from "react";
import {
    Edit2,
    Check,
    X,
    GraduationCap,
    Briefcase,
    Trash2,
    Plus,
    Building2,
    BookOpen,
    FileText,
    Calendar,
    Upload,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    //  Candidat,
     Formation, Experience } from "@/app/types/DataFormDataRegister";
import {
    formationsJuridiques,
    ecolesMaroc,
    specialisations,
    typesExperience,
    postes
} from "@/app/constants/options";

interface ParcoursSectionProps {
    formations: Formation[];
    experiences: Experience[];
    onSave: (formations: Formation[], experiences: Experience[]) => void;
}

export function ParcoursSection({ formations, experiences, onSave }: ParcoursSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFormations, setEditedFormations] = useState<Formation[]>([]);
    const [editedExperiences, setEditedExperiences] = useState<Experience[]>([]);
    const [expandedFormations, setExpandedFormations] = useState<Record<string, boolean>>({});
    const [expandedExperiences, setExpandedExperiences] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setEditedFormations([...formations]);
        setEditedExperiences([...experiences]);
    }, [formations, experiences]);

    const handleSave = () => {
        onSave(editedFormations, editedExperiences);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedFormations([...formations]);
        setEditedExperiences([...experiences]);
        setIsEditing(false);
    };

    // Toggle helpers
    const toggleFormation = (id: string, e: React.MouseEvent) => {
        setExpandedFormations(prev => ({ ...prev, [id]: prev[id] === false ? true : false }));
    };

    const toggleExperience = (id: string, e: React.MouseEvent) => {
        setExpandedExperiences(prev => ({ ...prev, [id]: prev[id] === false ? true : false }));
    };

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
        setEditedFormations([...editedFormations, newFormation]);
    };

    const removeFormation = (id: string) => {
        setEditedFormations(editedFormations.filter(f => f.id !== id));
    };

    const updateFormation = (id: string, field: keyof Formation, value: any) => {
        setEditedFormations(editedFormations.map(f => f.id === id ? { ...f, [field]: value } : f));
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
        setEditedExperiences([...editedExperiences, newExperience]);
    };

    const removeExperience = (id: string) => {
        setEditedExperiences(editedExperiences.filter(e => e.id !== id));
    };

    const updateExperience = (id: string, field: keyof Experience, value: any) => {
        setEditedExperiences(editedExperiences.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    const displayFormations = isEditing ? editedFormations : formations;
    const displayExperiences = isEditing ? editedExperiences : experiences;

    return (
        <div className="space-y-6">
            {/* SECTION FORMATIONS */}
            <section className="bg-white border-l-4 border-blue-600 shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <GraduationCap size={20} />
                        </div>
                        <h2 className="text-black font-semibold">Formations</h2>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black w-full sm:w-auto">
                            <Edit2 className="h-4 w-4 mr-2" />
                            Modifier
                        </button>
                    ) : (
                        <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                            <button
                                onClick={addFormation}
                                className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black w-full sm:w-auto">
                                <Plus className="h-4 w-4 mr-1" />
                                Ajouter
                            </button>
                            <button
                                onClick={handleCancel}
                                className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black w-full sm:w-auto">
                                <X className="h-4 w-4 mr-1" />
                                Annuler
                            </button>
                            <button
                                onClick={handleSave}
                                className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors rounded-md bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
                                <Check className="h-4 w-4 mr-1" />
                                Enregistrer
                            </button>
                        </div>
                    )}
                </div>

                <div className="p-6 grid gap-6">
                    <AnimatePresence>
                        {displayFormations.map((formation) => (
                            <motion.div
                                key={formation.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative p-5 bg-white border border-gray-200 rounded-2xl shadow-sm"
                            >
                                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) => toggleFormation(formation.id, e)}
                                            className="text-gray-500 hover:text-gray-700 transition"
                                        >
                                            {expandedFormations[formation.id] !== false ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <h5 className="font-medium text-gray-800">
                                            {formation.domaine || formation.ecole ? `${formation.domaine} - ${formation.ecole}` : "Nouvelle Formation"}
                                        </h5>
                                    </div>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => removeFormation(formation.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                {expandedFormations[formation.id] !== false && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                        <div className="space-y-4">
                                            {/* Ecole / Université */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Building2 size={14} className="text-gray-400" />
                                                    École / Université
                                                </label>
                                                {isEditing ? (
                                                    <select
                                                        value={formation.ecole}
                                                        onChange={(e) => updateFormation(formation.id, 'ecole', e.target.value)}
                                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                    >
                                                        <option value="">Sélectionner une institution</option>
                                                        {ecolesMaroc.map(e => <option key={e} value={e}>{e}</option>)}
                                                    </select>
                                                ) : (
                                                    <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{formation.ecole || '-'}</p>
                                                )}
                                            </div>

                                            {/* Niveau d'études */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <BookOpen size={14} className="text-gray-400" />
                                                    Niveau d'études
                                                </label>
                                                {isEditing ? (
                                                    <select
                                                        value={formation.niveau}
                                                        onChange={(e) => updateFormation(formation.id, 'niveau', e.target.value)}
                                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                    >
                                                        <option value="">Sélectionner un niveau</option>
                                                        {formationsJuridiques.map(n => <option key={n} value={n}>{n}</option>)}
                                                    </select>
                                                ) : (
                                                    <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{formation.niveau || '-'}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Domaine Juridique */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <FileText size={14} className="text-gray-400" />
                                                    Domaine d'études
                                                </label>
                                                {isEditing ? (
                                                    <select
                                                        value={formation.domaine}
                                                        onChange={(e) => updateFormation(formation.id, 'domaine', e.target.value)}
                                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                    >
                                                        <option value="">Sélectionner un domaine</option>
                                                        {specialisations.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                ) : (
                                                    <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{formation.domaine || '-'}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                        <Calendar size={14} className="text-gray-400" />
                                                        Année Début
                                                    </label>
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            min="1980" max="2030" placeholder="Année"
                                                            value={formation.anneeDebut}
                                                            onChange={(e) => updateFormation(formation.id, 'anneeDebut', e.target.value)}
                                                            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                        />
                                                    ) : (
                                                        <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{formation.anneeDebut || '-'}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                        <Calendar size={14} className="text-gray-400" />
                                                        Année Fin
                                                    </label>
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            min="1980" max="2035" placeholder="Année"
                                                            value={formation.anneeFin}
                                                            onChange={(e) => updateFormation(formation.id, 'anneeFin', e.target.value)}
                                                            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                        />
                                                    ) : (
                                                        <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{formation.anneeFin || '-'}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* File Upload for Diploma */}
                                        <div className="md:col-span-2">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Diplôme (Format PDF)</label>
                                                <div className={`relative border-2 ${isEditing ? 'border-dashed' : 'border-solid'} rounded-xl p-3 transition-all ${formation.diplomaFile ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}`}>
                                                    {isEditing && (
                                                        <input
                                                            type="file"
                                                            accept=".pdf"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0] || null;
                                                                if (file && file.type !== 'application/pdf') {
                                                                    alert("Veuillez sélectionner un fichier PDF uniquement.");
                                                                    return;
                                                                }
                                                                updateFormation(formation.id, 'diplomaFile', file);
                                                            }}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        />
                                                    )}
                                                    <div className="flex items-center justify-center gap-3">
                                                        {formation.diplomaFile ? (
                                                            <>
                                                                <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                                                                    <FileText size={18} />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs font-medium text-green-800 truncate">
                                                                        {typeof formation.diplomaFile === 'string' ? "Fichier actuel" : formation.diplomaFile.name}
                                                                    </p>
                                                                    {typeof formation.diplomaFile !== 'string' && (
                                                                        <p className="text-[10px] text-green-600">{(formation.diplomaFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                                    )}
                                                                </div>
                                                                {isEditing && (
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
                                                                )}
                                                                {!isEditing && typeof formation.diplomaFile === 'string' && (
                                                                    <a href={`${process.env.NEXT_PUBLIC_API_URL}${formation.diplomaFile}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline z-20 relative">
                                                                        Voir le document
                                                                    </a>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Upload size={18} className="text-gray-400" />
                                                                <span className="text-xs text-gray-500 font-medium">
                                                                    {isEditing ? "Glissez votre diplôme ou cliquez pour parcourir" : "Aucun diplôme joint"}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {displayFormations.length === 0 && (
                        <div className="text-center py-6 border-2 border-dashed rounded-2xl border-gray-200">
                            <p className="text-sm text-gray-500">Aucune formation renseignée</p>
                        </div>
                    )}
                </div>
            </section>

            {/* SECTION EXPERIENCES */}
            <section className="bg-white border-l-4 border-purple-600 shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Briefcase size={20} />
                        </div>
                        <h2 className="text-black font-semibold">Expériences</h2>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black w-full sm:w-auto">
                            <Edit2 className="h-4 w-4 mr-2" />
                            Modifier
                        </button>
                    ) : (
                        <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                            <button
                                onClick={addExperience}
                                className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black w-full sm:w-auto">
                                <Plus className="h-4 w-4 mr-1" />
                                Ajouter
                            </button>
                            <button
                                onClick={handleCancel}
                                className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black w-full sm:w-auto">
                                <X className="h-4 w-4 mr-1" />
                                Annuler
                            </button>
                            <button
                                onClick={handleSave}
                                className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors rounded-md bg-purple-600 text-white hover:bg-purple-700 w-full sm:w-auto">
                                <Check className="h-4 w-4 mr-1" />
                                Enregistrer
                            </button>
                        </div>
                    )}
                </div>

                <div className="p-6 grid gap-6">
                    <AnimatePresence>
                        {displayExperiences.map((exp) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative p-5 bg-white border border-gray-200 rounded-2xl shadow-sm"
                            >
                                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) => toggleExperience(exp.id, e)}
                                            className="text-gray-500 hover:text-gray-700 transition"
                                        >
                                            {expandedExperiences[exp.id] !== false ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                        <h5 className="font-medium text-gray-800">
                                            {exp.poste || exp.entreprise ? `${exp.poste} chez ${exp.entreprise}` : "Nouvelle Expérience"}
                                        </h5>
                                    </div>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => removeExperience(exp.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                {expandedExperiences[exp.id] !== false && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                        <div className="space-y-4">
                                            {/* Entreprise */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Building2 size={14} className="text-gray-400" />
                                                    Entreprise
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Ex: Cabinet Benjelloun"
                                                        value={exp.entreprise}
                                                        onChange={(e) => updateExperience(exp.id, 'entreprise', e.target.value)}
                                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                    />
                                                ) : (
                                                    <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{exp.entreprise || '-'}</p>
                                                )}
                                            </div>

                                            {/* Type de contrat */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <FileText size={14} className="text-gray-400" />
                                                    Type d'expérience
                                                </label>
                                                {isEditing ? (
                                                    <select
                                                        value={exp.type}
                                                        onChange={(e) => updateExperience(exp.id, 'type', e.target.value)}
                                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                    >
                                                        <option value="">Sélectionner un type</option>
                                                        {typesExperience.map(t => <option key={t} value={t}>{t}</option>)}
                                                    </select>
                                                ) : (
                                                    <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{exp.type || '-'}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Poste occupé */}
                                            <div className="space-y-1.5">
                                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Briefcase size={14} className="text-gray-400" />
                                                    Poste
                                                </label>
                                                {isEditing ? (
                                                    <select
                                                        value={exp.poste}
                                                        onChange={(e) => updateExperience(exp.id, 'poste', e.target.value)}
                                                        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                    >
                                                        <option value="">Sélectionner un poste</option>
                                                        {postes.map(p => <option key={p} value={p}>{p}</option>)}
                                                    </select>
                                                ) : (
                                                    <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{exp.poste || '-'}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                        <Calendar size={14} className="text-gray-400" />
                                                        Début
                                                    </label>
                                                    {isEditing ? (
                                                        <input
                                                            type="month"
                                                            value={exp.debut}
                                                            onChange={(e) => updateExperience(exp.id, 'debut', e.target.value)}
                                                            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                        />
                                                    ) : (
                                                        <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{exp.debut || '-'}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                        <Calendar size={14} className="text-gray-400" />
                                                        Fin
                                                    </label>
                                                    {isEditing ? (
                                                        <input
                                                            type="month"
                                                            value={exp.fin}
                                                            onChange={(e) => updateExperience(exp.id, 'fin', e.target.value)}
                                                            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-sm"
                                                        />
                                                    ) : (
                                                        <p className="text-sm text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-transparent">{exp.fin || '-'}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {displayExperiences.length === 0 && (
                        <div className="text-center py-6 border-2 border-dashed rounded-2xl border-gray-200">
                            <p className="text-sm text-gray-500">Aucune expérience renseignée</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
