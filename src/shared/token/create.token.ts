/**
 * @fileoverview Utility function to generate a signed JWT access token using a dynamic secret.
 *
 * @module token-create
 * @version 1.0.0
 *
 * ### Key Setup
 * - Retrieves secret from isProduction() based on environment.
 * - Signs JWT with 15-minutes expiration and HS256 algorithm.
 *
 * ### Functions
 * - createToken(payload): Generates and returns the signed JWT string.
 *
 * @param {IJwtPayload} payload - The payload to encode in the JWT (e.g., user ID, roles).
 * @returns {string} The signed JWT access token.
 *
 * @throws Error If secret is not found or signing fails.
 */

import isProduction from '../isProduction';
import { IJwtPayload } from './token.jwt.interface';
import jwt from 'jsonwebtoken';

export default function createToken(payload: IJwtPayload): string {
  const { secret } = isProduction();

  return jwt.sign(payload, secret, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });
}
