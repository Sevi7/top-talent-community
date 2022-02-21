import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { NominatePeerController } from './NominatePeerController';
import { NominatePeerUseCase } from './NominatePeerUseCase';
import { nominationRepository, memberRepository } from '/opt/nodejs/infra/repositories/dynamoDb';

const nominatePeerUseCase = new NominatePeerUseCase(nominationRepository, memberRepository);

export const lambdaHandler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => new NominatePeerController(nominatePeerUseCase).run(event);
