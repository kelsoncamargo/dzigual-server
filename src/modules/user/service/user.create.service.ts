/**
 * @fileoverview Service function to create a new user: checks for existing email, hashes password, and calls repository to persist.
 *
 * @module user-create-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Checks if user exists by email.
 * - Encrypts password using password.encryptPassword.
 * - Creates user via createRepo if valid.
 *
 * ### Functions
 * - create({ email, name, lastName, password, phoneNumber }): Asynchronously creates user and returns DTO.
 *
 * @param {IUserCreate} { email, name, lastName, password, phoneNumber } - User creation input data.
 * @returns {Promise<IUserCreateDto>} The created user DTO.
 *
 * @throws Error If email in use or creation fails, with custom message.
 *
 */

import { create as createRepo } from '../repo/user.create.repo';
import {
  IUserCreate,
  IUserCreateDto,
} from '../interface/user.create.interface';
import { MessageMap } from '../../../shared/messages';
import { password } from '../../../shared/password/passowrd';
import { userRepository } from '../repo/user.repo';

export const create = async ({
  email,
  fullName,
  password: userPassword,
  phoneNumber,
}: IUserCreate): Promise<IUserCreateDto> => {
  const userExists = await userRepository.getByEmail(email);

  if (userExists) {
    throw new Error(`email_${MessageMap.ERROR.DEFAULT.IN_USE}`);
  }

  const hashedPassword = await password.encryptPassword(userPassword);

  return await createRepo({
    email,
    fullName,
    password: hashedPassword,
    phoneNumber,
  });
};
