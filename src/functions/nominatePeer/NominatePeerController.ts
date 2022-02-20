import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { LambdaBaseController } from '/opt/nodejs/infra/controllers/LambdaBaseController';
import { Nomination } from '/opt/nodejs/domain/models/Nomination';
import { validateJwtToken } from '/opt/nodejs/utils/jwt';
import { nominatePeerConstraints } from './NominatePeerConstraints';
import { NominatePeerDto } from './NominatePeerDto';
import { Member } from '/opt/nodejs/domain/models/Member';

const buildNominationFromDto = (nominatePeerDto: NominatePeerDto): Nomination => {
  const referringMember = new Member({
    id: nominatePeerDto.referringMemberId,
    name: 'John',
    lastName: 'Doe',
    birthDate: Date.now(),
    email: 'john@doe.com',
    phoneNumber: '612345678',
    postalCode: '28394',
    city: 'Valencia',
    country: 'Spain',
  });

  return new Nomination({
    id: uuidv4(),
    ...nominatePeerDto,
    referringMember,
  });
};

export class NominatePeerController extends LambdaBaseController {
  protected async runImplementation(
    event: APIGatewayProxyEventV2
  ): Promise<APIGatewayProxyResultV2> {
    const authHeader = event.headers?.Authorization;
    if (!authHeader) {
      return this.unauthorized();
    }
    const userId = validateJwtToken(authHeader);

    const body = event.body ? JSON.parse(event.body) : {};
    const { error, value } = nominatePeerConstraints.validate(body);
    if (error) {
      return this.validationFailed(error.message);
    }

    const nominatePeerDto: NominatePeerDto = {
      email: value.email,
      description: value.description,
      communityInvolvementScore: value.communityInvolvementScore,
      overallScore: value.overallScore,
      referringMemberId: userId,
    };

    const nomination = buildNominationFromDto(nominatePeerDto);

    return this.ok(nomination);
  }
}
