/**
 * @fileoverview Controller handler for retrieving a single resource by ID.
 *
 * @module resource-controller-get
 * @version 1.0.0
 *
 * ### Key Setup
 * - Extracts the resource ID from request parameters.
 * - Calls the resource service to fetch the resource details.
 * - Handles success by returning JSON with status 200.
 * - Catches errors and returns JSON with status 400 and an error message.
 *
 * ### Functions
 * - get(req, res): Asynchronously handles the GET request for a specific resource.
 *
 * @param {Request} req - The Express request object containing the resource ID in params.
 * @param {Response} res - The Express response object.
 * @returns {Promise<Response>} Promise resolving to the Express response object with JSON data.
 *
 */

import { MessageMap } from '../../../shared/messages';
import { resourceService } from '../service/resource.service';
import { Request, Response } from 'express';

export const get = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = req.params.id as string;

    const resource = await resourceService.get(id);

    return res.status(200).json(resource);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : MessageMap.ERROR.DEFAULT.SERVER,
    });
  }
};
