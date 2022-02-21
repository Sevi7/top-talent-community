import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { LambdaBaseController } from '/opt/nodejs/infra/controllers/LambdaBaseController';
import { validateJwtToken } from '/opt/nodejs/utils/jwt';
import { nominatePeerConstraints } from './NominatePeerConstraints';
import { NominatePeerDto } from './NominatePeerDto';
import { NominatePeerUseCase } from './NominatePeerUseCase';
import { AlreadyExistsError } from '/opt/nodejs/shared/errors/AlreadyExistsError';

export class NominatePeerController extends LambdaBaseController {
  constructor(private useCase: NominatePeerUseCase) {
    super();
  }

  protected async runImplementation(
    event: APIGatewayProxyEventV2
  ): Promise<APIGatewayProxyResultV2> {
    const authHeader = event.headers?.Authorization;
    if (!authHeader) {
      return this.unauthorized();
    }
    const userId = validateJwtToken(authHeader);

    const body = event.body ? JSON.parse(event.body) : {};
    const { error: validationError, value } = nominatePeerConstraints.validate(body);
    if (validationError) {
      return this.validationFailed(validationError.message);
    }

    const nominatePeerDto: NominatePeerDto = {
      email: value.email,
      description: value.description,
      communityInvolvementScore: value.communityInvolvementScore,
      overallScore: value.overallScore,
      referringMemberId: userId,
    };

    try {
      const nomination = await this.useCase.execute(nominatePeerDto);
      return this.ok(nomination.toJson());
    } catch (error: unknown) {
      if (error instanceof AlreadyExistsError) {
        return this.generalError('This person is already a member of the top talent community');
      }
      throw error;
    }
  }
}
