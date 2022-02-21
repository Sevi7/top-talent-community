import { UseCase } from '/opt/nodejs/useCases/UseCase';
import { Nomination } from '/opt/nodejs/domain/models/Nomination';
import { ListNominationsDto } from './ListNominationsDto';
import { NominationRepository } from '/opt/nodejs/infra/repositories/NominationRepository';

export class ListNominationsUseCase implements UseCase<ListNominationsDto, Nomination[]> {
  constructor(private nominationRepository: NominationRepository) {}

  async execute(req: ListNominationsDto): Promise<Nomination[]> {
    const nominations = await this.nominationRepository.getAll();
    const nominationsNotRejected = nominations.filter((nomination) => !nomination.isRejected());
    return nominationsNotRejected;
  }
}
