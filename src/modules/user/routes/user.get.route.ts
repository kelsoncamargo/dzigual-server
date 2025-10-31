/**
 * UserGetRouter
 *
 * Express router for authenticating and retrieving user details.
 *
 * @route GET /get
 * @middleware authenticate                   – Verifies JWT and attaches `req.payload`.
 * @middleware requireuserActiveOrOwner    – Ensures user is ACTIVE or user is OWNER.
 * @middleware authorize("user:*")            – Checks user has any user-level permission.
 *
 * @returns {void}
 *   Delegates to `userController.get` on success.
 * @throws {401}
 *   If authentication fails (invalid/missing token).
 * @throws {403}
 *   If user is inactive and user is not OWNER, or lacks permission.
 * @throws {400}
 *   If any runtime error occurs in the handler.
 */

import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { authorize } from '../../../middlewares/authorize/authorize.middleware';
import { userController } from '../controller/user.controller';

const userGetRouter = express.Router();

userGetRouter.get(
  '/get',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  authorize('user:*'),

  async (req: Request, res: Response) => {
    console.log('UserGetRouter GET /get called');
    await userController.get(req, res);
  },
);

export default userGetRouter;
