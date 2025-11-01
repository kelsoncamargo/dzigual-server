/**
 * @fileoverview Controller function to handle refresh token: validates refresh token, generates new access token, updates cookie, and responds with success or error.
 *
 * @module auth-refresh-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Extracts refreshToken from request cookies.
 * - Calls authService.refreshToken to get new token.
 * - Clears old accessToken cookie and sets new one via cookies.setAccessToken.
 * - Responds with success message or 400 error.
 *
 * ### Functions
 * - refreshToken(request, response): Handles refresh token request asynchronously.
 *
 * @param {Request} request - Express request with cookies.refreshToken.
 * @param {Response} response - Express response for sending status and message.
 * @returns {Promise<void>} Sends response with message.
 *
 * @throws Error Responds with 400 and error message on failure.
 *
 */

import { cookies } from '../../../shared/cookies/cookies';
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

    cookies.setAccessToken(response, token);

    return response.send({
      message: `token_${MessageMap.SUCCESS.DEFAULT.CREATED}`,
    });
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
};
