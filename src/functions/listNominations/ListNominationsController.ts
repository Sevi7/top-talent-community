import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { LambdaBaseController } from '/opt/nodejs/infra/controllers/LambdaBaseController';
import { validateJwtToken } from '/opt/nodejs/utils/jwt';
import { ListNominationsDto } from './ListNominationsDto';
import { ListNominationsUseCase } from './ListNominationsUseCase';

export class ListNominationsController extends LambdaBaseController {
  constructor(private useCase: ListNominationsUseCase) {
    super();
  }

  protected async runImplementation(
    event: APIGatewayProxyEventV2
  ): Promise<APIGatewayProxyResultV2> {
    const authHeader = event.headers?.Authorization;
    if (!authHeader) {
      return this.unauthorized();
    }

    const { isAdmin } = validateJwtToken(authHeader);
    if (!isAdmin) {
      return this.unauthorized();
    }

    const listNominationsDto: ListNominationsDto = {};
    const nominations = await this.useCase.execute(listNominationsDto);
    const nominationsJson = nominations.map((nomination) => nomination.toJson());
    return this.ok(nominationsJson);
  }
}
