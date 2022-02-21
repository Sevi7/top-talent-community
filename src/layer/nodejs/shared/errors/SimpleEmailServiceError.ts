export class SimpleEmailServiceError extends Error {
  params: any;

  code?: string;

  constructor(error: any, params: any, code?: string) {
    super(error);
    this.params = params;
    this.code = code;
  }
}
