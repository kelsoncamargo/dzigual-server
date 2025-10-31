/**
 * @fileoverview Configures sanitizer middleware for Express using xss to prevent XSS attacks.
 *
 * @module sanitizer.middleware
 * @version 1.0.0
 *
 * ### Key Setup
 * - Recursively sanitizes req.body to remove malicious HTML/scripts.
 *
 * ### Functions
 * - sanitize(obj): Recursively cleans strings with xss, maps arrays, rebuilds objects.
 * - applySanitizer(app): Attaches middleware to sanitize req.body on each request.
 *
 * @example applySanitizer(app); // In server setup.
 */

import { Application, Request, NextFunction } from 'express';
import xss from 'xss';

function sanitize(obj: any): any {
  if (typeof obj === 'string') return xss(obj);
  if (Array.isArray(obj)) return obj.map(sanitize);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, sanitize(v)]),
    );
  }
  return obj;
}

export function applySanitizer(app: Application): void {
  app.use((req: Request, _res, next: NextFunction) => {
    if (req.body) req.body = sanitize(req.body);
    next();
  });
}
