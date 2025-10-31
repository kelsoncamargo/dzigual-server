/**
 * authenticate
 *
 * Express middleware that verifies a JWT from the `accessToken` cookie, 
 * ensures the user is active, and attaches the decoded payload to `req.user`.
 *
 * @param {AuthRequest} req     – Request object extended with `user: IJwtPayload`.
 *                               Expects `req.cookies.accessToken` to contain the JWT.
 * @param {Response}    res     – Express response object.
 * @param {NextFunction} next   – Next middleware function in the stack.
 * @returns {Promise<void>}
 *   – Calls `next()` if the token is valid and the user is active.
 * @throws {Error}
 *   – Responds with 401 Unauthorized and 
 *     `{ message: MessageMap.ERROR.MIDDLEWARE.AUTH.UNAUTHORIZED }` if:
 *       • No token is present.
 *       • The token is invalid or expired.
 *       • The user is not found or is inactive.
 */


import { Request, Response, NextFunction } from "express";
import { validateToken } from "../service/auth.service";
import { MessageMap } from "../../../shared/messages";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: MessageMap.ERROR.AUTH.NOT_FOUND });
    }

    const payload = await validateToken(token);

    req.payload = payload;

    next();
  } catch {
    return res
      .status(401)
      .json({ message: MessageMap.ERROR.AUTH.UNAUTHORIZED });
  }
}
