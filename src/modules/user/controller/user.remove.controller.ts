/**
 * @fileoverview Controller function to remove a user: processes request body, calls service, and responds with success or error.
 *
 * @module user-remove-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Extracts email from req.body.
 * - Calls removeService to delete user.
 * - Responds with 200 success message or 400 error.
 *
 * ### Functions
 * - remove(req, res): Handles user removal request asynchronously.
 *
 * @param {Request} req - Express request with body.email.
 * @param {Response} res - Express response for sending status and message.
 * @returns {Promise<Response>} The Express response object.
 *
 * @throws Error Responds with 400 and error message on failure.
 *
 */

import { Request, Response } from 'express';
import { remove as removeService } from '../service/user.remove.service';
import { MessageMap } from '../../../shared/messages';

export const remove = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await removeService({
      email: req.payload.email,
    });

    return res.status(200).json({
      message: `user_removed_${MessageMap.SUCCESS.DEFAULT.SUCCESS}`,
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
