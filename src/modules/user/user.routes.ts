/**
 * @fileoverview Express router that mounts the user sub-router for all user-related endpoints.
 *
 * @module user-main-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Creates main router and mounts routerUser at root path '/'.
 *
 * ### Routes
 * - Uses routerUser for all user operations (create, get, update, remove).
 *
 */

import express from 'express';

import routerUser from './routes/user.route';

const userRouter = express.Router();

userRouter.use('/', routerUser);

export default userRouter;
