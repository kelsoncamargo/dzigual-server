/**
 * @fileoverview Provides a utility function to hash tokens using SHA-256.
 *
 * @module token-hash
 * @version 1.0.0
 *
 * ### Key Setup
 * - Uses Node.js crypto module for secure hashing.
 *
 * ### Functions
 * - hashToken(token): Computes SHA-256 hash of input string and returns hex digest.
 *
 * @param {string} token - The token string to hash.
 * @returns {string} Hex-encoded SHA-256 hash.
 *
 * @example
 * import hashToken from './hashToken';
 * const hashed = hashToken('mySecretToken');
 * console.log(hashed); // Outputs: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' (example hash)
 */

import crypto from 'crypto';

export default function hashToken(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}
