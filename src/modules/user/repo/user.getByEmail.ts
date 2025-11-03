/**
 * @fileoverview Utility function for retrieving a user by email from the database.
 *
 * @module user-get-by-email
 * @version 1.0.0
 *
 * ### Key Setup
 * - Uses Prisma client to query the database for a unique user by email.
 * - Handles errors by throwing a custom error message for internal database issues.
 *
 * ### Functions
 * - getByEmail(email): Asynchronously fetches a user record by email.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<User | null>} Promise resolving to the User object if found, or null if not found.
 *
 */

import { MessageMap } from '../../../shared/messages';
import database from '../../../config/database';
import { User } from 'prisma/prisma-client';

export const getByEmail = async (email: string): Promise<User | null> => {
  try {
    return await database.user.findUnique({
      where: {
        email,
      },
    });
  } catch (err) {
    throw new Error(`database_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
  }
};
