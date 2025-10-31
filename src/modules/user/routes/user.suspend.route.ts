/**
 * UserSuspendRouter
 *
 * Express router for suspending a user under an active user.
 *
 * @route POST /user/suspend
 * @middleware authenticate                     – Verifies JWT and attaches `req.payload`.
 * @middleware requireuserActive             – Ensures the user is ACTIVE.
 * @middleware authorize("user:*")              – Checks user has any user-level permission.
 * @middleware celebrate(userSchema.suspend())   – Validates request body against the suspend schema.
 *
 * @returns {void}
 *   Delegates to `userController.suspend` on success.
 * @throws {401}
 *   If authentication fails (invalid or missing token).
 * @throws {403}
 *   If the user is inactive.
 * @throws {400}
 *   If request validation fails or the controller throws an error.
 */

import express, { NextFunction, Request, Response } from "express";
import { authenticate } from "../../../middlewares/auth/middleware/auth.middleware";
import { authorize } from "../../../middlewares/authorize/authorize.middleware";
import { userController } from "../controller/user.controller";
import { celebrate } from "celebrate";
import { userSchema } from "../schema/user.schema";
import { requireCompanyActive } from "../../../middlewares/company/company.middleware";

const userSuspendRouter = express.Router();

userSuspendRouter.post(
  "/suspend",
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response, next: NextFunction) => {
    await requireCompanyActive(req, res, next);
  },

  authorize("user:*"),

  celebrate(userSchema.suspend()),

  async (req: Request, res: Response) => {
    await userController.suspend(req, res);
  },
);

export default userSuspendRouter;


