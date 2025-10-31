/**
 * validateToken
 *
 * Verifies a JWT and ensures the associated user is active.
 *
 * @param {string} token
 *   – JWT string to be validated.
 * @returns {Promise<IJwtPayload>}
 *   – Resolves with the decoded payload containing user information.
 * @throws {Error}
 *   – Throws MessageMap.ERROR if:
 *     • The token is invalid or expired (handled by verifyToken).
 *     • The user is not found or is inactive.
 */

import database from '../../../config/database';
import { verifyToken } from '../../../shared/token/token.jwt';
import { IJwtPayload } from '../../../shared/token/token.jwt.interface';
import { MessageMap } from '../../../shared/messages';

export async function validateToken(token: string): Promise<IJwtPayload> {
  const payload = verifyToken(token);

  const user = await database.user.findUnique({
    where: { id: payload.id },
    select: { isActive: true },
  });

  if (!user || !user.isActive) {
    throw new Error(MessageMap.ERROR.DEFAULT.UNAUTHORIZED);
  }

  return payload;
}
