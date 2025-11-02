/**
 * @fileoverview Express router for user update endpoint with authentication and validation.
 *
 * @module user-update-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Defines router with PATCH / route.
 * - Applies authenticate middleware for auth check.
 * - Uses celebrate validation with userSchema.update().
 * - Calls userController.update handler.
 *
 * ### Routes
 * - PATCH /: Updates user with auth, validation, and controller.
 *
 */

import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { userController } from '../controller/user.controller';
import { celebrate } from 'celebrate';
import { userSchema } from '../schema/user.schema';

const userUpdateRouter = express.Router();

userUpdateRouter.patch(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  celebrate(userSchema.update()),

  async (req: Request, res: Response) => {
    await userController.update(req, res);
  },
);

export default userUpdateRouter;
