import { Response } from 'express';
import isProduction from '../isProduction';

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
    maxAge: 1000 * 60 * 5, // 5 min
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: production,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
