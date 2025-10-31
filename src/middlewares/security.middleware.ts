/**
 * @fileoverview Centralizes and applies security middlewares to the Express app in proper order.
 *
 * @module security.middleware
 * @version 1.0.0
 *
 * ### Key Setup
 * - Applies Helmet (headers), CORS (origins), Sanitizer (XSS), and HPP (pollution) sequentially.
 *
 * ### Functions
 * - applySecurity(app): Async function to apply all security middlewares.
 *
 * @example
 * await applySecurity(app); // In server init.
 */

import { Application } from 'express';
import { applyHelmet } from './security/helmet.middleware';
import { applyCors } from './security/cors.middleware';
import { applySanitizer } from './security/sanitizer.middleware';
import { applyHpp } from './security/hpp.middleware';

export async function applySecurity(app: Application): Promise<void> {
  applyHelmet(app);
  applyCors(app);
  applySanitizer(app);
  applyHpp(app);
}
