/**
 * logout
 *
 * Service method to revoke a user's refresh token and perform logout.
 *
 * @param {IAuthLogout} params
 *   – `refreshToken` (string): The JWT refresh token to revoke.
 * @returns {Promise<IAuthLogoutDto | Error>}
 *   – Resolves with `IAuthLogoutDto` containing a success message.
 *   – Returns `Error(MessageMap.ERROR.TOKEN.INVALID)` if the token is invalid or revocation failed.
 */

import { MessageMap } from '../../../shared/messages';
import {
  IAuthLogout,
  IAuthLogoutDto,
} from '../interface/auth.logout.interface';
import { authRepository } from '../repo/auth.repo';

export const logout = async (
  logoutData: IAuthLogout,
): Promise<IAuthLogoutDto> => {
  const { refreshToken } = logoutData;

  const logoutUser = await authRepository.logout({
    refreshToken,
  });

  if (!logoutUser) {
    return new Error(MessageMap.ERROR.TOKEN.INVALID);
  }

  return logoutUser;
};
