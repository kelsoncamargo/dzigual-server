/**
 * @module service.user
 * @description Retrieves a user by email address.
 *
 * @param {IUserGet} params
 *   - `email` (string): User's email address to search for.
 * @returns {Promise<IUserGetDto>}
 *   - Resolves with user record containing:
 *     - id: string
 *     - email: string
 *     - name: string
 *     - lastName: string
 *     - phoneNumber: string | null
 *     - role: Role
 *     - isActive: boolean
 * @throws {Error}
 *   - MessageMap.ERROR.USER.NOT_FOUND if no matching user exists
 *   - MessageMap.ERROR.DATABASE on any database failure
 */

import { get as getRepo } from '../repo/user.get.repo';
import { IUserGet, IUserGetDto } from '../interface/user.get.interface';
import { MessageMap } from '../../../shared/messages';

export const get = async ({ email }: IUserGet): Promise<IUserGetDto> => {
  const user = await getRepo({ email });

  if (!user) {
    throw new Error(MessageMap.ERROR.USER.NOT_FOUND);
  }

  return user;
};
