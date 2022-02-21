import { NominatePeerDto } from '../../src/functions/nominatePeer/NominatePeerDto';
import { NominatePeerUseCase } from '../../src/functions/nominatePeer/NominatePeerUseCase';
import { dynamoDbService } from '/opt/nodejs/infra/providers/dynamoDbService';
import { nominationRepository, memberRepository } from '/opt/nodejs/infra/repositories/dynamoDb';
import { AlreadyExistsError } from '/opt/nodejs/shared/errors/AlreadyExistsError';
import { EmailMembersSesRepository } from '/opt/nodejs/infra/repositories/simpleEmailService/EmailMembersSesRepository';
import { SimpleEmailService } from '/opt/nodejs/infra/providers/simpleEmailService/SimpleEmailService';
import emailSesParams from './fixtures/emailSesParams.json';

const { DYNAMO_TABLE_NAME_MEMBERS, DYNAMO_TABLE_NAME_NOMINATIONS } = <
  {
    DYNAMO_TABLE_NAME_MEMBERS: string;
    DYNAMO_TABLE_NAME_NOMINATIONS: string;
  }
>process.env;

const simpleEmailServiceMock = {
  sendEmail: jest.fn(() => 'Send Email Mocked'),
} as unknown as SimpleEmailService;

const emailMembersRepository = new EmailMembersSesRepository(simpleEmailServiceMock);

describe('Nominate Peer Use Case', () => {
  describe('One member is in the database', () => {
    const johnDoe = {
      id: '4c4de188-2cf0-488d-a369-98fe42bf337b',
      name: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      birthDate: 1645387241000,
      phoneNumber: '612345678',
      postalCode: '38394',
      city: 'Valencia',
      country: 'Spain',
    };

    beforeEach(async () => {
      await dynamoDbService.put({
        TableName: DYNAMO_TABLE_NAME_MEMBERS,
        Item: johnDoe,
      });
    });

    describe('nomination with same email does not exist', () => {
      test('nomination is not rejected', async () => {
        const useCase = new NominatePeerUseCase(
          nominationRepository,
          memberRepository,
          emailMembersRepository
        );
        const req: NominatePeerDto = {
          email: 'paul@mckena.com',
          description: 'A very hardworking person',
          communityInvolvementScore: 8,
          overallScore: 8.5,
          referringMemberId: '4c4de188-2cf0-488d-a369-98fe42bf337b',
        };

        const res = await useCase.execute(req);
        expect(res.toJson()).toEqual({
          id: expect.any(String),
          email: 'paul@mckena.com',
          description: 'A very hardworking person',
          communityInvolvementScore: 8,
          overallScore: 8.5,
          referringMember: johnDoe,
        });
      });

      test('nomination is rejected, emails are sent', async () => {
        const useCase = new NominatePeerUseCase(
          nominationRepository,
          memberRepository,
          emailMembersRepository
        );
        const req: NominatePeerDto = {
          email: 'paul@mckena.com',
          description: 'A very hardworking person',
          communityInvolvementScore: 8,
          overallScore: 7.5,
          referringMemberId: '4c4de188-2cf0-488d-a369-98fe42bf337b',
        };

        const res = await useCase.execute(req);
        expect(res.toJson()).toEqual({
          id: expect.any(String),
          email: 'paul@mckena.com',
          description: 'A very hardworking person',
          communityInvolvementScore: 8,
          overallScore: 7.5,
          referringMember: johnDoe,
        });
        expect(simpleEmailServiceMock.sendEmail).toHaveBeenCalledWith(emailSesParams);
      });
    });

    describe('nomination with same email already exists', () => {
      beforeEach(async () => {
        await dynamoDbService.put({
          TableName: DYNAMO_TABLE_NAME_NOMINATIONS,
          Item: {
            id: 'add539ec-799a-4507-b252-b6fe570e824a',
            email: 'paul@mckena.com',
            description: 'He is very nice',
            communityInvolvementScore: 9,
            overallScore: 8,
            referringMember: johnDoe,
          },
        });
      });
      test('throws AlreadyExistsError', async () => {
        const useCase = new NominatePeerUseCase(
          nominationRepository,
          memberRepository,
          emailMembersRepository
        );
        const req: NominatePeerDto = {
          email: 'paul@mckena.com',
          description: 'A very hardworking person',
          communityInvolvementScore: 8,
          overallScore: 8.5,
          referringMemberId: '4c4de188-2cf0-488d-a369-98fe42bf337b',
        };
        await expect(() => useCase.execute(req)).rejects.toThrow(AlreadyExistsError);
      });
    });
  });
});
