/**
 * @fileoverview Repository function to fetch all dog breeds from an external API using Axios and config.
 *
 * @module resource-get-repo
 * @version 1.0.0
 *
 * ### Key Setup
 * - Makes GET request to DOG_API.GET_ALL endpoint.
 * - Extracts breed keys from response data.message.
 * - Throws custom error on API failure.
 *
 * ### Functions
 * - getAll(): Asynchronously fetches and returns breeds DTO.
 *
 * @returns {Promise<IResourceGetDto>} DTO with breeds array.
 *
 * @throws Error On API request failure, with custom message.
 *
 */

import api from '../../../config/axios';
import { EXTERNAL_APIS } from '../../../shared/externalApis';
import { MessageMap } from '../../../shared/messages';

export const getAll = async (): Promise<Array<Object>> => {
  try {
    const resource = await api.get(EXTERNAL_APIS.DOG_API.GET_ALL);

    return resource.data.message;
  } catch (err) {
    throw new Error(`api_${MessageMap.ERROR.DEFAULT.INTERNAL_ERROR}`);
  }
};
