/**
 * @module external-apis-config
 * @version 1.0.0
 *
 * ### Key Setup
 * - Loads environment variables using dotenv with custom path.
 * - Defines EXTERNAL_APIS object with DOG_API base URL and endpoints.
 *
 * ### Constants
 * - EXTERNAL_APIS: Object containing API configs, sourced from env vars.
 *
 * @example
 * import { EXTERNAL_APIS } from './externalApis';
 * console.log(EXTERNAL_APIS.DOG_API.GET_ALL); // 'https://dog.ceo/api/breeds/list/all' (assuming env set)
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const EXTERNAL_APIS = {
  DOG_API: {
    BASE_URL: process.env.DOG_BASE_URL,
    GET_ALL: `${process.env.DOG_BASE_URL}/breeds/list/all`,
  },
};
