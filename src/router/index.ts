/**
 * @fileoverview Main Express router that mounts sub-routers for users and auth modules.
 *
 * @module main-router
 * @version 1.1.0
 *
 * ### Key Setup
 * - Creates main router and mounts usersRouter at '/users' and authRouter at '/auth'.
 *
 * ### Routes
 * - /users: Mounts usersRouter for user-related operations.
 * - /auth: Mounts authRouter for authentication operations.
 * - /resource: Mounts resourceRouter for resource-related operations.
 *
 */

import { Router } from 'express';
import usersRouter from '../modules/user/user.routes';
import authRouter from '../modules/auth/auth.routes';
import resourceRouter from '../modules/resource/resource.routes';

export const router = Router();

router.use('/user', usersRouter);

router.use('/auth', authRouter);

router.use('/resource', resourceRouter);

export default router;
