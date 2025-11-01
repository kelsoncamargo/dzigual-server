/**
 * @fileoverview Service function to refresh authentication by validating a refresh token and returning its payload.
 *
 * @module auth-refresh-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Validates refresh token using token.validateRefreshToken.
 * - Returns payload on success or throws error on failure.
 *
 * ### Functions
 * - refreshToken(refreshTokenData): Asynchronously validates token and returns payload.
 *
 * @param {IAuthRefreshToken} refreshTokenData - Input with refreshToken.
 * @returns {Promise<IJwtPayload>} The decoded payload from the refresh token.
 *
 * @throws Error On validation failure, with custom message.
 */

import { MessageMap } from '../../../shared/messages';
import { token } from '../../../shared/token/token.jwt';
import { IJwtPayload } from '../../../shared/token/token.jwt.interface';
import { IAuthRefreshToken } from '../interface/auth.refreshToken.interface';

export const refreshToken = async (
  refreshTokenData: IAuthRefreshToken,
): Promise<IJwtPayload> => {
  try {
    const payloadRefreshToken = await token.validateRefreshToken(
      refreshTokenData.refreshToken,
    );

    return payloadRefreshToken;
  } catch (err) {
    throw new Error(`database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
  }
};
