/**
 * @fileoverview Service class aggregating user CRUD functions (create, get, update, remove) and exporting a singleton instance.
 *
 * @module user-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Aggregates user service functions into a class for centralized access.
 *
 * ### Class
 * - UserService: Class with methods for create, get, update, and remove.
 *
 */

import { create } from './user.create.service';
import { get } from './user.get.service';
import { remove } from './user.remove.service';
import { update } from './user.update.service';

class UserService {
  create = create;
  get = get;
  update = update;
  remove = remove;
}

export const userService = new UserService();
