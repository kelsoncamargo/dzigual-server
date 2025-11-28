import { createRefreshToken } from './create.refresh.token';
import createToken from './create.token';
import { validateToken } from './validate.token';

class Token {
  generateAccessToken = createToken;
  generateRefreshToken = createRefreshToken;
  validateToken = validateToken;
}

export const token = new Token();
