import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ListNominationsController } from './ListNominationsController';
import { ListNominationsUseCase } from './ListNominationsUseCase';
import { nominationRepository } from '/opt/nodejs/infra/repositories/dynamoDb';

const listNominationsUseCase = new ListNominationsUseCase(nominationRepository);

export const lambdaHandler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> =>
  new ListNominationsController(listNominationsUseCase).run(event);
