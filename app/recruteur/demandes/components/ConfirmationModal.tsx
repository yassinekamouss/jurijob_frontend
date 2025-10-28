"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Info } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "delete" | "edit";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  onCancel,
  type = "delete",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-lg relative border border-gray-200"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Section 1: Icône */}
            <div className="flex justify-center pt-8 pb-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  type === "delete" ? "bg-red-100" : "bg-blue-100"
                }`}
              >
                {type === "delete" ? (
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                ) : (
                  <Info className="w-8 h-8 text-blue-600" />
                )}
              </div>
            </div>

            {/* Section 2: Message */}
            <div className="px-8 pb-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Section 3: Boutons */}
            <div className="flex gap-3 px-8 py-5 bg-gray-50 border-t border-gray-200 rounded-b-xl">
              <button
                onClick={onCancel}
                className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-700 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className={`flex-1 px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${
                  type === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;