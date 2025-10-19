export default interface Demande {
  _id: string;
  titre: string;
  description?: string;
  posteRecherche: string[];
  niveauExperience: string[];
  typeTravail: string[];
  modeTravail: string[];
  villesTravail?: string[];
  formationJuridique: string[];
  specialisations?: string[];
  domainExperiences?: string[];
  langues?: { nom: string; niveau: string }[];
  statut: string;
}
