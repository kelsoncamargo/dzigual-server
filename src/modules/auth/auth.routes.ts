/**
 * @fileoverview Express router that mounts the auth sub-router for all authentication-related endpoints.
 *
 * @module auth-main-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Creates main router and mounts routerAuth at root path '/'.
 *
 * ### Routes
 * - Uses routerAuth for all auth operations (login, logout, refresh).
 *
 */

import express from 'express';

import routerAuth from './routes/auth.routes';

const authRouter = express.Router();

authRouter.use('/', routerAuth);

export default authRouter;
