import { simpleEmailService } from '../../providers/simpleEmailService';
import { EmailMembersSesRepository } from './EmailMembersSesRepository';

export const emailMembersRepository = new EmailMembersSesRepository(simpleEmailService);
