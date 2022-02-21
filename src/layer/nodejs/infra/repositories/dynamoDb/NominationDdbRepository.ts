import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Nomination } from '../../../domain/models/Nomination';
import { DynamoDbService } from '../../providers/dynamoDbService/DynamoDbService';
import { nominationFactoryFromDb } from '../factories/nominationFactoryFromDb';
import { NominationRepository } from '../NominationRepository';

const { DYNAMO_TABLE_NAME_NOMINATIONS } = <
  {
    DYNAMO_TABLE_NAME_NOMINATIONS: string;
  }
>process.env;

export class NominationDdbRepository implements NominationRepository {
  constructor(private ddbService: DynamoDbService) {}

  async create(nomination: Nomination): Promise<Nomination> {
    const params: DocumentClient.PutItemInput = {
      TableName: DYNAMO_TABLE_NAME_NOMINATIONS,
      Item: nomination.toJson(),
      ConditionExpression: 'id <> :id',
      ExpressionAttributeValues: {
        ':id': nomination.id,
      },
    };
    await this.ddbService.put(params);
    return nomination;
  }

  async getByEmail(email: string): Promise<Nomination | null> {
    const params: DocumentClient.QueryInput = {
      TableName: DYNAMO_TABLE_NAME_NOMINATIONS,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };
    const nominationDb = (await this.ddbService.query(params))[0];
    if (!nominationDb) return null;
    const nomination = nominationFactoryFromDb.buildNomination(nominationDb);
    return nomination;
  }

  async getAll(): Promise<Nomination[]> {
    const nominationsDb = await this.ddbService.scan({ TableName: DYNAMO_TABLE_NAME_NOMINATIONS });
    const nominations = nominationsDb.map(nominationFactoryFromDb.buildNomination);
    return nominations;
  }
}
