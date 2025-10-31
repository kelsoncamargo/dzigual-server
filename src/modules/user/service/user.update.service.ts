/**
 * @module service.user
 * @description Updates a user's information after validating existence.
 *
 * @param {IUserUpdate} params
 *   - `email` (string): Current user email to identify record
 *   - `newEmail` (string | undefined): New email address (optional)
 *   - `name` (string | undefined): New name (optional)
 *   - `lastName` (string | undefined): New last name (optional)
 *   - `password` (string | undefined): New password to hash (optional)
 *   - `phoneNumber` (string | null | undefined): New phone number (optional)
 *   - `role` (Role | undefined): New role (optional)
 * @returns {Promise<IUserUpdateDto>}
 *   - Resolves with the updated user record
 * @throws {Error}
 *   - MessageMap.ERROR.USER.NOT_FOUND if user doesn't exist
 *   - MessageMap.ERROR.DATABASE on any database failure
 */

import { MessageMap } from '../../../shared/messages';
import {
  IUserUpdate,
  IUserUpdateDto,
} from '../interface/user.update.interface';
import { get as getRepo } from '../repo/user.get.repo';
import { update as updateRepo } from '../repo/user.update.repo';
import { encryptPassword } from '../../../shared/password';

export const update = async ({
  email,
  newEmail,
  name,
  lastName,
  password,
  phoneNumber,
  role,
}: IUserUpdate): Promise<IUserUpdateDto> => {
  const user = await getRepo({ email });

  if (!user) {
    throw new Error(MessageMap.ERROR.USER.NOT_FOUND);
  }

  const hashedPassword = password ? await encryptPassword(password) : undefined;

  return await updateRepo({
    email,
    newEmail: newEmail ?? user.email,
    name: name ?? user.name,
    lastName: lastName ?? user.lastName,
    password: hashedPassword ?? user.password,
    phoneNumber: phoneNumber ?? user.phoneNumber,
    role: role ?? user.role,
  });
};
