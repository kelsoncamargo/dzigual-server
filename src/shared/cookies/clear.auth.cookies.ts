/**
 * @fileoverview Utility function to clear authentication cookies from the Express response.
 *
 * @module clear-auth-cookies
 * @version 1.0.0
 *
 * ### Key Setup
 * - Clears 'accessToken' and 'refreshToken' cookies.
 *
 * ### Functions
 * - clearAuthCookies(res): Removes auth cookies from the response.
 *
 * @param {Response} res - The Express response object.
 *
 */

import { Response } from 'express';

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};
