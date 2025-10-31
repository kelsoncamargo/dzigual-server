import database from '../../config/database';
import isProduction from '../isProduction';
import { MessageMap } from '../messages';
import hashToken from './hash.token';
import { IJwtPayload } from './token.jwt.interface';
import jwt from 'jsonwebtoken';

export const validateRefreshToken = async (
  token: string,
): Promise<IJwtPayload> => {
  try {
    const { secret } = isProduction();
    const jwtDecoded = jwt.verify(token, secret) as IJwtPayload;
    const hashed = hashToken(token);

    const isValid = await database.refreshToken.findFirst({
      where: {
        token: hashed,
        revoked: false,
      },
    });

    if (!isValid) {
      throw new Error(`${MessageMap.ERROR.DEFAULT.INVALID}_token`);
    }

    return jwtDecoded;
  } catch (error) {
    throw new Error(`${MessageMap.ERROR.DEFAULT.INVALID}_token`);
  }
};
