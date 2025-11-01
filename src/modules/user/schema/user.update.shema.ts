/**
 * @module schema.update
 * @version 1.0.0
 *
 * @description Validation schema for updating user information.
 *
 * @returns {object}
 *   - Celebrate validation object containing Joi schemas for:
 *     - newEmail (string): new email address, optional, must be a valid email and different from `email`
 *     - fullName (string): 8-50 characters, required
 *     - password (string): minimum 6 characters, optional
 *     - phoneNumber (string): optional
 * @throws {400 Bad Request}
 *   - On validation failure via celebrate middleware
 */

import { Segments, Joi } from 'celebrate';

export function update(): object {
  return {
    [Segments.BODY]: Joi.object()
      .keys({
        newEmail: Joi.string()
          .trim()
          .email()
          .optional()
          .invalid(Joi.ref('email'))
          .messages({
            'string.email': 'New email must be a valid email address',
            'any.invalid': 'New email must be different from current email',
          }),

        fullName: Joi.string().trim().min(8).max(50).required().messages({
          'string.min': 'Name must be at least 3 characters',
          'string.max': 'Name must be no more than 30 characters',
          'any.required': 'Name is required',
        }),

        password: Joi.string().trim().min(6).max(18).optional().messages({
          'string.min': 'Password must be at least 6 characters',
          'string.max': 'Password must be no more than 18 characters',
        }),

        phoneNumber: Joi.string().trim().allow(null).optional().messages({
          'string.base': 'Phone number must be a string',
        }),
      })
      .or('newEmail', 'fullName', 'password', 'phoneNumber')
      .messages({
        'object.missing': 'At least one field must be provided for update',
      }),
  };
}
