/**
 * @fileoverview Main Express router for resource-related routes.
 *
 * @module resource-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Imports Express and the specific GET router for resources.
 * - Creates a main router instance.
 * - Mounts the resource GET router at the root path.
 *
 * ### Routes
 * - Uses '/': Mounts the resourceGetRouter to handle all sub-routes starting from the root.
 *
 */

import express from 'express';
import resourceGetAllRouter from './resource.getAll.route';
import resourceGetRouter from './resource.get.route';

const resourceRouter = express.Router();

resourceRouter.use('/', resourceGetAllRouter);

resourceRouter.use('/', resourceGetRouter);

export default resourceRouter;
