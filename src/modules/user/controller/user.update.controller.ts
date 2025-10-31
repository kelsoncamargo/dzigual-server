/**
 * @module controller.user
 * @description Express handler to update a user's details.
 *
 * @param {Request} req - Express request object containing:
 *   - body.email (string): Current user email
 *   - body.newEmail (string | undefined): New email address (optional)
 *   - body.name (string | undefined): New name (optional)
 *   - body.lastName (string | undefined): New last name (optional)
 *   - body.password (string | undefined): New password (optional)
 *   - body.phoneNumber (string | undefined): New phone number (optional)
 *   - body.role (Role | undefined): New role (optional)
 * @param {Response} res - Express response object
 * @returns {Promise<Response>}
 *   - Success: 200 OK with:
 *     - message: MessageMap.SUCCESS.USER.UPDATE
 *     - user: Updated user data
 *   - Error: 400 Bad Request with:
 *     - message: Error message
 */

import { Request, Response } from 'express';
import { update as updateService } from '../service/user.update.service';
import { MessageMap } from '../../../shared/messages';

export const update = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await updateService({
      email: req.body.email,
      newEmail: req.body.newEmail,
      name: req.body.name,
      lastName: req.body.lastName,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
    });

    return res.status(200).json({
      message: MessageMap.SUCCESS.USER.UPDATE,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : MessageMap.ERROR.USER.NOT_FOUND,
    });
  }
};
