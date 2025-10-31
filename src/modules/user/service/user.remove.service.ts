/**
 * @module service.user
 * @description Deletes a user by email address.
 *
 * @param {IUserRemove} params
 *   - `email` (string): User's email address to delete
 * @returns {Promise<IUserRemoveDto>}
 *   - Resolves with `{ message: string }` containing success message
 * @throws {Error}
 *   - MessageMap.ERROR.USER.NOT_FOUND if user doesn't exist
 *   - MessageMap.ERROR.DATABASE on any database failure
 */

import { remove as removeRepo } from '../repo/user.remove.repo';
import { get as getRepo } from '../repo/user.get.repo';
import {
  IUserRemove,
  IUserRemoveDto,
} from '../interface/user.remove.interface';
import { MessageMap } from '../../../shared/messages';

export const remove = async ({
  email,
}: IUserRemove): Promise<IUserRemoveDto> => {
  const user = await getRepo({ email });

  if (!user) {
    throw new Error(MessageMap.ERROR.USER.NOT_FOUND);
  }

  await removeRepo({ email });

  return { message: MessageMap.SUCCESS.USER.REMOVED };
};
