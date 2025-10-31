import { createRefreshToken } from './create.refresh.token';
import createToken from './create.token';
import { revokeRefreshToken } from './revoke.refresh.token';
import { validateRefreshToken } from './validate.refresh.token';
import { validateToken } from './validate.token';

class Token {
  createToken = createToken;
  createRefreshToken = createRefreshToken;
  revokeRefreshToken = revokeRefreshToken;
  validateToken = validateToken;
  validateRefreshToken = validateRefreshToken;
}

export const token = new Token();
