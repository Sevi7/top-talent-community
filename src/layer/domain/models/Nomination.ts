import { Member } from './Member';

interface NominationConstructorParams {
  email: string;
  description: string;
  communityInvolvementScore: number;
  overallScore: number;
  referringMember: Member;
}

export class Nomination {
  private _email: string;

  private _description: string;

  private _communityInvolvementScore: number;

  private _overallScore: number;

  private _referringMember: Member;

  constructor(params: NominationConstructorParams) {
    this._email = params.email;
    this._description = params.description;
    this._communityInvolvementScore = params.communityInvolvementScore;
    this._overallScore = params.overallScore;
    this._referringMember = params.referringMember;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get description() {
    return this._description;
  }

  get communityInvolvementScore() {
    return this._communityInvolvementScore;
  }

  get overallScore() {
    return this._overallScore;
  }

  get referringMember() {
    return this._referringMember;
  }
}
