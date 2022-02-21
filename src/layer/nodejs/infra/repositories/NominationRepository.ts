import { Nomination } from '../../domain/models/Nomination';

export interface NominationRepository {
  create(nomination: Nomination): Promise<Nomination>;
  getByEmail(email: string): Promise<Nomination | null>;
}
