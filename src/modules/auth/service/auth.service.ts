/**
 * @fileoverview Service class aggregating authentication functions (login, logout, refreshToken) and exporting a singleton instance.
 *
 * @module auth-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Aggregates auth service functions into a class for centralized access.
 *
 * ### Class
 * - AuthService: Class with methods for login, logout, and refreshToken.
 *
 */

import { login } from './auth.login.service';
import { logout } from './auth.logout.service';
import { refreshToken } from './auth.refreshToken.service';

class AuthService {
  login = login;
  logout = logout;
  refreshToken = refreshToken;
}

export const authService = new AuthService();
