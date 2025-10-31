/**
 * @module repository.user
 * @description Deletes a user record from the database by email.
 *
 * @param {IUserRemove} params
 *   - `email` (string): User's email address to delete.
 * @returns {Promise<User>}
 *   - Resolves with the deleted User record.
 * @throws {Error}
 *   - Throws MessageMap.ERROR.DATABASE on any database failure (e.g., DB errors or record not found).
 */

import { User } from '@prisma/client';
import { MessageMap } from '../../../shared/messages';
import database from '../../../config/database';
import { IUserRemove } from '../interface/user.remove.interface';

export const remove = async ({ email }: IUserRemove): Promise<User> => {
  try {
    return await database.user.delete({
      where: {
        email,
      },
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};
