interface MemberConstructorParams {
  id: string;
  name: string;
  lastName: string;
  birthDate: number;
  email: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
  state?: string;
  country: string;
}

export class Member {
  private _id: string;

  private _name: string;

  private _lastName: string;

  private _birthDate: number;

  private _email: string;

  private _phoneNumber: string;

  private _postalCode: string;

  private _city: string;

  private _state?: string;

  private _country: string;

  constructor(params: MemberConstructorParams) {
    this._id = params.id;
    this._name = params.name;
    this._lastName = params.lastName;
    this._birthDate = params.birthDate;
    this._email = params.email;
    this._phoneNumber = params.phoneNumber;
    this._postalCode = params.postalCode;
    this._city = params.city;
    this._state = params.state;
    this._country = params.country;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get lastName() {
    return this._lastName;
  }

  get birthDate() {
    return this._birthDate;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  get postalCode() {
    return this._postalCode;
  }

  set postalCode(postalCode: string) {
    this._postalCode = postalCode;
  }

  get city() {
    return this._city;
  }

  set city(city: string) {
    this._city = city;
  }

  get state() {
    return this._state;
  }

  set state(state: string) {
    this._state = state;
  }

  get country() {
    return this._country;
  }

  set country(country: string) {
    this._country = country;
  }
}
