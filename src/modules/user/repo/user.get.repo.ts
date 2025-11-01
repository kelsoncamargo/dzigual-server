/**
 * @fileoverview Repository function to retrieve a user by email from the database using Prisma.
 *
 * @module user-get-repo
 * @version 1.0.0
 *
 * ### Key Setup
 * - Queries user by email using findFirst.
 * - Returns user if found or null; throws error on failure.
 *
 * ### Functions
 * - get({ email }): Asynchronously fetches and returns the user or null.
 *
 * @param {IUserGet} { email } - User get input with email.
 * @returns {Promise<User | null>} The user object if found, or null.
 *
 * @throws Error On database query failure, with custom message.
 *
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
    throw new Error(`database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
  }
};
