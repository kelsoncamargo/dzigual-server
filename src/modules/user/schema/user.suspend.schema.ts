/**
 * suspend
 *
 * Returns a Celebrate validation schema for the suspend-user endpoint,
 * validating required query parameters.
 *
 * @returns {object}
 *   Mapping of Celebrate segments:
 *   • [Segments.QUERY]: Joi schema with:
 *     - email: string, trimmed, required, valid email.
 *     - isActive: boolean, required.
 */


import { Joi, Segments } from "celebrate";

export function suspend(): object {
  return {
    [Segments.QUERY]: Joi.object()
      .keys({
        email: Joi.string()
          .trim()
          .email()
          .required()
          .messages({
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required",
          }),

        isActive: Joi.boolean()
          .required()
          .messages({
            "boolean.base": "isActive must be a boolean",
            "any.required": "isActive is required",
          }),
      })
      .unknown(),
  };
}
