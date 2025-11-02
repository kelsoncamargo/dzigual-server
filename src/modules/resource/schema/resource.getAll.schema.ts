/**
 * @fileoverview Validation schema for retrieving all resources with pagination parameters.
 *
 * @module resource-validation-get-all
 * @version 1.0.0
 *
 * ### Key Setup
 * - Uses Joi to validate optional page and limit fields in the request body.
 * - Ensures page and limit are positive integers if provided.
 * - Custom error messages for validation failures.
 *
 * ### Functions
 * - getAll(): Returns the Celebrate validation object for the request body.
 *
 * @returns {object} The validation schema object for Segments.BODY.
 *
 */

import { Segments, Joi } from 'celebrate';

export function getAll(): object {
  return {
    [Segments.BODY]: Joi.object().keys({
      page: Joi.number().integer().min(1).optional().messages({
        'number.base': 'Page must be a number',
        'number.integer': 'Page must be an integer',
        'number.min': 'Page must be greater than 0',
      }),

      limit: Joi.number().integer().min(1).optional().messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.min': 'Limit must be greater than 0',
      }),
    }),
  };
}
