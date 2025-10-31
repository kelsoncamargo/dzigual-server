/**
 * @module repository.auth
 * @description Authenticates a user by email.
 *
 * @param {IAuthLogin} params
 *   - `email` (string): User's email address
 * @returns {Promise<User | null>}
 *   - Resolves with the User record if found, otherwise null
 * @throws {Error}
 *   - Throws MessageMap.ERROR.DATABASE on any database failure
 */

import { User } from '@prisma/client';
import { MessageMap } from '../../../shared/messages';
import { userRepository } from '../../user/repo/user.repo';
import { IAuthLogin } from '../interface/auth.login.interface';

export const login = async ({ email }: IAuthLogin): Promise<User | null> => {
  try {
    return await userRepository.get({ email });
  } catch (err) {
    throw new Error(MessageMap.ERROR.DATABASE);
  }
};
