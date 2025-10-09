import { useState } from "react";
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

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(data);
    setIsEditing(false);
  };

  const initials = `${data.prenom?.[0] || ""}${
    data.nom?.[0] || ""
  }`.toUpperCase();
  const editedInitials = `${editedData.prenom?.[0] || "?"}${
    editedData.nom?.[0] || "?"
  }`.toUpperCase();

  return (
    <section className="bg-white border-l-4 border-black shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-black font-semibold">Informations personnelles</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black">
            <Edit2 className="h-4 w-4 mr-2" />
            Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md text-gray-600 hover:text-black">
              <X className="h-4 w-4 mr-1" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium transition-colors rounded-md bg-black text-white hover:bg-gray-800">
              <Check className="h-4 w-4 mr-1" />
              Enregistrer
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        {!isEditing ? (
          <div className="flex items-start gap-6">
            <NativeAvatar
              src={data.imageUrl}
              fallbackText={initials}
              className="h-24 w-24 border-2 border-gray-200 ring-4 ring-gray-50"
              fallbackClassName="bg-gray-900 text-white text-xl"
            />
            <div className="flex-1 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <User className="h-3.5 w-3.5" />
                    <span>Nom complet</span>
                  </div>
                  <p className="text-black pl-5">
                    {data.prenom} {data.nom}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Mail className="h-3.5 w-3.5" />
                    <span>Email</span>
                  </div>
                  <p className="text-black pl-5">{data.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <Power
                  className={`h-4 w-4 ${
                    data.isActive ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span className="text-sm text-gray-600">Profil</span>
                <span
                  className={`text-sm ${
                    data.isActive ? "text-green-600" : "text-gray-500"
                  }`}>
                  {data.isActive ? "Actif" : "Inactif"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          // --- Mode Édition ---
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <NativeAvatar
                  src={editedData.imageUrl}
                  fallbackText={editedInitials}
                  className="h-24 w-24 border-2 border-gray-300"
                  fallbackClassName="bg-gray-900 text-white text-xl"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">Aperçu</p>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="imageUrl"
                    className="text-sm font-medium text-gray-700">
                    Photo de profil
                  </label>
                  <input
                    id="imageUrl"
                    value={editedData.imageUrl || ""}
                    onChange={(e) =>
                      setEditedData({ ...editedData, imageUrl: e.target.value })
                    }
                    placeholder="https://exemple.com/photo.jpg"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label
                  htmlFor="prenom"
                  className="text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  id="prenom"
                  value={editedData.prenom}
                  onChange={(e) =>
                    setEditedData({ ...editedData, prenom: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
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
                  value={editedData.nom}
                  onChange={(e) =>
                    setEditedData({ ...editedData, nom: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
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
                value={editedData.email}
                onChange={(e) =>
                  setEditedData({ ...editedData, email: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
              />
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Power
                    className={`h-5 w-5 ${
                      editedData.isActive ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm text-gray-900">Statut du profil</p>
                    <p className="text-xs text-gray-500">
                      {editedData.isActive
                        ? "Votre profil est visible par les recruteurs"
                        : "Votre profil est masqué"}
                    </p>
                  </div>
                </div>
                {/* Remplacement du Switch par un bouton stylisé */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={editedData.isActive}
                  onClick={() =>
                    setEditedData({
                      ...editedData,
                      isActive: !editedData.isActive,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                    editedData.isActive ? "bg-black" : "bg-gray-200"
                  }`}>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      editedData.isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
