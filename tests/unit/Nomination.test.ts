import { Member } from '/opt/nodejs/domain/models/Member';
import { Nomination } from '/opt/nodejs/domain/models/Nomination';

describe('isRejected Nomination model method', () => {
  const referringMember = new Member({
    id: '4c4de188-2cf0-488d-a369-98fe42bf337b',
    name: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    birthDate: 1645387241000,
    phoneNumber: '612345678',
    postalCode: '38394',
    city: 'Valencia',
    country: 'Spain',
  });

  test('when overallScore is less than 8, it is rejected', () => {
    const nomination = new Nomination({
      id: 'dbaac58f-3a61-4132-9ed3-fe3e930985c7',
      email: 'paul@mckena.com',
      description: 'A very hardworking person',
      communityInvolvementScore: 6,
      overallScore: 7.5,
      referringMember,
    });
    expect(nomination.isRejected()).toBe(true);
  });

  test('when overAllScore is equal to 8, it is not rejected', () => {
    const nomination = new Nomination({
      id: 'dbaac58f-3a61-4132-9ed3-fe3e930985c7',
      email: 'paul@mckena.com',
      description: 'A very hardworking person',
      communityInvolvementScore: 6,
      overallScore: 8,
      referringMember,
    });
    expect(nomination.isRejected()).toBe(false);
  });

  test('when overAllScore is greater than 8, it is not rejected', () => {
    const nomination = new Nomination({
      id: 'dbaac58f-3a61-4132-9ed3-fe3e930985c7',
      email: 'paul@mckena.com',
      description: 'A very hardworking person',
      communityInvolvementScore: 6,
      overallScore: 8.5,
      referringMember,
    });
    expect(nomination.isRejected()).toBe(false);
  });
});
