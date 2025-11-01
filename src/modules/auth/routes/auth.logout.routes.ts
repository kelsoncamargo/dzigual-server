/**
 * @fileoverview Express router for authentication logout endpoint.
 *
 * @module auth-logout-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Defines router with GET /logout route.
 * - Calls authController.logout handler.
 *
 * ### Routes
 * - PUT: Handles logout with controller.
 *
 */

import express, { Request, Response } from 'express';
import { authController } from '../controller/auth.controller';

const authLogoutRouter = express.Router();

authLogoutRouter.put('/', async (req: Request, res: Response) => {
  await authController.logout(req, res);
});

export default authLogoutRouter;
