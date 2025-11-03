/**
 * @fileoverview Repository function to retrieve a user by id from the database using Prisma.
 *
 * @module user-get-repo
 * @version 1.0.0
 *
 * ### Key Setup
 * - Queries user by id using findFirst.
 * - Returns user if found or null; throws error on failure.
 *
 * ### Functions
 * - get({ id }): Asynchronously fetches and returns the user or null.
 *
 * @param {IUserGet} { id } - User get input with id.
 * @returns {Promise<User | null>} The user object if found, or null.
 *
 * @throws Error On database query failure, with custom message.
 *
 */

import { MessageMap } from '../../../shared/messages';
import database from '../../../config/database';
import { IUserGet } from '../interface/user.get.interface';
import { User } from 'prisma/prisma-client';

export const get = async ({ id }: IUserGet): Promise<User | null> => {
  try {
    return await database.user.findUnique({
      where: {
        id,
      },
    });
  } catch (err) {
    throw new Error(`database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
  }
};
