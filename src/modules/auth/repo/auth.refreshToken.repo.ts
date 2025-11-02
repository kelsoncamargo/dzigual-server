/**
 * @fileoverview Service function to refresh authentication by validating a refresh token and returning its payload.
 *
 * @module auth-refresh-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Validates refresh token using token.validateRefreshToken.
 * - Returns payload on success.
 *
 * ### Functions
 * - refreshToken(refreshTokenData): Asynchronously validates token and returns payload.
 *
 * @param {IAuthRefreshToken} refreshTokenData - Input with refreshToken.
 * @returns {Promise<IJwtPayload>} The decoded payload from the refresh token.
 *
 */

import { token } from '../../../shared/token/token.jwt';
import { IJwtPayload } from '../../../shared/token/token.jwt.interface';
import { IAuthRefreshToken } from '../interface/auth.refreshToken.interface';

export const refreshToken = async (
  refreshTokenData: IAuthRefreshToken,
): Promise<IJwtPayload> => {
  const payloadRefreshToken = await token.validateRefreshToken(
    refreshTokenData.refreshToken,
  );

  return payloadRefreshToken;
};
