/**
 * @fileoverview Service function to handle user login: validates credentials, generates access/refresh tokens, and returns them.
 *
 * @module auth-login-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Fetches user by email, validates password, generates JWT tokens.
 * - Throws errors for not found, invalid password, or failures.
 *
 * ### Functions
 * - login(loginData): Asynchronously processes login and returns tokens DTO.
 *
 * @param {IAuthLogin} loginData - Login input with email and password.
 * @returns {Promise<IAuthLoginDto>} DTO with newToken (access) and newRefreshToken.
 *
 * @throws Error If user not found, password invalid, or internal failure.
 *
 */

import { MessageMap } from '../../../shared/messages';
import { password } from '../../../shared/password/passowrd';
import { token } from '../../../shared/token/token.jwt';
import { IAuthLogin, IAuthLoginDto } from '../interface/auth.login.interface';
import { authRepository } from '../repo/auth.repo';

export const login = async (loginData: IAuthLogin): Promise<IAuthLoginDto> => {
  const { email, password: userPassword } = loginData;

  const user = await authRepository.login(email);

  if (!user) {
    throw new Error(`user_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
  }

  const validPassword = password.decryptPassword(userPassword, user?.password);

  if (!validPassword) {
    throw new Error(MessageMap.ERROR.DEFAULT.UNAUTHORIZED);
  }

  const newToken = token.createToken({
    id: user.id,
    email: user.email,
  });

  const newRefreshToken = await token.createRefreshToken({
    id: user.id,
    email: user.email,
  });

  return {
    newToken,
    newRefreshToken,
  };
};
