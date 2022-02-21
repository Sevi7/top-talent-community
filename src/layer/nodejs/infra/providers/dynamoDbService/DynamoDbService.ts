import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DbService } from '../../DbService';
import { DynamoDbError } from '../../../shared/errors/DynamoDbError';

export class DynamoDbService implements DbService {
  constructor(private ddbClient: DocumentClient) {}

  async get(params: DocumentClient.GetItemInput): Promise<any> {
    try {
      const getRes = await this.ddbClient.get(params).promise();
      return getRes.Item;
    } catch (error: unknown) {
      throw new DynamoDbError(error, params);
    }
  }

  async put(params: DocumentClient.PutItemInput): Promise<any> {
    try {
      const putRes = await this.ddbClient.put(params).promise();
      return putRes.Attributes;
    } catch (error: unknown) {
      throw new DynamoDbError(error, params);
    }
  }

  async query(params: DocumentClient.QueryInput): Promise<any> {
    try {
      const queryRes = await this.ddbClient.query(params).promise();
      return queryRes.Items;
    } catch (error: unknown) {
      throw new DynamoDbError(error, params);
    }
  }
}
