/**
 * @fileoverview Controller function for user login: processes credentials, generates tokens, sets auth cookies, and responds with success or error.
 *
 * @module auth-login-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Extracts email/password from request body.
 * - Calls authService.login to validate and generate tokens.
 * - Sets cookies via cookies.setAuthCookies.
 * - Responds with success message or 400 error.
 *
 * ### Functions
 * - login(request, response): Handles login request asynchronously.
 *
 * @param {Request} request - Express request with body containing email and password.
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

export const login = async (request: Request, response: Response) => {
  try {
    const reqData = request.body;

    const { email, password } = reqData;

    const { newToken, newRefreshToken } = await authService.login({
      email,
      password,
    });

    cookies.setAuthCookies(response, newToken, newRefreshToken);

    return response.send({
      message: `login_${MessageMap.SUCCESS.DEFAULT.SUCCESS}`,
    });
  } catch (error: any) {
    return response.status(400).send({ message: error.message });
  }
};
