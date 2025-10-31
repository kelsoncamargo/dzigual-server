/**
 * AuthLogoutRouter
 *
 * Express router for user logout endpoint.
 *
 * @route GET /auth/logout
 *
 * @returns {void}
 *   Delegates to `authController.logout` to revoke refresh token and clear cookies.
 * @throws {400}
 *   If logout operation fails, responds with 400 Bad Request and error message.
 */

import express, { Request, Response } from 'express';
import { authController } from '../controller/auth.controller';

const authLogoutRouter = express.Router();

authLogoutRouter.get('/logout', async (req: Request, res: Response) => {
  await authController.logout(req, res);
});

export default authLogoutRouter;
