export default interface UserBase {
  _id?: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  password?: string; // optionnel 
  imageUrl?: string;
  role: "candidat" | "recruteur" | "admin";
  isActive?: boolean;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
