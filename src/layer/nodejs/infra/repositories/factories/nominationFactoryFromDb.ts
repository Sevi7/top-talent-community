import { Nomination } from '../../../domain/models/Nomination';
import { memberFactoryFromDb } from './memberFactoryFromDb';

export const nominationFactoryFromDb = {
  buildNomination(nominationDb: any): Nomination {
    return new Nomination({
      id: nominationDb.id,
      email: nominationDb.email,
      description: nominationDb.description,
      communityInvolvementScore: nominationDb.communityInvolvementScore,
      overallScore: nominationDb.overallScore,
      referringMember: memberFactoryFromDb.buildMember(nominationDb.referringMember),
    });
  },
};
