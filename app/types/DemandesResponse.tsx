import Demande from "./Demande";

export default interface DemandesResponse {
  message: string;
  demandes: Demande[];
  total: number;
  page: number;
  limit: number;
}
