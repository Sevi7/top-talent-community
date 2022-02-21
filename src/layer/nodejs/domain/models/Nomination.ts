import { Member } from './Member';

interface NominationConstructorParams {
  id: string;
  email: string;
  description: string;
  communityInvolvementScore: number;
  overallScore: number;
  referringMember: Member;
}

export class Nomination {
  private _id: string;

  private _email: string;

  private _description: string;

  private _communityInvolvementScore: number;

  private _overallScore: number;

  private _referringMember: Member;

  constructor(params: NominationConstructorParams) {
    this._id = params.id;
    this._email = params.email;
    this._description = params.description;
    this._communityInvolvementScore = params.communityInvolvementScore;
    this._overallScore = params.overallScore;
    this._referringMember = params.referringMember;
  }

  get id() {
    return this._id;
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

  isRejected(): boolean {
    return this._overallScore < 8;
  }

  toJson() {
    return {
      id: this._id,
      email: this._email,
      description: this._description,
      communityInvolvementScore: this._communityInvolvementScore,
      overallScore: this._overallScore,
      referringMember: this._referringMember.toJson(),
    };
  }
}
