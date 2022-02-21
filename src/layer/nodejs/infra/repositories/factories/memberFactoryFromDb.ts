import { Member } from '../../../domain/models/Member';

export const memberFactoryFromDb = {
  buildMember(memberDb: any): Member {
    return new Member({
      id: memberDb.id,
      name: memberDb.name,
      lastName: memberDb.lastName,
      birthDate: memberDb.birthDate,
      email: memberDb.email,
      phoneNumber: memberDb.phoneNumber,
      postalCode: memberDb.postalCode,
      city: memberDb.city,
      state: memberDb.state,
      country: memberDb.country,
    });
  },
};
