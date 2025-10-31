/**
 * @fileoverview Utility function to encrypt passwords using bcrypt with salt generation.
 *
 * @module password-encrypt
 * @version 1.0.0
 *
 * ### Key Setup
 * - Generates a salt with 10 rounds and hashes the password.
 *
 * ### Functions
 * - encryptPassword(password): Asynchronously hashes the password and returns the result.
 *
 * @param {string} password - The plain password string to encrypt.
 * @returns {Promise<string>} The hashed password string.
 *
 * @throws Error If hashing fails, with custom message.
 */

import bcrypt from 'bcrypt';
import { MessageMap } from '../messages';

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error(`${MessageMap.ERROR.DEFAULT.NOT_ENCRYPTED}_password`);
  }
};
