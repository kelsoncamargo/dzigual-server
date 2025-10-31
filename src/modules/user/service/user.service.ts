/**
 * UserService
 *
 * Service class responsible for handling business logic related to User operations.
 *
 * @method create(params: ICreateUser): Promise<IRegisterUserDto>
 *   – Creates a new user after verifying no duplicate exists.
 *
 * @method get(params: IGetUser): Promise<IGetUserDto>
 *   – Authenticates and retrieves a user by email, password, and company.
 * 
 *  * @method getAll(params: IGeAlltUser): Promise<IGetAllUserDto>
 *   – Authenticates and retrieves a user by company.
 *
 * @method update(params: IUpdateUser): Promise<IUserUpdateDto | Error>
 *   – Updates an existing user’s details.
 *
 * @method suspend(params: IUserSuspend): Promise<IUserSuspendDto>
 *   – Suspends a user by updating their active status.
 *
 * @method remove(params: IRemoveUser): Promise<IRemoveUserDto>
 *   – Deletes a user by email and company document ID.
 */

import { create } from "./user.create.service";
import { get } from "./user.get.service";
import { getAll } from "./user.getAll.service";
import { remove } from "./user.remove.service";
import { suspend } from "./user.suspend.service";
import { update } from "./user.update.service";

class UserService {
  create = create;
  get = get;
  getAll = getAll;
  update = update;
  suspend = suspend;
  remove = remove;
}

export const userService = new UserService();