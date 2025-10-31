/**
 * @module token.utils.refresh
 * @description Provides utilities for secure creation, validation, and revocation of JWT refresh tokens with HS256 algorithm.
 *
 * Requires environment variables:
 * - PRODUCTION: set to "true" for production mode.
 * - JWT_SECRET_REFRESH: secret key for production refresh tokens.
 * - JWT_SECRET_DEV_REFRESH: secret key for development refresh tokens.
 *
 * @function generateRefreshToken
 * @param {import("./token.jwt.interface").IJwtPayload} payload – The JWT payload to sign.
 * @returns {Promise<string>} A signed refresh token (valid for 7 days) stored in the database in hashed form.
 *
 * @function validateRefreshToken
 * @param {string} token – The refresh token string to verify and decode.
 * @returns {Promise<import("./token.jwt.interface").IJwtPayload>} The decoded JWT payload if token is valid and not revoked.
 * @throws {Error} If the token is invalid, expired, not found, or revoked.
 *
 * @function revokeRefreshToken
 * @param {string} token – The refresh token string to revoke.
 * @returns {Promise<boolean>} Returns `true` if the token was successfully marked as revoked.
 * @throws {Error} If the token is not found (Prisma P2025) or a database error occurs.
 */

import jwt from 'jsonwebtoken';
import { IJwtPayload } from './token.jwt.interface';
import dotenv from 'dotenv';
import { Prisma } from '@prisma/client';
import crypto from 'crypto';
import database from '../../config/database';
import { MessageMap } from '../messages';

dotenv.config();

const isProduction = process.env.PRODUCTION === 'true';
const secret = (
  isProduction
    ? process.env.JWT_SECRET_REFRESH
    : process.env.JWT_SECRET_DEV_REFRESH
) as string;

if (!secret) {
  throw new Error(MessageMap.ERROR.TOKEN.NO_SECRET);
}

const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const generateRefreshToken = async (
  payload: IJwtPayload,
): Promise<string> => {
  const token = jwt.sign(payload, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  const hashed = hashToken(token);

  const hasToken = await database.refreshToken.findUnique({
    where: {
      userId: payload.id,
    },
  });

  if (hasToken) {
    await database.refreshToken.update({
      where: { userId: payload.id },
      data: {
        token: hashed,
        revoked: false,
      },
    });
  } else {
    await database.refreshToken.create({
      data: {
        userId: payload.id,
        token: hashed,
      },
    });
  }

  return token;
};

export const validateRefreshToken = async (
  token: string,
): Promise<IJwtPayload> => {
  try {
    const jwtDecoded = jwt.verify(token, secret) as IJwtPayload;
    const hashed = hashToken(token);

    const isValid = await database.refreshToken.findFirst({
      where: {
        token: hashed,
        revoked: false,
      },
    });

    if (!isValid) {
      throw new Error(MessageMap.ERROR.TOKEN.INVALID);
    }

    return jwtDecoded;
  } catch (error) {
    throw new Error(MessageMap.ERROR.TOKEN.INVALID);
  }
};

export const revokeRefreshToken = async (token: string) => {
  const hashed = hashToken(token);
  try {
    await database.refreshToken.update({
      where: { token: hashed },
      data: { revoked: true },
    });
    return true;
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      throw new Error(MessageMap.ERROR.TOKEN.INVALID);
    }
    throw new Error(MessageMap.ERROR.DATABASE);
  }
};
