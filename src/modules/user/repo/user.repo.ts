/**
 * @fileoverview Repository class aggregating user CRUD functions (create, get, update, remove) and exporting a singleton instance.
 *
 * @module user-repository
 * @version 1.0.0
 *
 * ### Key Setup
 * - Aggregates user repo functions into a class for centralized access.
 *
 * ### Class
 * - UserRepository: Class with methods for create, get, update, and remove.
 *
 */

import { create } from './user.create.repo';
import { get } from './user.get.repo';
import { getByEmail } from './user.getByEmail';
import { remove } from './user.remove.repo';
import { update } from './user.update.repo';

class UserRepository {
  create = create;
  get = get;
  getByEmail = getByEmail;
  update = update;
  remove = remove;
}

export const userRepository = new UserRepository();
