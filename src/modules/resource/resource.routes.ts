/**
 * @fileoverview Express router that mounts the resource sub-router for all resource-related endpoints.
 *
 * @module resource-main-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Creates main router and mounts routerResource at root path '/'.
 *
 * ### Routes
 * - Uses routerResource for all resource operations.
 *
 */

import express from 'express';

import routerResource from './routes/resource.route';

const resourceRouter = express.Router();

resourceRouter.use('/', routerResource);

export default resourceRouter;
