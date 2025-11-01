/**
 * @fileoverview Express router for user get endpoint with authentication.
 *
 * @module user-get-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Defines router with GET / route.
 * - Applies authenticate middleware for auth check.
 * - Calls userController.get handler.
 *
 * ### Routes
 * - GET /: Gets user with auth and controller.
 *
 */

import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { userController } from '../controller/user.controller';

const userGetRouter = express.Router();

userGetRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response) => {
    await userController.get(req, res);
  },
);

export default userGetRouter;
