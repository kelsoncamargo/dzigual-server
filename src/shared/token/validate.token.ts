/**
 * @fileoverview Utility function to validate and decode a JWT token using a dynamic secret.
 *
 * @module token-validate
 * @version 1.0.0
 *
 * ### Key Setup
 * - Retrieves secret from isProduction() based on environment.
 * - Verifies JWT signature and decodes payload.
 *
 * ### Functions
 * - validateToken(token): Verifies the token and returns the decoded payload.
 *
 * @param {string} token - The JWT string to validate and decode.
 * @returns {IJwtPayload} The decoded JWT payload.
 *
 * @example
 * import { validateToken } from './validateToken';
 * try {
 *   const payload = validateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 *   console.log(payload); // { id: 1, role: 'user' }
 * } catch (err) {
 *   console.error(err); // Error: invalid_token
 * }
 *
 * @throws Error If token is invalid or verification fails.
 */

import isProduction from '../isProduction';
import { MessageMap } from '../messages';
import { IJwtPayload } from './token.jwt.interface';
import jwt from 'jsonwebtoken';

export const validateToken = (token: string): IJwtPayload => {
  const { secret } = isProduction();

  try {
    return jwt.verify(token, secret) as IJwtPayload;
  } catch (error) {
    throw new Error(`${MessageMap.ERROR.DEFAULT.INVALID}_token`);
  }
};
