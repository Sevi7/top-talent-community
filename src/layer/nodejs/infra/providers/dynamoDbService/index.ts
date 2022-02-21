import DynamoDb from 'aws-sdk/clients/dynamodb';
import { DynamoDbService } from './DynamoDbService';

const { AWS_SAM_LOCAL } = process.env;

const ddbClient = new DynamoDb.DocumentClient({
  ...(AWS_SAM_LOCAL && {
    endpoint: 'http://dynamodb:8000',
  }),
});

export const dynamoDbService = new DynamoDbService(ddbClient);
