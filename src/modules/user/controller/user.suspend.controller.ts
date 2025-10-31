/**
 * @module controller.user
 * @description Express handler to suspend/reactivate a user.
 *
 * @param {Request} req - Express request object containing:
 *   - body.email (string): User's email address
 *   - body.isActive (boolean): New active status (true=active, false=suspended)
 * @param {Response} res - Express response object
 * @returns {Promise<Response>}
 *   - Success: 200 OK with:
 *     - message: MessageMap.SUCCESS.USER.SUSPEND
 *   - Error: 400 Bad Request with:
 *     - message: Error message
 */

import { Request, Response } from 'express';
import { suspend as suspendService } from '../service/user.suspend.service';
import { MessageMap } from '../../../shared/messages';

export const suspend = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await suspendService({
      email: req.body.email,
      isActive: req.body.isActive,
    });

    return res.status(200).json({
      message: MessageMap.SUCCESS.USER.SUSPEND,
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
