import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { dynamoDbService } from '/opt/nodejs/infra/providers/dynamoDbService';
import { lambdaHandler } from '../../src/functions/nominatePeer';

const { DYNAMO_TABLE_NAME_MEMBERS } = <
  {
    DYNAMO_TABLE_NAME_MEMBERS: string;
  }
>process.env;

describe('Nominate Peer', () => {
  describe('one member is in  the database', () => {
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
      dynamoDbService.put({
        TableName: DYNAMO_TABLE_NAME_MEMBERS,
        Item: johnDoe,
      });
    });

    describe('valid input', () => {
      test('nomination is not rejected', async () => {
        const event = <APIGatewayProxyEventV2>(<unknown>{
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YzRkZTE4OC0yY2YwLTQ4OGQtYTM2OS05OGZlNDJiZjMzN2IiLCJleHBpcmF0aW9uRGF0ZSI6MTA0MTM3OTIwMDAwMDB9.LNKeFzQU-0lUvYkTdDOacQN-HNDkpU9_-ntIKNjSZpI',
          },
          body: JSON.stringify({
            email: 'paul@mckena.com',
            description: 'A very hardworking person',
            communityInvolvementScore: 8,
            overallScore: 8.5,
          }),
        });
        const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body || '')).toEqual({
          id: expect.any(String),
          email: 'paul@mckena.com',
          description: 'A very hardworking person',
          communityInvolvementScore: 8,
          overallScore: 8.5,
          referringMember: johnDoe,
        });
      });
    });

    describe('invalid input', () => {
      test('does not meet the constraints', async () => {
        const event = <APIGatewayProxyEventV2>(<unknown>{
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YzRkZTE4OC0yY2YwLTQ4OGQtYTM2OS05OGZlNDJiZjMzN2IiLCJleHBpcmF0aW9uRGF0ZSI6MTA0MTM3OTIwMDAwMDB9.LNKeFzQU-0lUvYkTdDOacQN-HNDkpU9_-ntIKNjSZpI',
          },
          body: JSON.stringify({
            email: 'paul@mckena.com',
            description: 'A very hardworking person',
            communityInvolvementScore: 11,
            overallScore: 8.5,
          }),
        });
        const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
        expect(res.statusCode).toBe(400);
        expect(JSON.parse(res.body || '')).toEqual({
          message: '"communityInvolvementScore" must be less than or equal to 10',
        });
      });

      test('invalidToken', async () => {
        const event = <APIGatewayProxyEventV2>(<unknown>{
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0YzRkZTE4OC0yY2YwLTQ4OGQtYTM2OS05OGZlNDJiZjMzN2IiLCJleHBpcmF0aW9uRGF0ZSI6MTA0MTM3OTIwMDAwMDB9.QQO1fvaRj50M9XhBrJUk3G7JyHaHpaqwxaJcWap4714',
          },
          body: JSON.stringify({
            email: 'paul@mckena.com',
            description: 'A very hardworking person',
            communityInvolvementScore: 8,
            overallScore: 8.5,
          }),
        });
        const res = <APIGatewayProxyStructuredResultV2>await lambdaHandler(event);
        expect(res.statusCode).toBe(401);
        expect(JSON.parse(res.body || '')).toEqual({
          message: 'Unauthorized',
        });
      });
    });
  });
});
