/**
 * @fileoverview Repository function to delete a user by email from the database using Prisma.
 *
 * @module user-remove-repo
 * @version 1.0.0
 *
 * ### Key Setup
 * - Deletes user record by email.
 * - Throws custom error on database failure.
 *
 * ### Functions
 * - remove({ email }): Asynchronously deletes and returns the user.
 *
 * @param {IUserRemove} { email } - User removal input with email.
 * @returns {Promise<User>} The deleted user object.
 *
 * @throws Error On database deletion failure, with custom message.
 *
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
    throw new Error(`database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
  }
};
