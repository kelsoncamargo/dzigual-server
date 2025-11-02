/**
 * @module schema.create
 * @version 1.0.0
 *
 * @description Validation schema for creating a new user.
 *
 * @returns {object}
 *   - Celebrate validation object containing Joi schemas for:
 *     - email (string): valid email address, required
 *     - fullName (string): 8-50 characters, required
 *     - password (string): 6-18 characters, required
 *     - phoneNumber (string): optional
 * @throws {400 Bad Request}
 *   - On validation failure via celebrate middleware
 */

import { Segments, Joi } from 'celebrate';

export function create(): object {
  return {
    [Segments.BODY]: Joi.object()
      .keys({
        email: Joi.string().trim().email().required().messages({
          'string.email': 'Email must be a valid email address',
          'any.required': 'Email is required',
        }),

        fullName: Joi.string().trim().min(8).max(50).required().messages({
          'string.min': 'fullName must be at least 3 characters',
          'string.max': 'fullName must be no more than 30 characters',
          'any.required': 'fullName is required',
        }),

        password: Joi.string().trim().min(6).max(18).required().messages({
          'string.min': 'Password must be at least 6 characters',
          'string.max': 'Password must be no more than 18 characters',
          'any.required': 'Password is required',
        }),

        phoneNumber: Joi.string().trim().allow(null).optional().messages({
          'string.base': 'Phone number must be a string',
        }),
      })
      .unknown(),
  };
}
