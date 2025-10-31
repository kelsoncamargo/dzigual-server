/**
 * AuthController
 *
 * Controller class responsible for authentication endpoints.
 *
 * @method login(req: Request, res: Response): Promise<Response>
 *   – Handles user login by validating credentials, issuing JWTs, and setting auth cookies.
 *
 * @method logout(req: Request, res: Response): Promise<Response>
 *   – Handles user logout by revoking the refresh token and clearing auth cookies.
 *
 * @method refreshToken(req: Request, res: Response): Promise<Response>
 *   – Handles access token renewal by validating the refresh token and setting a new access token cookie.
 */

import { login } from "./auth.login.controller";
import { logout } from "./auth.logout.controller";
import { refreshToken } from "./auth.refreshToken.controller";

export class AuthController {
  login = login;
  logout = logout;
  refreshToken = refreshToken;
}

export const authController = new AuthController();