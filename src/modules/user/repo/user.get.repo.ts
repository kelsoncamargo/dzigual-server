/**
 * @module repository.user
 * @description Retrieves a user by their email address.
 *
 * @param {IUserGet} params
 *   - `email` (string): User's email address to search for
 * @returns {Promise<User | null>}
 *   - Resolves with the User record if found, otherwise null
 * @throws {Error}
 *   - Throws MessageMap.ERROR.DATABASE on any database failure
 */

import { User } from '@prisma/client';
import { MessageMap } from '../../../shared/messages';
import database from '../../../config/database';
import { IUserGet } from '../interface/user.get.interface';

export const get = async ({ email }: IUserGet): Promise<User | null> => {
  try {
    return await database.user.findFirst({
      where: {
        email,
      },
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};
