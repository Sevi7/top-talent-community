export enum JwtTokenErrorCode {
  InvalidToken = 'InvalidToken',
  TokenExpired = 'TokenExpired',
}

export type JwtInvalidTokenError = JwtTokenError & {
  code: JwtTokenErrorCode.InvalidToken;
};

export type JwtTokenExpiredError = JwtTokenError & {
  code: JwtTokenErrorCode.TokenExpired;
};

export class JwtTokenError extends Error {
  code?: JwtTokenErrorCode;

  constructor(error: any, code?: JwtTokenErrorCode) {
    super(error);
    this.code = code;
  }
}
