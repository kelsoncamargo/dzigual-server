/**
 * @module controller.user
 * @description Express handler to retrieve a user by email.
 *
 * @param {Request} req - Express request object containing:
 *   - query.email (string): User's email address
 * @param {Response} res - Express response object
 * @returns {Promise<Response>}
 *   - Success: 200 OK with user data
 *   - Error: 400 Bad Request with:
 *     - message: Error message
 */

import { Request, Response } from 'express';
import { get as getService } from '../service/user.get.service';

export const get = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await getService({
      email: req.query.email as string,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};
