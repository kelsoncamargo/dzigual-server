/**
 * @module repository.user
 * @description Retrieves all users from the database.
 *
 * @returns {Promise<IUserGetAllDto | null>}
 *   - Resolves with `{ users: User[] }` containing array of users with their details:
 *     - id, name, lastName, email, phoneNumber, role, isActive, timestamps
 *   - Returns `null` if no users exist
 * @throws {Error}
 *   - Throws MessageMap.ERROR.DATABASE on any database failure
 */

import { MessageMap } from '../../../shared/messages';
import database from '../../../config/database';
import { IUserGetAllDto } from '../interface/user.getAll.interface';

export const getAll = async (): Promise<IUserGetAllDto | null> => {
  try {
    const users = await database.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        phoneNumber: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users.length > 0 ? { users } : null;
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DATABASE}`);
  }
};
