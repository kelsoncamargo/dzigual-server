/**
 * @module schema.user
 * @version 1.0.0
 *
 * Aggregates Joi validation schemas for User-related endpoints.
 *
 * @class
 * @property {Record<string, import('joi').ObjectSchema>} create
 *   Schema for user registration.
 * @property {Record<string, import('joi').ObjectSchema>} get
 *   Schema for fetching a user by email and company ID.
 */

import { create } from './user.create.schema';
import { update } from './user.update.shema';

class UserSchema {
  create = create;
  update = update;
}

export const userSchema = new UserSchema();
