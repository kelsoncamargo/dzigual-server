/**
 * refreshToken
 *
 * Service method to validate a JWT refresh token and return its decoded payload.
 *
 * @param {IAuthRefreshToken} params
 *   – `refreshToken` (string): The JWT refresh token to validate.
 * @returns {Promise<IJwtPayload>}
 *   – Resolves with the decoded payload if the token is valid.
 * @throws {Error}
 *   – Throws MessageMap.ERROR.DATABASE on any validation or database error.
 */

import { MessageMap } from '../../../shared/messages';
import { IJwtPayload } from '../../../shared/token/token.jwt.interface';
import { validateRefreshToken } from '../../../shared/token/token.jwt.refresh';
import { IAuthRefreshToken } from '../interface/auth.refreshToken.interface';

export const refreshToken = async (
  refreshTokenData: IAuthRefreshToken,
): Promise<IJwtPayload> => {
  try {
    const payloadRefreshToken = await validateRefreshToken(
      refreshTokenData.refreshToken,
    );

    return payloadRefreshToken;
  } catch (err) {
    throw new Error(MessageMap.ERROR.DATABASE);
  }
};
