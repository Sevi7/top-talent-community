import { v4 as uuidv4 } from 'uuid';
import { UseCase } from '/opt/nodejs/useCases/UseCase';
import { Nomination } from '/opt/nodejs/domain/models/Nomination';
import { AlreadyExistsError } from '/opt/nodejs/shared/errors/AlreadyExistsError';
import { NominatePeerDto } from './NominatePeerDto';
import { NominationRepository } from '/opt/nodejs/infra/repositories/NominationRepository';
import { MemberRepository } from '/opt/nodejs/infra/repositories/MemberRepository';
import { EmailMembersRepository } from '/opt/nodejs/infra/repositories/EmailMembersRepository';

export class NominatePeerUseCase implements UseCase<NominatePeerDto, Nomination> {
  constructor(
    private nominationRepository: NominationRepository,
    private memberRepository: MemberRepository,
    private emailMembersRepository: EmailMembersRepository
  ) {}

  async execute(req: NominatePeerDto): Promise<Nomination> {
    const referringMember = await this.memberRepository.get(req.referringMemberId);
    const nominationSameEmail = await this.nominationRepository.getByEmail(req.email);

    if (nominationSameEmail) {
      throw new AlreadyExistsError();
    }

    const nomination = new Nomination({
      id: uuidv4(),
      ...req,
      referringMember: referringMember!,
    });

    const nominationStored = await this.nominationRepository.create(nomination);

    if (nominationStored.isRejected()) {
      const messageId = await this.emailMembersRepository.sendRejectedNominationEmails(
        referringMember!.email,
        nominationStored.email
      );
      console.log('MessageId: ', messageId);
    }

    return nominationStored;
  }
}
