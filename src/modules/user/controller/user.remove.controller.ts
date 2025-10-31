/**
 * @module controller.user
 * @description Express handler to delete a user by email.
 *
 * @param {Request} req - Express request object containing:
 *   - body.email (string): User's email address to delete
 * @param {Response} res - Express response object
 * @returns {Promise<Response>}
 *   - Success: 200 OK with:
 *     - message: MessageMap.SUCCESS.USER.REMOVED
 *   - Error: 400 Bad Request with:
 *     - message: Error message
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
      email: req.body.email,
    });

    return res.status(200).json({
      message: MessageMap.SUCCESS.USER.REMOVED,
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
