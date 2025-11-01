/**
 * @fileoverview Wrapper class for authentication cookie management functions, exporting a singleton instance.
 *
 * @module cookies-utils
 * @version 1.0.0
 *
 * ### Key Setup
 * - Aggregates cookie setters and clearer into a class for organized access.
 *
 * ### Class
 * - Cookies: Class with methods for setting auth/access tokens and clearing cookies.
 *
 * ### Usage
 * - Import and use the exported 'cookies' instance for cookie operations.
 *
 * @example
 * import { cookies } from './cookies';
 * cookies.setAuthCookies(res, 'access', 'refresh'); // Sets auth cookies
 */

import { clearAuthCookies } from './clear.auth.cookies';
import setAccessToken from './set.access.token.cookies';
import { setAuthCookies } from './set.auth.cookies';

class Cookies {
  setAuthCookies = setAuthCookies;
  setAccessToken = setAccessToken;
  clearAuthCookies = clearAuthCookies;
}

export const cookies = new Cookies();
