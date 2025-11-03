/**
 * @fileoverview Utility function to set an access token cookie in the Express response with secure options.
 *
 * @module set-access-token
 * @version 1.0.0
 *
 * ### Key Setup
 * - Determines secure flag based on production environment.
 * - Sets cookie with httpOnly, secure, sameSite, and 5-minute maxAge.
 *
 * ### Functions
 * - setAccessToken(res, accessToken): Sets the 'accessToken' cookie in the response.
 *
 * @param {Response} res - The Express response object.
 * @param {string} accessToken - The access token string to set in the cookie.
 *
 */

import { Response } from 'express';
import isProduction from '../isProduction';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default function setAccessToken(res: Response, accessToken: string) {
  const { isProduction: production } = isProduction();

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: production,
    sameSite: 'strict',
    maxAge: 1000 * 60 * parseInt(`${process.env.TIME_TOKEN as any}`),
  });
}
