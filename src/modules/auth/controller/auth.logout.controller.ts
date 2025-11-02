/**
 * @fileoverview Controller function for user logout: revokes refresh token, clears auth cookies, and responds with success or error.
 *
 * @module auth-logout-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Extracts refreshToken from request cookies.
 * - Calls authService.logout to revoke token.
 * - Clears cookies via cookies.clearAuthCookies.
 * - Responds with success message or 400 error.
 *
 * ### Functions
 * - logout(request, response): Handles logout request asynchronously.
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

export const logout = async (request: Request, response: Response) => {
  try {
    const refreshToken = request.cookies?.refreshToken;

    await authService.logout({
      refreshToken,
    });

    cookies.clearAuthCookies(response);

    return response.send({
      message: `logout_${MessageMap.SUCCESS.DEFAULT.CREATED}`,
    });
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
};
