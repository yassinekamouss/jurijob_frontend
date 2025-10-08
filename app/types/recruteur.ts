import UserBase from "./userBase";

export default interface Recruteur extends UserBase {
  userId: string;
  nomEntreprise: string;
  poste: string;
  typeOrganisation: string;
  tailleEntreprise: string;
  siteWeb?: string;
  ville: string;
  codePostal: string;
}
