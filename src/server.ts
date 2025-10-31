/**
 * @fileoverview Initializes and starts the Express server with middlewares, routes, and error handling.
 *
 * @module server
 * @version 1.0.0
 *
 * ### Key Setup
 * - Loads env vars via dotenv.
 * - Configures JSON parsing (2MB limit), cookie parsing, and security (headers, CORS, rate limit, etc.).
 * - Mounts routes at `/`.
 * - Handles Celebrate errors (status 401) and global errors.
 * - Listens on `process.env.PORT` or 8000.
 *
 * ### Middlewares
 * - express.json({ limit: "2mb" }): Parses JSON bodies.
 * - cookieParser(): Parses cookies.
 * - applySecurity(): Adds security features (Helmet, CORS, etc.).
 * - router: Application routes.
 * - errors({ statusCode: 401 }): Validation errors.
 * - Global handler: Catches errors, logs, and responds.
 *
 * Async IIFE for setup; exits on failure.
 *
 * @param {string} [process.env.PORT] - Port (fallback 8000).
 * @listens PORT - Incoming connections.
 * @example Run with node/ts-node; access localhost:8000.
 * @throws Error on init failure.
 */

import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { errors } from 'celebrate';

import router from './router';
import { applySecurity } from './middlewares/security.middleware';
import cookieParser from 'cookie-parser';
import { MessageMap } from './shared/messages';

dotenv.config();

export const server = express();

server.use(express.json({ limit: '2mb' }));

server.use(cookieParser());

(async () => {
  try {
    await applySecurity(server);

    server.use('/', router);

    server.use(errors({ statusCode: 401 }));

    server.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(err);
      const status = err.statusCode || 500;
      const message = err.message || MessageMap.ERROR.DEFAULT.INTERNAL_ERROR;
      res.status(status).json({ message });
    });

    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () =>
      console.log(`${MessageMap.SUCESS.FILES.SERVER.RUN} ${PORT}`),
    );
  } catch (err) {
    console.error(MessageMap.ERROR.FILES.SERVER.FAILED, err);
    process.exit(1);
  }
})();
