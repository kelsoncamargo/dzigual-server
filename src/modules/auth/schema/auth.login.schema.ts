/**
 * @module schema.auth
 * @description Validation schema for user authentication.
 *
 * @returns {object}
 *   - Celebrate validation object containing Joi schemas for:
 *     - email (string): valid email address, required
 *     - password (string): 6-18 characters, required
 * @throws {400 Bad Request}
 *   - On validation failure via celebrate middleware
 */

import { Segments, Joi } from 'celebrate';

export function login(): object {
  return {
    [Segments.BODY]: Joi.object()
      .keys({
        email: Joi.string().trim().email().required().messages({
          'string.email': 'Email must be a valid email address',
          'any.required': 'Email is required',
        }),

        password: Joi.string().trim().min(6).max(18).required().messages({
          'string.min': 'Password must be at least 6 characters',
          'string.max': 'Password must be no more than 18 characters',
          'any.required': 'Password is required',
        }),
      })
      .unknown(),
  };
}
