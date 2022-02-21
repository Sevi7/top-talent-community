import DynamoDb from 'aws-sdk/clients/dynamodb';
import { DynamoDbService } from './DynamoDbService';

const { AWS_SAM_LOCAL, MOCK_DYNAMODB_ENDPOINT } = process.env;

const ddbClient = new DynamoDb.DocumentClient({
  ...(AWS_SAM_LOCAL && {
    endpoint: 'http://dynamodb:8000',
  }),
  ...(MOCK_DYNAMODB_ENDPOINT && {
    endpoint: MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: 'local',
  }),
});

export const dynamoDbService = new DynamoDbService(ddbClient);
