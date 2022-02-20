import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { LambdaBaseController } from '/opt/nodejs/infra/controllers/LambdaBaseController';

export class NominatePeerController extends LambdaBaseController {
  async runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    return this.ok();
  }
}
