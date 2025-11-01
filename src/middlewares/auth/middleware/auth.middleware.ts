/**
 * @fileoverview Express middleware to authenticate requests via JWT in 'accessToken' cookie, validate user activity, and attach payload to req.payload.
 *
 * @module auth-middleware
 * @version 1.0.0
 *
 * ### Key Setup
 * - Extracts token from cookie, validates it, checks user active status.
 * - Attaches decoded payload to req.payload if valid.
 *
 * ### Functions
 * - authenticate(req, res, next): Authenticates request and calls next() on success.
 *
 * @param {Request} req - Express request with cookies.accessToken.
 * @param {Response} res - Express response for error handling.
 * @param {NextFunction} next - Next middleware function.
 * @returns {Promise<void>} Calls next() if authenticated.
 *
 * @throws Error Responds with 401 and custom message if token missing, invalid, or user inactive.
 */

import { Request, Response, NextFunction } from 'express';
import { validadeUserByToken } from '../service/auth.service';
import { MessageMap } from '../../../shared/messages';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: `${MessageMap.ERROR.DEFAULT.UNAUTHORIZED}_token` });
    }

    const payload = await validadeUserByToken(token);

    req.payload = payload;

    next();
  } catch {
    return res
      .status(401)
      .json({ message: MessageMap.ERROR.DEFAULT.UNAUTHORIZED });
  }
}
