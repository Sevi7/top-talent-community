import SES from 'aws-sdk/clients/ses';
import { SimpleEmailService } from './SimpleEmailService';

const { AWS_SAM_LOCAL } = process.env;

const sesClient = new SES({
  ...(AWS_SAM_LOCAL && {
    endpoint: 'http://aws-ses-local:9001',
  }),
});

export const simpleEmailService = new SimpleEmailService(sesClient);
