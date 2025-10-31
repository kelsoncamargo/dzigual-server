/**
 * UserRepository
 *
 * Repository class responsible for User persistence operations.
 *
 * @method create(params: ICreateUser): Promise<User>
 *   – Creates a new user in the database.
 *
 * @method get(params: IGetUser): Promise<User | null>
 *   – Retrieves a user by email and company document ID.
 * 
 *  * @method getAll(params: IGetAllUser): Promise<IGetAllUser | null>
 *   – Retrieves all users by company document ID.
 *
 * @method update(params: IUpdateUser): Promise<User>
 *   – Updates an existing user’s details.
 *
 * @method suspend(params: ISuspendUser): Promise<User>
 *   – Suspends a user by updating their active status.
 *
 * @method remove(params: IRemoveUser): Promise<User>
 *   – Deletes a user by email and company document ID.
 */


import { suspend } from "../service/user.suspend.service";
import { create } from "./user.create.repo";
import { get } from "./user.get.repo";
import { getAll } from "./user.getAll.repo";
import { remove } from "./user.remove.repo";
import { update } from "./user.update.repo";

class UserRepository {
  create = create;
  get = get;
  getAll = getAll;
  update = update;
  suspend = suspend;
  remove = remove;
}

export const userRepository = new UserRepository();