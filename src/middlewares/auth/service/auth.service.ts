/**
 * @fileoverview Utility function to validate a JWT token, decode its payload, and ensure the associated user is active.
 *
 * @module token-validate
 * @version 1.0.0
 *
 * ### Key Setup
 * - Verifies JWT signature and decodes payload.
 * - Checks user existence and active status in database.
 *
 * ### Functions
 * - validateToken(hashToken): Validates token, checks user, and returns payload.
 *
 * @param {string} hashToken - The JWT string to validate.
 * @returns {Promise<IJwtPayload>} The decoded JWT payload if valid and user active.
 *
 * @throws Error If token invalid, user not found, or inactive.
 */

import database from '../../../config/database';
import { token } from '../../../shared/token/token.jwt';
import { IJwtPayload } from '../../../shared/token/token.jwt.interface';
import { MessageMap } from '../../../shared/messages';

export async function validadeUserByToken(
  hashToken: string,
): Promise<IJwtPayload> {
  const payload = token.validateToken(hashToken);

  const user = await database.user.findUnique({
    where: { id: payload.id },
    select: { isActive: true },
  });

  if (!user || !user.isActive) {
    throw new Error(`${MessageMap.ERROR.DEFAULT.UNAUTHORIZED}_user`);
  }

  return payload;
}
