/**
 * @fileoverview Service function to get a user by email: calls repository, checks existence, and returns DTO or throws error.
 *
 * @module user-get-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Fetches user via getRepo, throws if not found.
 *
 * ### Functions
 * - get({ email }): Asynchronously gets user and returns DTO.
 *
 * @param {IUserGet} { email } - User get input with email.
 * @returns {Promise<IUserGetDto>} The user DTO if found.
 *
 * @throws Error If user not found, with custom message.
 *
 */

import { get as getRepo } from '../repo/user.get.repo';
import { IUserGet, IUserGetDto } from '../interface/user.get.interface';
import { MessageMap } from '../../../shared/messages';

export const get = async ({ email }: IUserGet): Promise<IUserGetDto> => {
  const user = await getRepo({ email });

  if (!user) {
    throw new Error(`user_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
  }

  return user;
};
