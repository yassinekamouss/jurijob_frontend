export type PersonalInfo = {
  nom: string;
  prenom: string;
  email: string;
  imageUrl?: string | File;
  isActive: boolean;
  isArchived: boolean;
};