/**
 * logout
 *
 * Service method to revoke the user's refresh token and log them out.
 *
 * @param {IAuthLogout} logoutData
 *   – `token` (string): Refresh token to revoke.
 * @returns {Promise<IAuthLogoutDto>}
 *   – Resolves with `{ message: string }` containing MessageMap.SUCCESS.AUTH.LOGOUT.
 * @throws {Error}
 *   – Throws MessageMap.ERROR.DATABASE on any database failure.
 */

import { MessageMap } from '../../../shared/messages';
import { revokeRefreshToken } from '../../../shared/token/token.jwt.refresh';
import {
  IAuthLogout,
  IAuthLogoutDto,
} from '../interface/auth.logout.interface';

export const logout = async (
  logoutData: IAuthLogout,
): Promise<IAuthLogoutDto> => {
  try {
    await revokeRefreshToken(logoutData.refreshToken);

    return {
      message: MessageMap.SUCCESS.AUTH.LOGOUT,
    };
  } catch (err) {
    throw new Error(MessageMap.ERROR.DATABASE);
  }
};
