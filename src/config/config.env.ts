/**
 * @module config
 * @description Loads environment variables and exports application configuration constants.
 *
 * @constant {boolean} isProd
 * @description Indicates if the application is running in production mode (PRODUCTION==="true").
 *
 * @constant {string} DATABASE_URL
 * @description Database connection URL from the environment.
 *
 * @constant {string} JWT_SECRET
 * @description Secret key for signing access tokens; selects production or development secret based on isProd.
 *
 * @constant {string} JWT_SECRET_REFRESH
 * @description Secret key for signing refresh tokens; selects production or development refresh secret based on isProd.
 *
 * @constant {string[]} CORS_ORIGINS
 * @description Array of allowed CORS origins parsed from the CORS_ORIGINS environment variable.
 *
 * @constant {number} RATE_LIMIT_WINDOW_MS
 * @description Time window in milliseconds for rate limiting; defaults to 15 minutes if not specified.
 *
 * @constant {number} RATE_LIMIT_MAX
 * @description Maximum number of requests allowed per RATE_LIMIT_WINDOW_MS; defaults to 100 if not specified.
 */

import dotenv from 'dotenv';
dotenv.config();

export const isProd = process.env.PRODUCTION === 'true';

export const DATABASE_URL = process.env.DATABASE_URL!;

export const JWT_SECRET = isProd
  ? process.env.JWT_SECRET!
  : process.env.JWT_SECRET_DEV!;

export const JWT_SECRET_REFRESH = isProd
  ? process.env.JWT_SECRET_REFRESH!
  : process.env.JWT_SECRET_DEV_REFRESH!;

export const RATE_LIMIT_WINDOW_MS =
  Number(process.env.RATE_WINDOW_MS) || 15 * 60 * 1000;
export const RATE_LIMIT_MAX = Number(process.env.RATE_MAX) || 100;
