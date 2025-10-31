/**
 * @fileoverview Utility to revoke a refresh token by hashing it and updating the database to mark as revoked.
 *
 * @module refresh-token-revoke
 * @version 1.0.0
 *
 * ### Key Setup
 * - Hashes token and updates DB; handles Prisma 'not found' error specifically.
 *
 * ### Functions
 * - revokeRefreshToken(token): Revokes the token in DB and returns true on success.
 *
 * @param {string} token - The refresh token string to revoke.
 * @returns {Promise<boolean>} True if revoked successfully.
 *
 * @throws Error 'invalid_token' if token not found (Prisma P2025); 'internal_error' otherwise.
 */

import { Prisma } from '@prisma/client';
import database from '../../config/database';
import { MessageMap } from '../messages';
import hashToken from './hash.token';

export const revokeRefreshToken = async (token: string) => {
  const hashed = hashToken(token);
  try {
    await database.refreshToken.update({
      where: { token: hashed },
      data: { revoked: true },
    });
    return true;
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw new Error(`${MessageMap.ERROR.DEFAULT.INVALID}_token`);
    }
    throw new Error(MessageMap.ERROR.DEFAULT.INTERNAL_ERROR);
  }
};
