/**
 * @module controller.user
 * @description Express handler to retrieve all users from the system.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<Response>}
 *   - Success: 200 OK with array of user data
 *   - Error: 400 Bad Request with:
 *     - message: Error message
 */

import { Request, Response } from 'express';
import { getAll as getAllService } from '../service/user.getAll.service';
import { MessageMap } from '../../../shared/messages';

export const getAll = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await getAllService();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : MessageMap.ERROR.USER.NOT_FOUND,
    });
  }
};
