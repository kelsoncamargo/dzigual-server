import { Prisma } from '@prisma/client';
import database from '../../config/database';
import { MessageMap } from '../messages';
import hashToken from './hash.token';

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
      throw new Error(`${MessageMap.ERROR.DEFAULT.INVALID}_token`);
    }
    throw new Error(MessageMap.ERROR.DEFAULT.INTERNAL_ERROR);
  }
};
