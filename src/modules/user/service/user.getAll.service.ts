/**
 * @module service.user
 * @description Retrieves all users from the database.
 *
 * @returns {Promise<IUserGetAllDto>}
 *   - Resolves with an object containing:
 *     - users: Array of user records with:
 *       - id: string
 *       - email: string
 *       - name: string
 *       - lastName: string
 *       - phoneNumber: string | null
 *       - role: Role
 *       - isActive: boolean
 * @throws {Error}
 *   - MessageMap.ERROR.USER.NOT_FOUND if no users exist
 *   - MessageMap.ERROR.DATABASE on any database failure
 */

import { getAll as getAllRepo } from '../repo/user.getAll.repo';
import { IUserGetAllDto } from '../interface/user.getAll.interface';
import { MessageMap } from '../../../shared/messages';

export const getAll = async (): Promise<IUserGetAllDto> => {
  const users = await getAllRepo();

  if (!users) {
    throw new Error(MessageMap.ERROR.USER.NOT_FOUND);
  }

  return users;
};
