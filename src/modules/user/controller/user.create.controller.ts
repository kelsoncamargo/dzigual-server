/**
 * @module controller.user
 * @description Express handler to register a new user.
 *
 * @param {Request} req - Express request object containing:
 *   - body.name (string): User's first name
 *   - body.lastName (string): User's last name
 *   - body.email (string): User's email address
 *   - body.password (string): User's password
 *   - body.phoneNumber (string | undefined): User's phone number (optional)
 *   - body.role (Role): User's assigned role
 * @param {Response} res - Express response object
 * @returns {Promise<Response>}
 *   - Success: 201 Created with:
 *     - message: MessageMap.SUCCESS.USER.REGISTER
 *     - user: Created user data
 *   - Error: 400 Bad Request with:
 *     - message: Error message
 */

import { Request, Response } from 'express';
import { MessageMap } from '../../../shared/messages';
import { create as createService } from '../service/user.create.service';

export const create = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await createService({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
    });

    return res.status(201).json({
      message: MessageMap.SUCCESS.REGISTER,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error ? error.message : MessageMap.ERROR.USER.INVALID,
    });
  }
};
