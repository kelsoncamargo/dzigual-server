/**
 * @fileoverview Main Express router for resource-related routes.
 *
 * @module resource-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Imports Express and the specific routers for getting all resources and getting a single resource.
 * - Creates a main router instance.
 * - Mounts both the get-all and get-single routers at the root path to handle respective sub-routes.
 *
 * ### Routes
 * - Uses '/': Mounts resourceGetAllRouter to handle routes for retrieving all resources.
 * - Uses '/': Mounts resourceGetRouter to handle routes for retrieving a single resource.
 *
 */

import express from 'express';
import resourceGetAllRouter from './resource.getAll.route';
import resourceGetRouter from './resource.get.route';

const resourceRouter = express.Router();

resourceRouter.use('/', resourceGetAllRouter);

resourceRouter.use('/', resourceGetRouter);

export default resourceRouter;
