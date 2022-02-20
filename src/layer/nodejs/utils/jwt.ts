import { decode } from 'jwt-simple';
import { JwtTokenError, JwtTokenErrorCode } from '../shared/errors/JwtTokenError';

const { JWT_TOKEN_KEY } = <
  {
    JWT_TOKEN_KEY: string;
  }
>process.env;

export const validateJwtToken = (authHeader: string): string => {
  let payload;
  try {
    const token = authHeader.substring(7);
    payload = decode(token, JWT_TOKEN_KEY);
  } catch (error: unknown) {
    throw new JwtTokenError(JwtTokenErrorCode.InvalidToken);
  }

  if (!payload.expirationDate || Date.now() > payload.expirationDate) {
    throw new JwtTokenError(JwtTokenErrorCode.TokenExpired);
  }

  return payload.userId;
};
