/**
 * @fileoverview Express router that aggregates user sub-routers for create, get, update, and remove operations.
 *
 * @module user-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Creates main router and mounts sub-routers at root path '/'.
 *
 * ### Routes
 * - Uses userCreateRouter, userGetRouter, userUpdateRouter, userRemoveRouter for respective user operations.
 *
 */

import express from 'express';
import userGetRouter from './user.get.route';
import userCreateRouter from './user.create.route';
import userUpdateRouter from './user.update.route';
import userRemoveRouter from './user.remove.route';

const userRouter = express.Router();

userRouter.use('/', userCreateRouter);

userRouter.use('/', userGetRouter);

userRouter.use('/', userUpdateRouter);

userRouter.use('/', userRemoveRouter);

export default userRouter;
