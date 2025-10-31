/**
 * AuthRepository
 *
 * Repository class responsible for authentication persistence operations.
 *
 * @method login(params: IAuthLogin): Promise<User | null>
 *   – Authenticates a user by document ID and email.
 *
 * @method logout(params: IAuthLogout): Promise<IAuthLogoutDto | null>
 *   – Revokes a user's refresh token and logs them out.
 *
 * @method refreshToken(params: IAuthRefreshToken): Promise<IJwtPayload>
 *   – Validates and decodes a JWT refresh token, returning its payload.
 */


import { login } from "./auth.login.repo";
import { logout } from "./auth.logout.repo";
import { refreshToken } from "./auth.refreshToken.repo";

class AuthRepository {
  login = login;
  logout = logout;
  refreshToken = refreshToken;
}

export const authRepository = new AuthRepository();