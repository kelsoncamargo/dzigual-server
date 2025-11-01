/**
 * @fileoverview Service function to refresh access token using a refresh token, generating a new access token from the validated payload.
 *
 * @module auth-refresh-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Validates refresh token via repository, extracts payload, generates new access token.
 *
 * ### Functions
 * - refreshToken(refreshTokenData): Processes refresh and returns new token DTO.
 *
 * @param {IAuthRefreshToken} refreshTokenData - Input with refreshToken.
 * @returns {Promise<IAuthRefreshTokenDto>} DTO with new access token.
 *
 */

import { token } from '../../../shared/token/token.jwt';
import {
  IAuthRefreshToken,
  IAuthRefreshTokenDto,
} from '../interface/auth.refreshToken.interface';
import { authRepository } from '../repo/auth.repo';

export const refreshToken = async (
  refreshTokenData: IAuthRefreshToken,
): Promise<IAuthRefreshTokenDto> => {
  const { refreshToken } = refreshTokenData;

  const { email, id, role } = await authRepository.refreshToken({
    refreshToken,
  });

  const newToken = token.createToken({
    email,
    id,
    role,
  });

  return { token: newToken };
};
