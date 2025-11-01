/**
 * @fileoverview Express router for authentication login endpoint with validation.
 *
 * @module auth-login-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Defines router with GET /login route.
 * - Applies celebrate validation using authSchema.login().
 * - Calls authController.login handler.
 *
 * ### Routes
 * - POST: Handles login with validation and controller.
 *
 */

import express, { Request, Response } from 'express';
import { celebrate } from 'celebrate';
import { authController } from '../controller/auth.controller';
import { authSchema } from '../schema/auth.schema';

const authLoginRouter = express.Router();

authLoginRouter.post(
  '/',
  celebrate(authSchema.login()),
  async (req: Request, res: Response) => {
    await authController.login(req, res);
  },
);

export default authLoginRouter;
