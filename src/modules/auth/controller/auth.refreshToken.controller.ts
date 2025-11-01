/**
 * refreshToken
 *
 * Express handler to refresh the access token using a valid refresh token.
 *
 * @param {Request}  request   – Express request object, expects `cookies.refreshToken` to contain the refresh token.
 * @param {Response} response  – Express response object.
 * @returns {Promise<Response>}
 *   – On success, clears the old accessToken cookie, sets a new one, and sends:
 *     • message: MessageMap.SUCCESS.AUTH.TOKEN
 * @throws {Error}
 *   – Responds with 400 Bad Request and `{ message: string }` if the refresh token is invalid or any error occurs.
 */

import { setAccessToken } from '../../../shared/cookies/cookies';
import { MessageMap } from '../../../shared/messages';
import { authService } from '../service/auth.service';
import { Request, Response } from 'express';

export const refreshToken = async (request: Request, response: Response) => {
  try {
    const refreshToken = request.cookies.refreshToken;

    const { token } = await authService.refreshToken({
      refreshToken,
    });

    response.clearCookie('accessToken');

    setAccessToken(response, token);

    return response.send({
      message: MessageMap.SUCCESS.AUTH.TOKEN,
    });
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
};
