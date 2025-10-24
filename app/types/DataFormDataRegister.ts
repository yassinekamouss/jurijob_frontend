import { Language } from "./searchPreferences";

export interface User {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  imageUrl?: string | File;
  password: string; // optionnel si tu ne l’envoies pas côté frontend
  confirmPassword: string; // uniquement pour validation locale
  role: "candidat" | "recruteur" ;
}

export interface Candidat {
  // posteActuel: string;
  niveauExperience: string;
  formationJuridique: string;
  specialisations: string[];
  langues: Language[];
  domainExperiences: string[],
  PosteRecherche: string,
  typeTravailRecherche: string,
  villesTravailRecherche: string[],
  modeTravailRecherche: string
}

export interface Recruteur {
  userId?: string;
  nomEntreprise: string;//ok
  poste: string;
  typeOrganisation: string;//ok
  tailleEntreprise: string;//ok
  siteWeb?: string;//ok
  // recrutementFocus?: string[];//ok
  // recrutementUrgent?: boolean;//ok
  // profilsInternationaux?: boolean;//ok
  ville: string;//ok
  codePostal: string;//ok
}

export default interface FormData {
  user: User;
  candidat?: Candidat;
  recruteur?: Recruteur; // optionnel si tu veux gérer les deux types dans le même formData
}
