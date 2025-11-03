/**
 * @fileoverview Service function to handle user logout by revoking the refresh token.
 *
 * @module auth-logout-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Revokes refresh token using token.revokeRefreshToken.
 * - Returns success message or throws error on failure.
 *
 * ### Functions
 * - logout(logoutData): Asynchronously revokes token and returns logout DTO.
 *
 * @param {IAuthLogout} logoutData - Logout input with refreshToken.
 * @returns {Promise<IAuthLogoutDto>} DTO with success message.
 *
 * @throws Error On revocation failure, with custom message.
 */

import { token } from '../../../shared/token/token.jwt';

import { IAuthLogout } from '../interface/auth.logout.interface';

export const logout = async (logoutData: IAuthLogout): Promise<boolean> => {
  return await token.revokeRefreshToken(logoutData.refreshToken);
};
