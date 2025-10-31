/**
 * @module token.utils
 * @description Provides utilities for generating and verifying JSON Web Tokens (JWT) with HS256 algorithm, using environment-based secrets.
 *
 * Requires environment variables:
 * - PRODUCTION: set to "true" for production mode.
 * - JWT_SECRET: secret key for production.
 * - JWT_SECRET_DEV: secret key for development.
 *
 * @function generateToken
 * @param {import("./token.jwt.interface").IJwtPayload} payload – The JWT payload to sign.
 * @returns {string} A signed JWT string with 1 hour expiration.
 *
 * @function verifyToken
 * @param {string} token – The JWT string to verify and decode.
 * @returns {import("./token.jwt.interface").IJwtPayload} The decoded JWT payload.
 * @throws {Error} If the token is invalid or verification fails.
 */

import jwt from 'jsonwebtoken';
import { IJwtPayload } from './token.jwt.interface';
import dotenv from 'dotenv';
import { MessageMap } from '../messages';

dotenv.config();

const isProduction = process.env.PRODUCTION === 'true';
const secret = (
  isProduction ? process.env.JWT_SECRET : process.env.JWT_SECRET_DEV
) as string;

if (!secret) {
  throw new Error(MessageMap.ERROR.TOKEN.NO_SECRET);
}

export const generateToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, secret, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
};

export const verifyToken = (token: string): IJwtPayload => {
  try {
    return jwt.verify(token, secret) as IJwtPayload;
  } catch (error) {
    throw new Error(MessageMap.ERROR.TOKEN.INVALID);
  }
};
