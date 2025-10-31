/**
 * @module repository.user
 * @description Updates an existing User record in the database.
 *
 * @param {IUserUpdate} params
 *   - `email` (string): Current user email used to locate the record.
 *   - `newEmail` (string | undefined): New email address (optional).
 *   - `name` (string | undefined): New first name (optional).
 *   - `lastName` (string | undefined): New last name (optional).
 *   - `phoneNumber` (string | null | undefined): New phone number (optional).
 *   - `password` (string | undefined): New hashed password (optional).
 *   - `role` (Role | undefined): New role to assign (optional).
 * @returns {Promise<User>}
 *   - Resolves with the updated User record.
 * @throws {Error}
 *   - Throws MessageMap.ERROR.DATABASE on any database failure.
 */

import { User } from '@prisma/client';
import { MessageMap } from '../../../shared/messages';
import database from '../../../config/database';
import { IUserUpdate } from '../interface/user.update.interface';

export const update = async ({
  email,
  name,
  newEmail,
  password,
  role,
  lastName,
  phoneNumber,
}: IUserUpdate): Promise<User> => {
  try {
    return await database.user.update({
      where: {
        email,
      },
      data: {
        email: newEmail,
        name,
        lastName,
        phoneNumber,
        password,
        role,
      },
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};
