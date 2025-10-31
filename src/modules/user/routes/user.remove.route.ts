/**
 * UserRemoveRouter
 *
 * Express router for deleting a user under an active user.
 *
 * @route DELETE /user/remove
 * @middleware authenticate                     – Verifies JWT and attaches `req.payload`.
 * @middleware requireuserActive             – Ensures the user is ACTIVE.
 * @middleware authorize("user:*")              – Checks user has any user-level permission.
 * @middleware celebrate(userSchema.remove())   – Validates request query parameters.
 *
 * @returns {void} Delegates to `userController.remove` on success.
 * @throws {401} If authentication fails (invalid or missing token).
 * @throws {403} If the user is inactive.
 * @throws {400} If request validation fails or the controller throws an error.
 */

import express, { NextFunction, Request, Response } from "express";
import { authenticate } from "../../../middlewares/auth/middleware/auth.middleware";
import { authorize } from "../../../middlewares/authorize/authorize.middleware";
import { userController } from "../controller/user.controller";
import { celebrate } from "celebrate";
import { userSchema } from "../schema/user.schema";
import { requireCompanyActive } from "../../../middlewares/company/company.middleware";

const userRemoveRouter = express.Router();

userRemoveRouter.post(
  "/remove",
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response, next: NextFunction) => {
    await requireCompanyActive(req, res, next);
  },

  authorize("user:*"),

  celebrate(userSchema.remove()),

  async (req: Request, res: Response) => {
    await userController.remove(req, res);
  },
);

export default userRemoveRouter;

