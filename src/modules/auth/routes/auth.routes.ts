/**
 * @fileoverview Express router that aggregates authentication sub-routers for login, logout, and refresh token endpoints.
 *
 * @module auth-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Creates main router and mounts sub-routers at root path '/'.
 *
 * ### Routes
 * - Uses authLoginRouter, authLogoutRouter, authRefreshTokenRouter for respective auth operations.
 *
 */

import express from 'express';
import authLoginRouter from './auth.login.routes';
import authLogoutRouter from './auth.logout.routes';
import authRefreshTokenRouter from './auth.refreshToken.routes';

const routerAuth = express.Router();

routerAuth.use('/', authLoginRouter);

routerAuth.use('/', authLogoutRouter);

routerAuth.use('/', authRefreshTokenRouter);

export default routerAuth;
