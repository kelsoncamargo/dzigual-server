/**
 * @fileoverview Utility function for paginating an array of strings with page and limit parameters.
 *
 * @module pagination-utility
 * @version 1.0.0
 *
 * ### Key Setup
 * - Defaults page to 1 and limit to 1.
 * - Calculates start index and slices data array.
 * - Computes total pages based on data length and limit.
 *
 * ### Functions
 * - pagination({ page, limit, data }): Returns paginated items and metadata.
 *
 * @param {number} [page=1] - The current page number (starts from 1).
 * @param {number} [limit=1] - The number of items per page.
 * @param {Array<string>} data - The array of strings to paginate.
 * @returns {{ items: Array<string>, total: number, page: number, limit: number, totalPages: number }} Paginated result object.
 *
 */

export default function pagination({
  page = 1,
  limit = 1,
  data,
}: {
  page?: number;
  limit?: number;
  data: Array<string>;
}): {
  items: Array<string>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} {
  const total = data.length;
  const interalLimit = limit > 0 ? limit : total;
  const start = Math.ceil(((page > 1 ? page : 1) - 1) * interalLimit);
  const paginateDate = data.slice(start, start + interalLimit);

  return {
    limit: interalLimit,
    page,
    total,
    totalPages: Math.ceil(total / limit),
    items: paginateDate,
  };
}
