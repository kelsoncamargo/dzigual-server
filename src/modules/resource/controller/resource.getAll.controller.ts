/**
 * @fileoverview Controller handler for retrieving all resources with pagination.
 *
 * @module resource-controller-get-all
 * @version 1.0.0
 *
 * ### Key Setup
 * - Parses page and limit from query parameters, defaulting to 0 if not provided.
 * - Calls the resource service to fetch paginated data.
 * - Handles success by returning JSON with status 200.
 * - Catches errors and returns JSON with status 400 and an error message.
 *
 * ### Functions
 * - getAll(req, res): Asynchronously handles the GET request for all resources.
 *
 * @param {Request} req - The Express request object containing query parameters for page and limit.
 * @param {Response} res - The Express response object.
 * @returns {Promise<Response>} Promise resolving to the Express response object with JSON data.
 *
 */

import { MessageMap } from '../../../shared/messages';
import { resourceService } from '../service/resource.service';
import { Request, Response } from 'express';

export const getAll = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 0;

    const user = await resourceService.getAll({
      page: page,
      limit: limit,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : MessageMap.ERROR.DEFAULT.SERVER,
    });
  }
};
