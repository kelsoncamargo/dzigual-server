/**
 * @fileoverview Configures CORS middleware for Express with dynamic origin validation from env vars.
 *
 * @module cors.middleware
 * @version 1.0.0
 *
 * ### Key Setup
 * - Parses `process.env.CORS_ORIGINS` into cleaned array `NEW_CORS_ORIGINS`.
 * - Applies CORS to app with origin check, methods, credentials, and caching.
 *
 * ### CORS Options
 * - origin: Allows if no origin or in list; else errors.
 * - methods: GET, POST, PUT, PATCH, DELETE.
 * - credentials: true.
 * - optionsSuccessStatus: 204.
 * - maxAge: 86400s (24h).
 *
 * @param {string} [process.env.CORS_ORIGINS] - Comma-separated origins.
 * @throws Error for invalid origins.
 */

import cors from 'cors';
import { Application } from 'express';

const raw = process.env.CORS_ORIGINS ?? '';
export const NEW_CORS_ORIGINS = raw
  .split(',')
  .map(u => u.trim())
  .filter(u => u);

export function applyCors(app: Application): void {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || NEW_CORS_ORIGINS.includes(origin)) {
          return callback(null, true);
        }
        callback(new Error('CORS origin not allowed'));
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
      optionsSuccessStatus: 204,
      maxAge: 24 * 60 * 60,
    }),
  );
}
