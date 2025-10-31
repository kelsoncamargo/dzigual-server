/**
 * @fileoverview Utility function to compare (verify) a plain password against a hashed one using bcrypt.
 *
 * @module password-verify
 * @version 1.0.0
 *
 * ### Key Setup
 * - Compares remote (plain) password with local (hashed) password.
 *
 * ### Functions
 * - decryptPassword(remote, local): Asynchronously verifies if remote matches local hash.
 *
 * @param {string} remote - The plain password to compare (e.g., user input).
 * @param {string} [local] - The hashed password from storage (optional, but required for comparison).
 * @returns {Promise<boolean | Error>} True if match, false otherwise; or Error on failure.
 *
 * @throws Error If local is missing ('password_not_found') or comparison fails ('password_comparison_failed').
 */

import bcrypt from 'bcrypt';
import { MessageMap } from '../messages';

export const decryptPassword = async (remote: string, local?: string) => {
  try {
    if (!local)
      throw new Error(`password_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
    return await bcrypt.compare(remote, local);
  } catch (err) {
    return new Error(`password_${MessageMap.ERROR.DEFAULT.COMPARISON_FAILED}`);
  }
};
