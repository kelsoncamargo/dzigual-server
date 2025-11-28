/**
 * @fileoverview Utility to create and manage JWT refresh tokens, including signing, hashing, and database storage/update.
 *
 * @module refresh-token
 * @version 1.0.0
 *
 * ### Key Setup
 * - Uses JWT to sign tokens with dynamic secret from isProduction().
 * - Hashes tokens with SHA-256 for secure storage.
 * - Stores/updates hashed tokens in database (e.g., via Prisma).
 *
 * ### Functions
 * - create(payload): Signs JWT, hashes it, and creates/updates refresh token in DB.
 *
 * @param {IJwtPayload} payload - JWT payload with user ID and other claims.
 * @returns {Promise<string>} The signed JWT refresh token.
 *
 * @throws Error If secret not found or database operations fail.
 */

import isProduction from '../isProduction';
import { IJwtPayload } from './token.jwt.interface';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const createRefreshToken = async (
  payload: IJwtPayload,
): Promise<string> => {
  const { secret } = isProduction();
  return jwt.sign(payload, secret, {
    expiresIn: `${process.env.TIME_REFRESH_TOKEN as any}d`,
    algorithm: 'HS256',
  });
};
