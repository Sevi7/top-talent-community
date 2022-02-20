import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { GeneralError } from '../../shared/errors/GeneralError';

export abstract class LambdaBaseController {
  abstract runImplementation(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2>;

  public async run(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
      return await this.runImplementation(event);
    } catch (error: unknown) {
      if (error instanceof GeneralError) {
        return this.generalError(error.message);
      }
      console.error('FATAL', error);
      return this.fail();
    }
  }

  buildResponse(statusCode: number, body?: any): APIGatewayProxyResultV2 {
    return {
      isBase64Encoded: false,
      statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  }

  ok(body?: any): APIGatewayProxyResultV2 {
    return this.buildResponse(200, body);
  }

  generalError(message?: string): APIGatewayProxyResultV2 {
    return this.buildResponse(400, { message });
  }

  fail(): APIGatewayProxyResultV2 {
    return this.buildResponse(500, { message: 'Internal server error' });
  }
}
