/**
 * @fileoverview Utility function for retrieving all breeds with pagination.
 *
 * @module resource-get-all
 * @version 1.0.0
 *
 * ### Key Setup
 * - Fetches full data from the resource repository.
 * - Extracts breed names as keys from the data.
 * - Applies pagination to the list of breeds.
 *
 * ### Functions
 * - getAll({ page, limit }): Asynchronously retrieves and paginates the list of breeds.
 *
 * @param {IResourceGet} options - The pagination options object.
 * @param {number} [options.page=1] - The current page number (starts from 1).
 * @param {number} [options.limit=5] - The number of items per page.
 * @returns {Promise<{ items: Array<string>, total: number, page: number, limit: number, totalPages: number }>} Promise resolving to the paginated result object containing breed names.
 *
 */

import { IResourceGet } from '../interface/user.getAll.interface';
import { resourceRepository } from '../repo/resource.repo';
import pagination from '../../../shared/pagination';

export const getAll = async ({
  page,
  limit,
}: IResourceGet): Promise<object> => {
  const fullDataBreeds = await resourceRepository.getAll();

  const fullBreeds = Object.keys(fullDataBreeds);

  const breedsFiltered = pagination({ page, limit, data: fullBreeds });

  return breedsFiltered;
};
