/**
 * @fileoverview Repository class aggregating authentication functions (login, logout, refreshToken) and exporting a singleton instance.
 *
 * @module auth-repository
 * @version 1.0.0
 *
 * ### Key Setup
 * - Aggregates auth repo functions into a class for centralized access.
 *
 * ### Class
 * - AuthRepository: Class with methods for login, logout, and refreshToken.
 *
 */

import { login } from './auth.login.repo';
import { logout } from './auth.logout.repo';
import { refreshToken } from './auth.refreshToken.repo';

class AuthRepository {
  login = login;
  logout = logout;
  refreshToken = refreshToken;
}

export const authRepository = new AuthRepository();
