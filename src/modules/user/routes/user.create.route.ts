/**
 * UserCreateRouter
 *
 * Express router for creating a new user under an active user.
 *
 * @route POST /user/create
 * @middleware authenticate                     – Verifies JWT and attaches `req.payload`.
 * @middleware requireuserActive             – Ensures the user is ACTIVE.
 * @middleware authorize("user:*")              – Checks user has any user-level permission.
 * @middleware celebrate(userSchema.create())   – Validates request body against the create schema.
 *
 * @returns {void}
 *   Delegates to `userController.create` on success.
 * @throws {401}
 *   If authentication fails (invalid or missing token).
 * @throws {403}
 *   If the user is inactive.
 * @throws {400}
 *   If request validation fails or the controller throws an error.
 */

import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { authorize } from '../../../middlewares/authorize/authorize.middleware';
import { userController } from '../controller/user.controller';
import { celebrate } from 'celebrate';
import { userSchema } from '../schema/user.schema';
import { requireCompanyActive } from '../../../middlewares/company/company.middleware';

const userCreateRouter = express.Router();

userCreateRouter.post(
  '/create',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response, next: NextFunction) => {
    await requireCompanyActive(req, res, next);
  },

  authorize('user:*'),

  celebrate(userSchema.create()),

  async (req: Request, res: Response) => {
    await userController.create(req, res);
  },
);

export default userCreateRouter;
