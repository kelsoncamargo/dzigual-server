/**
 * SchemaUser
 *
 * Aggregates Joi validation schemas for User-related endpoints.
 *
 * @class
 * @property {Record<string, import('joi').ObjectSchema>} create  
 *   Schema for user registration.
 * @property {Record<string, import('joi').ObjectSchema>} get     
 *   Schema for fetching a user by email and company ID.
 */

import { create } from "./user.create.schema";
import { get } from "./user.get.schema";
import { remove } from "./user.remove.schema";
import { suspend } from "./user.suspend.schema";
import { update } from "./user.update.shema";

class UserSchema {
  create = create;
  get = get;
  update = update;
  suspend = suspend;
  remove = remove;
}

export const userSchema = new UserSchema();