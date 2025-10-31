/**
 * @fileoverview Provides a utility function to hash tokens using SHA-256.
 *
 * @module token-hash
 * @version 1.0.0
 *
 * ### Key Setup
 * - Uses Node.js crypto module for secure hashing.
 *
 * @param {string} token - The token string to hash.
 * @returns {string} Hex-encoded SHA-256 hash.
 *
 */

import crypto from 'crypto';

export default function hashToken(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}
