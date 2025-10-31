/**
 * UserUpdateRouter
 *
 * Express router for updating user details under an active company.
 *
 * @route POST /user/update
 * @middleware authenticate                     – Verifies JWT and attaches `req.payload`.
 * @middleware requirecompanyActive             – Ensures the company is ACTIVE.
 * @middleware authorize("user:*")              – Checks user has any user-level permission.
 * @middleware celebrate(userSchema.update())   – Validates request body against the update schema.
 *
 * @returns {void} Delegates to `userController.update` on success.
 * @throws {401} If authentication fails (invalid or missing token).
 * @throws {403} If the company is inactive.
 * @throws {400} If request validation fails or the controller throws an error.
 */

import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { authorize } from '../../../middlewares/authorize/authorize.middleware';
import { userController } from '../controller/user.controller';
import { celebrate } from 'celebrate';
import { userSchema } from '../schema/user.schema';
import { requireCompanyActive } from '../../../middlewares/company/company.middleware';

const companyUpdateRouter = express.Router();

companyUpdateRouter.post(
  '/update',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response, next: NextFunction) => {
    await requireCompanyActive(req, res, next);
  },

  authorize('user:*'),

  celebrate(userSchema.update()),

  async (req: Request, res: Response) => {
    await userController.update(req, res);
  },
);

export default companyUpdateRouter;
