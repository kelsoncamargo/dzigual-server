/**
 * @fileoverview Utility function to set authentication cookies (access and refresh tokens) in the Express response with secure options.
 *
 * @module set-auth-cookies
 * @version 1.0.0
 *
 * ### Key Setup
 * - Determines secure flag based on production environment.
 * - Sets 'accessToken' cookie with 5-minute maxAge and 'refreshToken' with 7-day maxAge.
 *
 * ### Functions
 * - setAuthCookies(res, accessToken, refreshToken): Sets both auth cookies in the response.
 *
 * @param {Response} res - The Express response object.
 * @param {string} accessToken - The access token string to set.
 * @param {string} refreshToken - The refresh token string to set.
 *
 */

import { Response } from 'express';
import isProduction from '../isProduction';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  const { isProduction: production } = isProduction();

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: production,
    sameSite: 'strict',
    maxAge: 1000 * 60 * parseInt(`${process.env.TIME_TOKEN as any}`),
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: production,
    sameSite: 'strict',
    maxAge:
      1000 *
      60 *
      60 *
      24 *
      parseInt(`${process.env.TIME_REFRESH_TOKEN as any}`),
  });
};
