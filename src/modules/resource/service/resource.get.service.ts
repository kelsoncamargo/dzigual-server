/**
 * @fileoverview Utility function for retrieving details of a specific breed by ID, including associated countries and a random image URL.
 *
 * @module resource-get
 * @version 1.1.0
 *
 * ### Key Setup
 * - Fetches all breed data from the resource repository.
 * - Normalizes the provided ID to lowercase for case-insensitive lookup.
 * - Checks if the breed exists in the data; throws an error if not found.
 * - Retrieves the list of countries associated with the breed.
 * - Generates a random image URL from the external Dog API if countries are found.
 * - If no countries are found, returns a message indicating not found; otherwise, returns the breed, image URL, and countries.
 *
 * ### Functions
 * - get(id): Asynchronously retrieves breed details by ID.
 *
 * @param {string} id - The breed ID to retrieve (case-insensitive).
 * @returns {Promise<object>} Promise resolving to an object containing the breed name, and either countries array with image URL or a not found message.
 *
 */

import { MessageMap } from '../../../shared/messages';
import { resourceRepository } from '../repo/resource.repo';
import { EXTERNAL_APIS } from '../../../shared/externalApis';

export const get = async (id: string): Promise<object> => {
  const fullDataBreeds = (await resourceRepository.getAll()) as any;
  const normalizedId = id.toLowerCase();

  if (!(normalizedId in fullDataBreeds)) {
    throw new Error(`rece_'${id}'_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
  }
  const countries = fullDataBreeds[normalizedId];

  if (countries.length === 0) {
    return {
      breed: normalizedId,
      message: `${MessageMap.ERROR.DEFAULT.NOT_FOUND}_country_race`,
    };
  }

  return {
    breed: normalizedId,
    imgUrl: `${EXTERNAL_APIS.DOG_API.BASE_URL}/breed/${normalizedId}/images/random`,
    countries: countries,
  };
};
