import { Member } from '../../domain/models/Member';

export interface MemberRepository {
  get(id: string): Promise<Member | null>;
}
