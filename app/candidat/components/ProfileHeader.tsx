import React from "react";

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  isActive: boolean;
  onStatusChange: (active: boolean) => void;
}

export function ProfileHeader({
  firstName,
  lastName,
  email,
  avatarUrl,
  isActive,
  onStatusChange,
}: ProfileHeaderProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-gray-700 text-2xl font-semibold">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${firstName} ${lastName}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-gray-900 text-xl font-semibold">
              {firstName} {lastName}
            </h1>
            <p className="text-gray-600 mt-1">{email}</p>

            {/* Status Toggle */}
            <div className="flex items-center gap-3 mt-4">
              <label htmlFor="profile-status" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="profile-status"
                  checked={isActive}
                  onChange={(e) => onStatusChange(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-900 transition-colors"></div>
                <div className="absolute left-0.5 top-0.5 bg-white h-5 w-5 rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>

              <label
                htmlFor="profile-status"
                className="text-gray-700 cursor-pointer select-none"
              >
                {isActive ? "Profil actif" : "Profil archivé"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
