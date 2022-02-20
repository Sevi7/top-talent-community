import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { NominatePeerController } from './NominatePeerController';

export const lambdaHandler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => new NominatePeerController().run(event);
