/**
 * refreshToken
 *
 * Service method to exchange a valid refresh token for a new access token.
 *
 * @param {IAuthRefreshToken} params
 *   – `refreshToken` (string): The JWT refresh token to validate.
 * @returns {Promise<IAuthRefreshTokenDto>}
 *   – Resolves with an object containing:
 *     • `token` (string): Newly signed access token.
 * @throws {Error}
 *   – Throws if the refresh token is invalid or expired.
 */

import { generateToken } from '../../../shared/token/token.jwt';
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

  const newToken = generateToken({
    email,
    id,
    role,
  });

  return { token: newToken };
};
