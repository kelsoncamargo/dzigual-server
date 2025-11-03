/**
 * @fileoverview Express router for handling GET requests to retrieve a specific resource by ID.
 *
 * @module resource-get-router
 * @version 1.0.0
 *
 * ### Key Setup
 * - Imports Express and necessary types for Request, Response, NextFunction.
 * - Uses authentication middleware to secure the route.
 * - Calls the resource controller's get method to handle the request.
 *
 * ### Routes
 * - GET '/:id': Authenticates the request and retrieves the resource by ID.
 *
 */

import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { resourceController } from '../controller/resource.controller';

const resourceGetRouter = express.Router();

resourceGetRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response) => {
    await resourceController.get(req, res);
  },
);

export default resourceGetRouter;
