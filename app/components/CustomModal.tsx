"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, X, AlertCircle } from "lucide-react";

interface CustomModalProps {
  isOpen: boolean;
  type?: "success" | "error";
  title: string;
  message: string;
  confirmText?: string;
  onConfirm?: () => void;
  onClose: () => void;
  showLoading?: boolean;
  loadingDuration?: number;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  type = "success",
  title,
  message,
  confirmText = "OK",
  onConfirm,
  onClose,
  showLoading = false,
  loadingDuration = 1500,
}) => {
  const [isLoading, setIsLoading] = useState(showLoading);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      
      if (showLoading) {
        setIsLoading(true);
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, loadingDuration);
        return () => clearTimeout(timer);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen, showLoading, loadingDuration]);

  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 px-4 transition-all duration-300 ${
        isVisible ? 'bg-slate-900/40 backdrop-blur-sm' : 'bg-slate-900/0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barre de couleur subtile en haut */}
        <div className={`h-1 w-full ${isSuccess ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-500 to-red-500'}`} />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="mb-10">
              <img
                src="/images/logo_jurijob.webp"
                alt="JuriJob"
                className="h-10 w-auto object-contain opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            {/* Spinner moderne */}
            <div className="relative w-14 h-14 mb-6">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-slate-800 rounded-full border-t-transparent animate-spin"></div>
            </div>
            
            <p className="text-slate-600 text-sm font-medium tracking-wide">Traitement en cours...</p>
          </div>
        ) : (
          <>
            {/* Bouton fermer élégant */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 z-10"
              aria-label="Fermer"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="flex flex-col items-center px-8 pt-10 pb-8">
              {/* Logo avec effet subtil */}
              <div className="mb-8">
                <img
                  src="/images/logo_jurijob.webp"
                  alt="JuriJob"
                  className="h-8 w-auto object-contain opacity-90"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Icône avec animation et design moderne */}
              <div className="mb-6 relative">
                {isSuccess ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center border border-emerald-100 shadow-lg shadow-emerald-500/10">
                      <CheckCircle className="text-emerald-600 w-10 h-10" strokeWidth={2.5} />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-rose-50 to-red-50 flex items-center justify-center border border-rose-100 shadow-lg shadow-rose-500/10">
                      <AlertCircle className="text-rose-600 w-10 h-10" strokeWidth={2.5} />
                    </div>
                  </div>
                )}
              </div>

              {/* Titre avec typographie élégante */}
              <h2 className="text-2xl font-bold mb-3 text-slate-900 text-center tracking-tight">
                {title}
              </h2>
              
              {/* Message avec meilleure lisibilité */}
              <p className="text-slate-600 text-base mb-8 text-center leading-relaxed max-w-sm">
                {message}
              </p>

              {/* Bouton moderne avec effet */}
              <button
                onClick={onConfirm || onClose}
                className={`w-full px-6 py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] ${
                  isSuccess 
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/30" 
                    : "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-rose-500/30"
                }`}
              >
                {confirmText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomModal;