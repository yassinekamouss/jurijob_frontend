export interface StatsRecruteurData {
  totalDemandes: number;
  demandesOuvertes: number;
  demandesFermees: number;
  modeTravailStats: Record<string, number>; //Les valeurs possibles pour le cle -> Hybride , Sur site , Télétravail
  typeTravailStats: Record<string, number>; //De meme ->  Embauche , Stage préembauche , Stage
}