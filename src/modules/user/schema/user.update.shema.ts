/**
 * @module schema.user
 * @description Validation schema for updating user information.
 *
 * @returns {object}
 *   - Celebrate validation object containing Joi schemas for:
 *     - email (string): current email — required
 *     - newEmail (string): new email address, optional, must be a valid email and different from `email`
 *     - name (string): 3-30 characters, optional
 *     - lastName (string): 3-30 characters, optional
 *     - password (string): minimum 6 characters, optional
 *     - phoneNumber (string): optional
 *     - role (Role): valid role enum value, optional
 * @throws {400 Bad Request}
 *   - On validation failure via celebrate middleware
 */

import { Segments, Joi } from 'celebrate';
import { Role } from '@prisma/client';

export function update(): object {
  return {
    [Segments.BODY]: Joi.object()
      .keys({
        // current email (required, used to identify the user)
        email: Joi.string().trim().email().required().messages({
          'string.email': 'Email must be a valid email address',
          'any.required': 'Email is required',
        }),

        // optional new email (must be valid and different from `email`)
        newEmail: Joi.string()
          .trim()
          .email()
          .optional()
          .invalid(Joi.ref('email'))
          .messages({
            'string.email': 'New email must be a valid email address',
            'any.invalid': 'New email must be different from current email',
          }),

        name: Joi.string().trim().min(3).max(30).optional().messages({
          'string.base': 'Name must be a string',
          'string.min': 'Name must be at least 3 characters',
          'string.max': 'Name must be no more than 30 characters',
        }),

        lastName: Joi.string().trim().min(3).max(30).optional().messages({
          'string.base': 'Last name must be a string',
          'string.min': 'Last name must be at least 3 characters',
          'string.max': 'Last name must be no more than 30 characters',
        }),

        password: Joi.string().trim().min(6).max(18).optional().messages({
          'string.min': 'Password must be at least 6 characters',
          'string.max': 'Password must be no more than 18 characters',
        }),

        phoneNumber: Joi.string().trim().allow(null).optional().messages({
          'string.base': 'Phone number must be a string',
        }),

        role: Joi.string()
          .valid(...Object.values(Role))
          .optional()
          .messages({
            'any.only': `Role must be one of: ${Object.values(Role).join(
              ', ',
            )}`,
          }),
      })
      // require at least one updatable field besides the identifying `email`
      .or('newEmail', 'name', 'password', 'role', 'lastName', 'phoneNumber')
      .messages({
        'object.missing': 'At least one field must be provided for update',
      }),
  };
}
