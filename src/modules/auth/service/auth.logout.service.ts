/**
 * @fileoverview Service function to handle user logout by calling the repository and returning a DTO or error.
 *
 * @module auth-logout-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Calls authRepository.logout with refreshToken.
 * - Returns DTO on success or throws error if invalid.
 *
 * ### Functions
 * - logout(logoutData): Asynchronously processes logout and returns DTO.
 *
 * @param {IAuthLogout} logoutData - Logout input with refreshToken.
 * @returns {Promise<IAuthLogoutDto>} DTO on success.
 *
 * @throws Error If logout fails or user invalid.
 *
 */

import { MessageMap } from '../../../shared/messages';
import { IAuthLogout } from '../interface/auth.logout.interface';
import { authRepository } from '../repo/auth.repo';

export const logout = async (logoutData: IAuthLogout): Promise<boolean> => {
  const { refreshToken } = logoutData;

  const logoutUser = await authRepository.logout({
    refreshToken,
  });

  if (!logoutUser) {
    throw new Error(`${MessageMap.ERROR.DEFAULT.INVALID}_user`);
  }

  return logoutUser;
};
