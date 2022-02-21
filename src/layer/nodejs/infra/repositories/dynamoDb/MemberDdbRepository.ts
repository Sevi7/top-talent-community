import { Member } from '../../../domain/models/Member';
import { DynamoDbService } from '../../providers/dynamoDbService/DynamoDbService';
import { memberFactoryFromDb } from '../factories/memberFactoryFromDb';
import { MemberRepository } from '../MemberRepository';

const { DYNAMO_TABLE_NAME_MEMBERS } = <
  {
    DYNAMO_TABLE_NAME_MEMBERS: string;
  }
>process.env;

export class MemberDdbRepository implements MemberRepository {
  constructor(private ddbService: DynamoDbService) {}

  async get(id: string): Promise<Member | null> {
    const memberDb = await this.ddbService.get({
      TableName: DYNAMO_TABLE_NAME_MEMBERS,
      Key: { id },
    });
    if (!memberDb) return null;
    const member = memberFactoryFromDb.buildMember(memberDb);
    return member;
  }
}
