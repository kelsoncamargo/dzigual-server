/**
 * @fileoverview Global type declaration to extend Express Request interface with JWT payload.
 *
 * @module express-types
 * @version 1.0.0
 *
 * ### Key Setup
 * - Augments Express namespace to add 'payload' property to Request interface.
 *
 * @example
 * // In a middleware or controller:
 * const userId = req.payload.id; // Type-safe access to JWT payload
 */

import { IJwtPayload } from '../../shared/token/token.jwt.interface';

declare global {
  namespace Express {
    interface Request {
      payload: IJwtPayload;
    }
  }
}
