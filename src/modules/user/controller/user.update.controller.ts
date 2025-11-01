/**
 * @fileoverview Controller function to update a user: processes request body, calls service, and responds with updated user or error.
 *
 * @module user-update-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Extracts update data from req.body.
 * - Calls updateService to persist changes.
 * - Responds with 200 success and user, or 400 error.
 *
 * ### Functions
 * - update(req, res): Handles user update request asynchronously.
 *
 * @param {Request} req - Express request with body containing email, newEmail, name, lastName, password, phoneNumber.
 * @param {Response} res - Express response for sending status, message, and user.
 * @returns {Promise<Response>} The Express response object.
 *
 * @throws Error Responds with 400 and error message on failure.
 *
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
    });

    return res.status(200).json({
      message: `updated_${MessageMap.SUCCESS.DEFAULT.SUCCESS}`,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : MessageMap.ERROR.DEFAULT.SERVER,
    });
  }
};
