import SES from 'aws-sdk/clients/ses';
import { SimpleEmailService } from '../../providers/simpleEmailService/SimpleEmailService';
import { EmailMembersRepository } from '../EmailMembersRepository';

const { SOURCE_EMAIL } = <
  {
    SOURCE_EMAIL: string;
  }
>process.env;

export class EmailMembersSesRepository implements EmailMembersRepository {
  constructor(private simpleEmailService: SimpleEmailService) {}

  async sendRejectedNominationEmails(
    referringMemberEmail: string,
    nominatedMemberEmail: string
  ): Promise<string> {
    const params: SES.SendEmailRequest = {
      Source: SOURCE_EMAIL,
      Destination: {
        ToAddresses: [referringMemberEmail, nominatedMemberEmail],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `Thank you for your nomination to ${nominatedMemberEmail} to the Top Talent Community.<br><br>We have made the decision to not move your nomination forward at this time. But we are sure you will be able to join in the future!<br><br>Best,<br><br>Top Talent Community`,
          },
          Text: {
            Charset: 'UTF-8',
            Data: `Thank you for your nomination to ${nominatedMemberEmail} to the Top Talent Community.\nWe have made the decision to not move your nomination forward at this time. But we are sure you will be able to join in the future!\nBest,\nTop Talent Community`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Nomination to the Top Talent Community`,
        },
      },
    };
    return this.simpleEmailService.sendEmail(params);
  }
}
