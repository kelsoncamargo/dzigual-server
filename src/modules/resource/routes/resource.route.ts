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
import resourceGetRouter from './resource.getAll.route';

const resourceRouter = express.Router();

resourceRouter.use('/', resourceGetRouter);

export default resourceRouter;
