/**
 * @module repository.user
 * @description Updates a user's active status (suspend or reactivate) in the database.
 *
 * @param {IUserSuspend} params
 *   - `email` (string): User's email address used to identify the record.
 *   - `isActive` (boolean): Active status to apply (true = active, false = suspended).
 * @returns {Promise<User>}
 *   - Resolves with the updated User record.
 * @throws {Error}
 *   - Throws MessageMap.ERROR.DATABASE on any database failure.
 */

import { User } from '@prisma/client';
import { MessageMap } from '../../../shared/messages';
import database from '../../../config/database';
import { IUserSuspend } from '../interface/user.suspend.interface';

export const Suspend = async ({
  email,
  isActive,
}: IUserSuspend): Promise<User> => {
  try {
    return await database.user.update({
      where: {
        email,
      },
      data: {
        isActive: isActive,
      },
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};
