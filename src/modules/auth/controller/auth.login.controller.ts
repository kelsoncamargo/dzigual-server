/**
 * login
 *
 * Authenticates a user, issues JWT tokens via `authService.login`, and sets auth cookies.
 *
 * Request body fields:
 * - email: string
 * - Password: string (note the capital "P")
 *
 * @param {Request}  request - Express request object with credentials in `body`.
 * @param {Response} response - Express response object.
 * @returns {Promise<Response>}
 *   On success, sets auth cookies for access and refresh tokens and responds with:
 *   { message: MessageMap.SUCCESS.AUTH.LOGIN }.
 * @throws {Error}
 *   Responds with 400 Bad Request and `{ message: string }` on failure.
 */

import { setAuthCookies } from '../../../shared/cookies/cookies';
import { MessageMap } from '../../../shared/messages';
import { authService } from '../service/auth.service';
import { Request, Response } from 'express';

export const login = async (request: Request, response: Response) => {
  try {
    const reqData = request.body;

    const credentials = {
      email: reqData.email,
      password: reqData.Password,
    };

    const tokens = await authService.login({
      email: credentials.email,
      password: credentials.password,
    });

    setAuthCookies(response, tokens.token, tokens.refreshToken);

    return response.send({
      message: MessageMap.SUCCESS.AUTH.LOGIN,
    });
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
};
