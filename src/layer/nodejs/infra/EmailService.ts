export interface EmailService {
  sendEmail(params: any): Promise<any>;
}
