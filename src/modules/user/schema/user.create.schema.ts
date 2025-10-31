/**
 * @module schema.user
 * @description Validation schema for creating a new user.
 *
 * @returns {object}
 *   - Celebrate validation object containing Joi schemas for:
 *     - email (string): valid email address, required
 *     - name (string): 3-30 characters, required
 *     - lastName (string): 3-30 characters, required
 *     - password (string): 6-18 characters, required
 *     - phoneNumber (string): optional
 *     - role (Role): valid role enum value, required
 * @throws {400 Bad Request}
 *   - On validation failure via celebrate middleware
 */

import { Segments, Joi } from "celebrate";
import { Role } from "@prisma/client";

export function create(): object {
  return {
    [Segments.BODY]: Joi.object()
      .keys({
        email: Joi.string()
          .trim()
          .email()
          .required()
          .messages({
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required",
          }),

        name: Joi.string()
          .trim()
          .min(3)
          .max(30)
          .required()
          .messages({
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name must be no more than 30 characters",
            "any.required": "Name is required",
          }),

        lastName: Joi.string()
          .trim()
          .min(3)
          .max(30)
          .required()
          .messages({
            "string.min": "Last name must be at least 3 characters",
            "string.max": "Last name must be no more than 30 characters",
            "any.required": "Last name is required",
          }),

        password: Joi.string()
          .trim()
          .min(6)
          .max(18)
          .required()
          .messages({
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must be no more than 18 characters",
            "any.required": "Password is required",
          }),

        phoneNumber: Joi.string()
          .trim()
          .allow(null)
          .optional()
          .messages({
            "string.base": "Phone number must be a string",
          }),

        role: Joi.string()
          .valid(...Object.values(Role))
          .required()
          .messages({
            "any.only": `Role must be one of: ${Object.values(Role).join(", ")}`,
            "any.required": "Role is required",
          }),
      })
      .unknown(),
  };
}