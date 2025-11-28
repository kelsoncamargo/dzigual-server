/**
 * @module schema.update
 * @version 1.0.0
 *
 * @description Validation schema for updating user information.
 *
 * @returns {object}
 * - Celebrate validation object containing Joi schemas for:
 * - email (string): new email address, optional, must be a valid email
 * - fullName (string): 8-50 characters, required
 * - password (string): minimum 6 characters, optional
 * - phoneNumber (string): optional
 * @throws {400 Bad Request}
 * - On validation failure via celebrate middleware
 */

import { Segments, Joi } from 'celebrate';

export function update(): object {
  return {
    [Segments.BODY]: Joi.object()
      .keys({
        email: Joi.string().trim().email().optional().messages({
          'string.email': 'New email must be a valid email address',
        }),

        fullName: Joi.string().trim().min(8).max(50).optional().messages({
          'string.min': 'fullName must be at least 8 characters', // Corrigi o texto para bater com a regra (era 3)
          'string.max': 'fullName must be no more than 50 characters', // Corrigi o texto (era 30)
          'any.required': 'fullName is required',
        }),

        password: Joi.string().trim().min(6).max(18).optional().messages({
          'string.min': 'Password must be at least 6 characters',
          'string.max': 'Password must be no more than 18 characters',
        }),

        phoneNumber: Joi.string().trim().allow(null).optional().messages({
          'string.base': 'Phone number must be a string',
        }),
      })
      .or('email', 'fullName', 'password', 'phoneNumber')
      .messages({
        'object.missing':
          'At least one field email, fullName, password or phoneNumber must be provided for update',
      }),
  };
}
