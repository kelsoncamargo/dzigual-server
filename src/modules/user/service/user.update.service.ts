/**
 * @fileoverview Service function to update a user: checks existence, optionally hashes new password, and calls repository with defaults for unchanged fields.
 *
 * @module user-update-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Verifies user existence by email.
 * - Hashes new password if provided using password.encryptPassword.
 * - Updates via updateRepo, using existing values for unspecified fields.
 *
 * ### Functions
 * - update({ email, newEmail, name, lastName, password, phoneNumber }): Asynchronously updates user and returns DTO.
 *
 * @param {IUserUpdate} { email, newEmail, name, lastName, password, phoneNumber } - User update input data.
 * @returns {Promise<IUserUpdateDto>} The updated user DTO.
 *
 * @throws Error If user not found or update fails, with custom message.
 *
 */

import { MessageMap } from '../../../shared/messages';
import { password } from '../../../shared/password/passowrd';
import {
  IUserUpdate,
  IUserUpdateDto,
} from '../interface/user.update.interface';
import { get as getRepo } from '../repo/user.get.repo';
import { update as updateRepo } from '../repo/user.update.repo';

export const update = async ({
  email,
  newEmail,
  fullName,
  password: userPassword,
  phoneNumber,
}: IUserUpdate): Promise<IUserUpdateDto> => {
  const user = await getRepo({ email });

  if (!user) {
    throw new Error(`user_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
  }

  const hashedPassword = userPassword
    ? await password.encryptPassword(userPassword)
    : undefined;

  return await updateRepo({
    email,
    newEmail: newEmail ?? user.email,
    fullName: fullName ?? user.fullName,
    password: hashedPassword ?? user.password,
    phoneNumber: phoneNumber ?? user.phoneNumber,
  });
};
