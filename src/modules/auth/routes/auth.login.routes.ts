/**
 * AuthLoginRouter
 *
 * Express router for user authentication (login) endpoint.
 *
 * @route GET /auth/login
 * @middleware celebrate(authSchema.login())   – Validates request payload against the login schema.
 *
 * @returns {void}
 *   Delegates to `authController.login` on successful validation.
 * @throws {400}
 *   If validation fails, Celebrate will return a 400 Bad Request.
 */

import express, { Request, Response } from 'express';
import { celebrate } from 'celebrate';
import { authController } from '../controller/auth.controller';
import { authSchema } from '../schema/auth.schema';

const authLoginRouter = express.Router();

authLoginRouter.get(
  '/login',
  celebrate(authSchema.login()),
  async (req: Request, res: Response) => {
    await authController.login(req, res);
  },
);

export default authLoginRouter;
