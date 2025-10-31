/**
 * AuthRefreshTokenRouter
 *
 * Express router for refreshing JWT access tokens.
 *
 * @route GET /auth/refreshToken
 * @returns {void}
 *   Delegates to `authController.refreshToken` to validate the refresh token,
 *   clear the old access token cookie, set a new one, and respond with a success message.
 * @throws {400}
 *   If the refresh token is invalid or any error occurs, responds with 400 Bad Request and an error message.
 */


import express, { Request, Response } from "express";
import { authController } from "../controller/auth.controller";

const authRefreshTokenRouter = express.Router();

authRefreshTokenRouter.get(
  "/refreshToken",
  async (req: Request, res: Response) => {
    await authController.refreshToken(req, res);
  }
);

export default authRefreshTokenRouter;
