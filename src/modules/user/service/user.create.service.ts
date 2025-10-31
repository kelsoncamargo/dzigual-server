/**
 * @module service.user
 * @description Creates a new user after validating email uniqueness.
 *
 * @param {IUserCreate} params
 *   - `email` (string): User's email address
 *   - `name` (string): User's first name
 *   - `lastName` (string): User's last name
 *   - `password` (string): Plain-text password to hash
 *   - `phoneNumber` (string | null): User's phone number (optional)
 *   - `role` (Role): User's assigned role
 * @returns {Promise<IUserCreateDto>}
 *   - Resolves with the created user record
 * @throws {Error}
 *   - MessageMap.ERROR.USER.IN_USE if email already exists
 *   - MessageMap.ERROR.DATABASE on any database failure
 */

import { create as createRepo } from '../repo/user.create.repo';
import { get as getRepo } from '../repo/user.get.repo';
import {
  IUserCreate,
  IUserCreateDto,
} from '../interface/user.create.interface';
import { MessageMap } from '../../../shared/messages';
import { encryptPassword } from '../../../shared/password';

export const create = async ({
  email,
  name,
  lastName,
  password,
  phoneNumber,
  role,
}: IUserCreate): Promise<IUserCreateDto> => {
  const userExists = await getRepo({ email });

  if (userExists) {
    throw new Error(MessageMap.ERROR.USER.IN_USE);
  }

  const hashedPassword = await encryptPassword(password);

  return await createRepo({
    email,
    name,
    lastName,
    password: hashedPassword,
    phoneNumber,
    role,
  });
};
