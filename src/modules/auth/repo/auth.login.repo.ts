/**
 * @fileoverview Service function to handle user login by retrieving user data via email from the repository.
 *
 * @module auth-login-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Queries user by email using userRepository.
 * - Returns user if found; throws error on failure.
 *
 * ### Functions
 * - login({ email }): Asynchronously fetches user by email.
 *
 * @param {IAuthLogin} { email } - Login input with email.
 * @returns {Promise<User | null>} The user object if found, or null.
 *
 * @throws Error On database failure, with custom message.
 *
 */

import { User } from '@prisma/client';
import { MessageMap } from '../../../shared/messages';
import { userRepository } from '../../user/repo/user.repo';
import { IAuthLogin } from '../interface/auth.login.interface';

export const login = async (email: string): Promise<User | null> => {
  try {
    return await userRepository.get({ email });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}_database`);
  }
};
