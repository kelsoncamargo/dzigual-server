/**
 * AuthService
 *
 * Service class responsible for authentication business logic.
 *
 * @method login(params: IAuthLogin): Promise<IAuthLoginDto>
 *   – Validates user credentials and issues JWT access and refresh tokens.
 *
 * @method logout(params: IAuthLogout): Promise<IAuthLogoutDto | Error>
 *   – Revokes a user's refresh token and returns logout confirmation.
 *
 * @method refreshToken(params: IAuthRefreshToken): Promise<IAuthRefreshTokenDto>
 *   – Validates a refresh token and issues a new access token.
 */

import { login } from "./auth.login.service";
import { logout } from "./auth.logout.service";
import { refreshToken } from "./auth.refreshToken.service";

class AuthService {
  login = login;
  logout = logout;
  refreshToken = refreshToken;
}

export const authService = new AuthService();