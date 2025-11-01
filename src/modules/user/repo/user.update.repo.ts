/**
 * @fileoverview Repository function to update a user by email in the database using Prisma.
 *
 * @module user-update-repo
 * @version 1.0.0
 *
 * ### Key Setup
 * - Updates user record with provided data fields.
 * - Throws custom error on database failure.
 *
 * ### Functions
 * - update({ email, name, newEmail, password, lastName, phoneNumber }): Asynchronously updates and returns the user.
 *
 * @param {IUserUpdate} { email, name, newEmail, password, lastName, phoneNumber } - User update input data.
 * @returns {Promise<User>} The updated user object.
 *
 * @throws Error On database update failure, with custom message.
 *
 */

import { User } from '@prisma/client';
import { MessageMap } from '../../../shared/messages';
import database from '../../../config/database';
import { IUserUpdate } from '../interface/user.update.interface';

export const update = async ({
  email,
  fullName,
  newEmail,
  password,
  phoneNumber,
}: IUserUpdate): Promise<User> => {
  try {
    return await database.user.update({
      where: {
        email,
      },
      data: {
        email: newEmail,
        fullName,
        phoneNumber,
        password,
      },
    });
  } catch (err) {
    throw new Error(`database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
  }
};
