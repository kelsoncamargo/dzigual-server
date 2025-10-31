/**
 * @fileoverview Configures Helmet middleware for Express to add security HTTP headers.
 *
 * @module helmet.middleware
 * @version 1.0.0
 *
 * ### Key Setup
 * - Applies Helmet with CSP, HSTS, and referrer policy for protection against XSS, MITM, etc.
 *
 * ### Helmet Options
 * - contentSecurityPolicy: Directives limit sources (self for default/script, unsafe-inline for style, data: for img).
 * - hsts: Forces HTTPS for 90 days, including subdomains.
 * - referrerPolicy: no-referrer-when-downgrade for privacy.
 */

import helmet from 'helmet';
import { Application } from 'express';

export function applyHelmet(app: Application): void {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
        },
      },
      hsts: { maxAge: 90 * 24 * 60 * 60, includeSubDomains: true },
      referrerPolicy: { policy: 'no-referrer-when-downgrade' },
    }),
  );
}
