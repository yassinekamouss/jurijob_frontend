import { Language } from "./searchPreferences";
import UserBase from "./userBase";


export default interface Candidat extends UserBase {
  userId: string;
  PosteRecherche: string;
  niveauExperience: string;
  formationJuridique: string;
  specialisations: string[];
  langues: Language[];
  imageUrl?: string;
  domainExperiences: string[],
  typeTravailRecherche: string,
  villesTravailRecherche: string[],
  modeTravailRecherche: string
}
