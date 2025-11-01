/**
 * @fileoverview Controller class aggregating user CRUD handlers (create, get, update, remove) and exporting a singleton instance.
 *
 * @module user-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Aggregates user controller functions into a class for centralized access.
 *
 * ### Class
 * - UserController: Class with methods for create, get, update, and remove.
 *
 */

import { create } from './user.create.controller';
import { get } from './user.get.controller';
import { remove } from './user.remove.controller';
import { update } from './user.update.controller';

export class UserController {
  create = create;
  get = get;
  update = update;
  remove = remove;
}

export const userController = new UserController();
