import UserBase from "./userBase";


export default interface Candidat extends UserBase {
  userId: string;
  posteActuel: string;
  niveauExperience: string;
  formationJuridique: string;
  specialisations: string[];
  langues: string[];
  imageUrl?: string;
  domainExperiences: string[],
  typeTravailRecherche: string,
  villesTravailRecherche: string[],
  modeTravailRecherche: string
}