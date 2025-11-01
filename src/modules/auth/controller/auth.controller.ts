/**
 * @fileoverview Controller class aggregating authentication handlers (login, logout, refreshToken) and exporting a singleton instance.
 *
 * @module auth-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Aggregates auth controller functions into a class for centralized access.
 *
 * ### Class
 * - AuthController: Class with methods for login, logout, and refreshToken.
 *
 */

import { login } from './auth.login.controller';
import { logout } from './auth.logout.controller';
import { refreshToken } from './auth.refreshToken.controller';

export class AuthController {
  login = login;
  logout = logout;
  refreshToken = refreshToken;
}

export const authController = new AuthController();
