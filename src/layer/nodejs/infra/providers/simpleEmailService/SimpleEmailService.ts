import SES from 'aws-sdk/clients/ses';
import { SimpleEmailServiceError } from '../../../shared/errors/SimpleEmailServiceError';
import { EmailService } from '../../EmailService';

export class SimpleEmailService implements EmailService {
  constructor(private sesClient: SES) {}

  async sendEmail(params: SES.SendEmailRequest): Promise<string> {
    try {
      const sendEmailRes = await this.sesClient.sendEmail(params).promise();
      return sendEmailRes.MessageId;
    } catch (error: unknown) {
      throw new SimpleEmailServiceError(error, params);
    }
  }
}
