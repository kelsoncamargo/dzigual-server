/**
 * @fileoverview Express router for user removal endpoint with authentication.
 *
 * @module user-remove-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Defines router with DELETE / route.
 * - Applies authenticate middleware for auth check.
 * - Calls userController.remove handler.
 *
 * ### Routes
 * - DELETE /: Removes user with auth and controller.
 *
 * @example
 * import userRemoveRouter from './userRemoveRouter';
 * app.use('/users', userRemoveRouter); // Mount at /users/
 */

import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { userController } from '../controller/user.controller';

const userRemoveRouter = express.Router();

userRemoveRouter.delete(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response) => {
    await userController.remove(req, res);
  },
);

export default userRemoveRouter;
