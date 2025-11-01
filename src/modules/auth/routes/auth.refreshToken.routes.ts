/**
 * @fileoverview Express router for authentication refresh token endpoint.
 *
 * @module auth-refresh-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Defines router with GET /refreshToken route.
 * - Calls authController.refreshToken handler.
 *
 * ### Routes
 * - GET /refreshToken: Handles token refresh with controller.
 *
 */

import express, { Request, Response } from 'express';
import { authController } from '../controller/auth.controller';

const authRefreshTokenRouter = express.Router();

authRefreshTokenRouter.get(
  '/refreshToken',
  async (req: Request, res: Response) => {
    await authController.refreshToken(req, res);
  },
);

export default authRefreshTokenRouter;
