/**
 * @module auth.middleware.cookies
 * @description Utilities for setting and clearing HttpOnly authentication cookies (`accessToken` and `refreshToken`).
 *
 * Requires environment variable:
 * - PRODUCTION: set to "true" in production to enable `secure` flag on cookies.
 *
 * @function setAuthCookies
 * @param {import("express").Response} res – Express response object.
 * @param {string} accessToken – JWT access token to set in cookie.
 * @param {string} refreshToken – JWT refresh token to set in cookie.
 * @returns {void}
 *
 * @function clearAuthCookies
 * @param {import("express").Response} res – Express response object.
 * @returns {void}
 */

import { Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.PRODUCTION === 'true';

export const setAccessToken = (res: Response, accessToken: string) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60, // 1 hour
  });
};

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60, // 1 hour
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};
