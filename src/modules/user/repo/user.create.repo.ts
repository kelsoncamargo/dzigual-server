/**
 * @module repository.user
 * @description Creates a new User record in the database.
 *
 * @param {IUserCreate} params
 *   - `email` (string): User's email address
 *   - `name` (string): User's first name
 *   - `lastName` (string): User's last name
 *   - `password` (string): User's hashed password
 *   - `role` (Role): User's assigned role
 *   - `phoneNumber` (string | undefined): User's phone number (optional)
 * @returns {Promise<User>}
 *   - Resolves with the newly created User record
 * @throws {Error}
 *   - Throws MessageMap.ERROR.DATABASE on any database failure
 */

import { User } from '@prisma/client';
import { MessageMap } from '../../../shared/messages';
import database from '../../../config/database';
import { IUserCreate } from '../interface/user.create.interface';

export const create = async ({
  email,
  name,
  lastName,
  password,
  role,
  phoneNumber,
}: IUserCreate): Promise<User> => {
  try {
    return await database.user.create({
      data: {
        email,
        name,
        lastName,
        phoneNumber,
        password,
        role,
        isActive: true,
      },
    });
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};
