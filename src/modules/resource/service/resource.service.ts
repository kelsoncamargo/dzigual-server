/**
 * @fileoverview Service class aggregating resource retrieval operations.
 *
 * @module resource-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Imports the get and getAll functions from their respective service files.
 * - Defines a class ResourceService that assigns the imported functions as methods.
 * - Creates and exports an instance of ResourceService for use in controllers or other services.
 *
 * ### Class
 * - ResourceService: A class containing methods for retrieving a single resource by ID and all resources with pagination.
 *
 */

import { get } from './resource.get.service';
import { getAll } from './resource.getAll.service';

class ResourceService {
  get = get;
  getAll = getAll;
}

export const resourceService = new ResourceService();
