/**
 * @module service.user
 * @description Updates a user's active status (suspend or reactivate).
 *
 * @param {IUserSuspend} params
 *   - `email` (string): User's email address to identify the record
 *   - `isActive` (boolean): New active status to set (true=active, false=suspended)
 * @returns {Promise<IUserSuspendDto>}
 *   - Resolves with `{ message: string }` containing success message
 * @throws {Error}
 *   - MessageMap.ERROR.USER.NOT_FOUND if user doesn't exist
 *   - MessageMap.ERROR.DATABASE on any database failure
 */

import { MessageMap } from '../../../shared/messages';
import {
  IUserSuspend,
  IUserSuspendDto,
} from '../interface/user.suspend.interface';
import { get as getRepo } from '../repo/user.get.repo';
import { Suspend as suspendRepo } from '../repo/user.suspend.repo';

export const suspend = async ({
  email,
  isActive,
}: IUserSuspend): Promise<IUserSuspendDto> => {
  const user = await getRepo({ email });

  if (!user) {
    throw new Error(MessageMap.ERROR.USER.NOT_FOUND);
  }

  await suspendRepo({ email, isActive });

  return { message: MessageMap.SUCCESS.USER.SUSPEND };
};
