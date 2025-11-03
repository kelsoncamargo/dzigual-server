/**
 * @fileoverview Express router for handling GET requests to retrieve all resources.
 *
 * @module resource-get-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Imports Express and necessary types for Request, Response, NextFunction.
 * - Uses authentication middleware to secure the route.
 * - Applies Celebrate validation using the resource schema for getAll.
 * - Calls the resource controller's getAll method to handle the request.
 *
 * ### Routes
 * - GET '/': Authenticates the request, validates pagination parameters, and retrieves paginated resources.
 *
 */

import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { resourceController } from '../controller/resource.controller';

const resourceGetAllRouter = express.Router();

resourceGetAllRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response) => {
    await resourceController.getAll(req, res);
  },
);

export default resourceGetAllRouter;
