/**
 * @module service.auth
 * @description Authenticates a user and issues JWT access and refresh tokens.
 *
 * @param {IAuthLogin} loginData
 *   - `email` (string): User's email address
 *   - `password` (string): Plain-text password to validate
 * @returns {Promise<IAuthLoginDto>}
 *   - Resolves with:
 *     - `token` (string): Signed JWT access token
 *     - `refreshToken` (string): Signed JWT refresh token
 * @throws {Error}
 *   - MessageMap.ERROR.USER.NOT_FOUND if user doesn't exist
 *   - MessageMap.ERROR.AUTH.NOT_FOUND if password is invalid
 *   - MessageMap.ERROR.DATABASE on any database failure
 */

import { MessageMap } from '../../../shared/messages';
import { decryptPassword } from '../../../shared/password';
import { generateToken } from '../../../shared/token/token.jwt';
import { generateRefreshToken } from '../../../shared/token/token.jwt.refresh';
import { IAuthLogin, IAuthLoginDto } from '../interface/auth.login.interface';
import { authRepository } from '../repo/auth.repo';

export const login = async (loginData: IAuthLogin): Promise<IAuthLoginDto> => {
  const { email, password } = loginData;

  const user = await authRepository.login({
    email,
    password,
  });

  if (!user) {
    throw new Error(`${MessageMap.ERROR.USER.NOT_FOUND}`);
  }

  const validPassword = decryptPassword(loginData.password, user?.password);

  if (!validPassword) {
    throw new Error(MessageMap.ERROR.AUTH.NOT_FOUND);
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = await generateRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    token,
    refreshToken,
  };
};
