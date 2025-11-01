/**
 * @fileoverview Controller function to get a user by email: processes query param, calls service, and responds with user or error.
 *
 * @module user-get-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Extracts email from req.query.
 * - Calls getService to fetch user.
 * - Responds with 200 and user, or 400 error.
 *
 * ### Functions
 * - get(req, res): Handles user get request asynchronously.
 *
 * @param {Request} req - Express request with query.email.
 * @param {Response} res - Express response for sending status and data.
 * @returns {Promise<Response>} The Express response object.
 *
 * @throws Error Responds with 400 and error message on failure.
 *
 */

import { Request, Response } from 'express';
import { get as getService } from '../service/user.get.service';
import { MessageMap } from '../../../shared/messages';

export const get = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await getService({
      email: req.query.email as string,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : MessageMap.ERROR.DEFAULT.SERVER,
    });
  }
};
