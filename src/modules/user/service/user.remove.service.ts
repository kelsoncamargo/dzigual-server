/**
 * @fileoverview Service function to remove a user by email: checks existence, calls repository to delete, and returns success DTO or throws error.
 *
 * @module user-remove-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Checks if user exists via getRepo.
 * - Removes user via removeRepo if found.
 * - Returns success message DTO.
 *
 * ### Functions
 * - remove({ email }): Asynchronously removes user and returns DTO.
 *
 * @param {IUserRemove} { email } - User removal input with email.
 * @returns {Promise<IUserRemoveDto>} DTO with success message.
 *
 * @throws Error If user not found, with custom message.
 *
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
    throw new Error(`user_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
  }

  await removeRepo({ email });

  return { message: `remove_${MessageMap.SUCCESS.DEFAULT.SUCCESS}` };
};
