/**
 * @fileoverview Controller class aggregating resource operation handlers for retrieving a single resource and all resources.
 *
 * @module resource-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Imports the get and getAll handlers from their specific controller files.
 * - Defines a class ResourceController that assigns the imported functions as methods.
 * - Creates and exports an instance of ResourceController for use in routing.
 *
 * ### Class
 * - ResourceController: A class containing methods for resource-related operations, including get for a single resource and getAll for paginated resources.
 *
 */

import { get } from './resource.get.controller';
import { getAll } from './resource.getAll.controller';

export class ResourceController {
  get = get;
  getAll = getAll;
}

export const resourceController = new ResourceController();
