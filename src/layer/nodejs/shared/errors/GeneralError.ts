export class GeneralError extends Error {
  code?: string;

  constructor(error: any, code?: string) {
    super(error);
    this.code = code;
  }
}
