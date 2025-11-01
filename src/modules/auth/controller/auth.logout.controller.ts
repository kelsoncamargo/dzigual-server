/**
 * logout
 *
 * Express handler to revoke the user’s refresh token and clear authentication cookies.
 *
 * @param {Request}  request   – Express request object, expects `cookies.refreshToken` to contain the token.
 * @param {Response} response  – Express response object.
 * @returns {Promise<Response>}
 *   – On success, clears `accessToken` and `refreshToken` cookies and sends:
 *     • message: MessageMap.SUCCESS.AUTH.LOGOUT
 * @throws {Error}
 *   – Responds with 400 Bad Request and `{ message: string }` when an error occurs.
 */

import { clearAuthCookies } from '../../../shared/cookies/cookies';
import { MessageMap } from '../../../shared/messages';
import { authService } from '../service/auth.service';
import { Request, Response } from 'express';

export const logout = async (request: Request, response: Response) => {
  try {
    const refreshToken = request.cookies?.refreshToken;

    await authService.logout({
      refreshToken,
    });

    clearAuthCookies(response);

    return response.send({
      message: MessageMap.SUCCESS.AUTH.LOGOUT,
    });
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
};
