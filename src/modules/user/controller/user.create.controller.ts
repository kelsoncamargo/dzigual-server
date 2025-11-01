/**
 * @fileoverview Controller function to create a new user: processes request body, calls service, and responds with success or error.
 *
 * @module user-create-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Extracts user data from req.body.
 * - Calls createService to persist user.
 * - Responds with 201 success and user, or 400 error.
 *
 * ### Functions
 * - create(req, res): Handles user creation request asynchronously.
 *
 * @param {Request} req - Express request with body containing name, lastName, email, password, phoneNumber.
 * @param {Response} res - Express response for sending status, message, and user.
 * @returns {Promise<Response>} The Express response object.
 *
 * @throws Error Responds with 400 and error message on failure.
 *
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
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
    });

    return res.status(201).json({
      message: `create_${MessageMap.SUCCESS.DEFAULT.SUCCESS}`,
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
