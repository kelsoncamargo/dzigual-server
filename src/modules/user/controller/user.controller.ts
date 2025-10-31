/**
 * UserController
 *
 * Provides HTTP endpoints for user operations.
 *
 * @method create
 *   – Express handler to register a new user.
 * @method get
 *   – Express handler to authenticate a user (login).
 *  * @method getAll
 *   – Express handler to authenticate a user (login).
 * @method update
 *   – Express handler to update user details.
 * @method suspend
 *   – Express handler to suspend a user account.
 * @method remove
 *   – Express handler to delete a user account.
 */

import { create } from './user.create.controller';
import { get } from './user.get.controller';
import { getAll } from './user.getAll.controller';
import { remove } from './user.remove.controller';
import { suspend } from './user.suspend.controller';
import { update } from './user.update.controller';

export class UserController {
  create = create;
  get = get;
  getAll = getAll;
  update = update;
  suspend = suspend;
  remove = remove;
}

export const userController = new UserController();
