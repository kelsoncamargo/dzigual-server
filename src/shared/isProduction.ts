/**
 * @fileoverview Loads .env from project root and checks for production environment to return the appropriate JWT refresh secret.
 *
 * @module production-check
 * @version 1.0.0
 *
 * ### Key Setup
 * - Loads .env using relative path from __dirname.
 * - Determines prod/dev based on process.env.PRODUCTION.
 * - Returns object with isProduction and secret, or throws error if missing.
 *
 * @throws Error If secret not found in .env.
 */

import dotenv from 'dotenv';
import path from 'path';
import { MessageMap } from './messages';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default function isProduction(): {
  isProduction: boolean;
  secret: string;
} {
  const isProduction = process.env.PRODUCTION === 'true';
  const secret = (
    isProduction ? process.env.JWT_SECRET : process.env.JWT_SECRET_DEV
  ) as string;

  if (!secret) {
    throw new Error(`${MessageMap.ERROR.DEFAULT.NOT_FOUND}_token_in_env_file`);
  }

  return { isProduction, secret };
}
