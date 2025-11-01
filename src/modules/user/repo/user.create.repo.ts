/**
 * @fileoverview Repository function to create a new user in the database using Prisma.
 *
 * @module user-create-repo
 * @version 1.0.0
 *
 * ### Key Setup
 * - Creates user record with provided data, setting isActive to true.
 * - Throws custom error on database failure.
 *
 * ### Functions
 * - create({ email, name, lastName, password, phoneNumber }): Asynchronously creates and returns the user.
 *
 * @param {IUserCreate} { email, name, lastName, password, phoneNumber } - User creation input data.
 * @returns {Promise<User>} The created user object.
 *
 * @throws Error On database creation failure, with custom message.
 *
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
        isActive: true,
      },
    });
  } catch (err) {
    throw new Error(`database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
  }
};
