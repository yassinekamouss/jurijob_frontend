import { Language } from "./searchPreferences";
import UserBase from "./userBase";
import { Formation, Experience } from "./DataFormDataRegister";


export default interface Candidat extends UserBase {
  userId: string;
  PosteRecherche: string;
  niveauExperience: string;
  formationJuridique: string;
  specialisations: string[];
  langues: Language[];
  domainExperiences: string[],
  typeTravailRecherche: string[],
  villesTravailRecherche: string[],
  modeTravailRecherche: string[],
  formations: Formation[];
  experiences: Experience[];
}
