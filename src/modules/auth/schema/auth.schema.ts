/**
 * AuthSchema
 *
 * Encapsulates Joi validation schemas for authentication-related endpoints.
 *
 * @method login
 *   – Validation schema for the login endpoint.
 */

import { login } from "./auth.login.schema";

class AuthSchema {
  login = login;
}

export const authSchema = new AuthSchema();