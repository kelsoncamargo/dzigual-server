/**
 * @fileoverview Repository class aggregating resource CRUD functions (get, getAll) and exporting a singleton instance.
 *
 * @module resource-repository
 * @version 1.0.0
 *
 * ### Key Setup
 * - Aggregates resource repo functions into a class for centralized access.
 *
 * ### Class
 * - ResourceRepository: Class with methods for getAll and get.
 *
 */

import { getAll } from './resource.getAll.repo';

class ResourceRepository {
  getAll = getAll;
}

export const resourceRepository = new ResourceRepository();
