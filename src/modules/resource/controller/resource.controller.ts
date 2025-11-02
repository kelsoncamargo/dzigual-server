/**
 * @fileoverview Controller class aggregating resource operation handlers.
 *
 * @module resource-controller
 * @version 1.0.0
 *
 * ### Key Setup
 * - Imports the getAll handler from the specific controller file.
 * - Defines a class ResourceController that assigns the imported getAll function as a method.
 * - Creates and exports an instance of ResourceController for use in routing.
 *
 * ### Class
 * - ResourceController: A class containing methods for resource-related operations, currently including getAll.
 *
 */

import { getAll } from './resource.getAll.controller';

export class ResourceController {
  getAll = getAll;
}

export const resourceController = new ResourceController();
