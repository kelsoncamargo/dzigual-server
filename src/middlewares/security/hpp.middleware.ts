/**
 * @fileoverview Configures HPP middleware for Express to prevent HTTP Parameter Pollution.
 *
 * @module hpp.middleware
 * @version 1.0.0
 *
 * ### Key Setup
 * - Applies HPP to clean duplicate params in queries/bodies.
 *
 * ### HPP Options
 * - whitelist: Allows arrays for 'tags' and 'categories'; others keep last value.
 *
 * @example applyHpp(app); // In server setup.
 */

import hpp from 'hpp';
import { Application } from 'express';

export function applyHpp(app: Application): void {
  app.use(hpp({ whitelist: ['tags', 'categories'] }));
}
