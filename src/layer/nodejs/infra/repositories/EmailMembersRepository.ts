export type EmailId = string;

export interface EmailMembersRepository {
  sendRejectedNominationEmails(
    referringMemberEmail: string,
    nominatedMemberEmail: string
  ): Promise<EmailId>;
}
