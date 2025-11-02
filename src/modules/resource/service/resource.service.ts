/**
 * @fileoverview Service class aggregating resource functions (get, getAll) and exporting a singleton instance.
 *
 * @module resource-service
 * @version 1.0.0
 *
 * ### Key Setup
 * - Aggregates resource service functions into a class for centralized access.
 *
 * ### Class
 * - ResourceService: Class with methods for get and getAll.
 *
 */

import { getAll } from './resource.getAll.service';

class ResourceService {
  getAll = getAll;
}

export const resourceService = new ResourceService();
