/**
 * @fileoverview Express router for user creation endpoint with authentication and validation.
 *
 * @module user-create-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Defines router with POST / route.
 * - Applies authenticate middleware for auth check.
 * - Uses celebrate validation with userSchema.create().
 * - Calls userController.create handler.
 *
 * ### Routes
 * - POST /: Creates user with auth, validation, and controller.
 *
 */

import express, { Request, Response } from 'express';
import { userController } from '../controller/user.controller';
import { celebrate } from 'celebrate';
import { userSchema } from '../schema/user.schema';

const userCreateRouter = express.Router();

userCreateRouter.post(
  '/',

  celebrate(userSchema.create()),

  async (req: Request, res: Response) => {
    await userController.create(req, res);
  },
);

export default userCreateRouter;
