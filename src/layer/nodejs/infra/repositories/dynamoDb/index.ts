import { dynamoDbService } from '../../providers/dynamoDbService';
import { MemberDdbRepository } from './MemberDdbRepository';
import { NominationDdbRepository } from './NominationDdbRepository';

export const memberRepository = new MemberDdbRepository(dynamoDbService);
export const nominationRepository = new NominationDdbRepository(dynamoDbService);
