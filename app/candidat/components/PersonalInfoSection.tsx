import { useEffect, useState } from "react";
import { Edit2, Check, X, User, Mail, Power } from "lucide-react";
import { PersonalInfo } from "@/app/types/personalInfo";
import NativeAvatar from "./NativeAvatar";

export function PersonalInfoSection({
  data,
  onSave,
}: {
  data: PersonalInfo;
  onSave: (data: PersonalInfo) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    setEditedData(data);
    setPreviewImage(null);
  }, [data]);

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(data);
    setIsEditing(false);
  };

  // Utiliser les données affichées selon le mode
  const viewData = isEditing ? editedData : data;

  const initials = `${data.prenom?.[0] || ""}${data.nom?.[0] || ""
    }`.toUpperCase();
  const editedInitials = `${editedData.prenom?.[0] || "?"}${editedData.nom?.[0] || "?"
    }`.toUpperCase();
  const displayInitials = isEditing ? editedInitials : initials;

  return (
    <section className="bg-white border-l-4 border-black shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-black font-semibold">Informations personnelles</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black w-full sm:w-auto">
            <Edit2 className="h-4 w-4 mr-2" />
            Modifier
          </button>
        )}
      </div>

      <div className="p-6">
        {/* Mode formulaire unique: champs désactivés en lecture */}
        <div className="space-y-6 max-w-3xl">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <NativeAvatar
                src={
                  previewImage
                    ? previewImage
                    : viewData.imageUrl instanceof File
                      ? URL.createObjectURL(viewData.imageUrl)
                      : viewData.imageUrl
                }
                fallbackText={displayInitials}
                className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-gray-300"
                fallbackClassName="bg-gray-900 text-white text-xl"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">Aperçu</p>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="imageFile"
                  className="text-sm font-medium text-gray-700">
                  Photo de profil
                </label>
                <input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  disabled={!isEditing}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && isEditing) {
                      const previewUrl = URL.createObjectURL(file);
                      setPreviewImage(previewUrl);
                      setEditedData({ ...editedData, imageUrl: file });
                    }
                  }}
                  className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors ${isEditing
                      ? "border-gray-300"
                      : "border-gray-200 bg-gray-50 cursor-not-allowed"
                    }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label
                htmlFor="prenom"
                className="text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                id="prenom"
                value={viewData.prenom}
                onChange={(e) =>
                  isEditing &&
                  setEditedData({ ...editedData, prenom: e.target.value })
                }
                disabled={!isEditing}
                className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors ${isEditing
                    ? "border-gray-300"
                    : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="nom"
                className="text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                id="nom"
                value={viewData.nom}
                onChange={(e) =>
                  isEditing &&
                  setEditedData({ ...editedData, nom: e.target.value })
                }
                disabled={!isEditing}
                className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors ${isEditing
                    ? "border-gray-300"
                    : "border-gray-200 bg-gray-50 cursor-not-allowed"
                  }`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700">
              Email professionnel
            </label>
            <input
              id="email"
              type="email"
              value={viewData.email}
              onChange={(e) =>
                isEditing &&
                setEditedData({ ...editedData, email: e.target.value })
              }
              disabled={!isEditing}
              className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors ${isEditing
                  ? "border-gray-300"
                  : "border-gray-200 bg-gray-50 cursor-not-allowed"
                }`}
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Power
                  className={`h-5 w-5 ${viewData.isActive ? "text-green-600" : "text-gray-400"
                    }`}
                />
                <div>
                  <p className="text-sm text-gray-900">Statut du profil</p>
                  <p className="text-xs text-gray-500">
                    {viewData.isActive
                      ? "Votre profil est visible par les recruteurs"
                      : "Votre profil est masqué"}
                  </p>
                </div>
              </div>
              {/* Switch désactivé en lecture */}
              <button
                type="button"
                role="switch"
                aria-checked={viewData.isActive}
                disabled={!isEditing}
                onClick={() =>
                  isEditing &&
                  setEditedData({
                    ...editedData,
                    isActive: !editedData.isActive,
                  })
                }
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${viewData.isActive ? "bg-black" : "bg-gray-200"
                  } ${!isEditing ? "opacity-60 cursor-not-allowed" : ""}`}>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${viewData.isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom-2">
          <div className="max-w-7xl mx-auto flex items-center justify-end gap-3 px-4 sm:px-6">
            <span className="hidden sm:inline-block mr-auto text-sm font-medium text-gray-500">
              Modifications en cours...
            </span>
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black border border-gray-200 bg-white w-full sm:w-auto">
              <X className="h-4 w-4 mr-2" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium transition-colors rounded-md bg-black text-white hover:bg-gray-800 w-full sm:w-auto shadow-sm">
              <Check className="h-4 w-4 mr-2" />
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
