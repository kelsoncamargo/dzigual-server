import jwt from 'jsonwebtoken';
import { ITokenProvider } from '../token.provider.interface'; // Sua interface
import { IJwtPayload } from '../interfaces/jwt.payload.interface';
import isProduction from '../../../isProduction';

export class JwtTokenProvider implements ITokenProvider {
  private readonly isProductionData = isProduction();
  async generateAccessToken(payload: IJwtPayload): Promise<string> {
    return jwt.sign(payload, this.isProductionData.secret, {
      expiresIn: `${process.env.TIME_ACCESS_TOKEN as any}m` || '15m',
      algorithm: 'HS256',
    });
  }

  async generateRefreshToken(payload: IJwtPayload): Promise<string> {
    return jwt.sign(payload, this.isProductionData.secret, {
      expiresIn: `${process.env.TIME_REFRESH_TOKEN as any}d` || '7d',
      algorithm: 'HS256',
    });
  }

  async validateToken(token: string): Promise<IJwtPayload> {
    try {
      return jwt.verify(token, this.isProductionData.secret) as IJwtPayload;
    } catch (error) {
      throw new Error('Invalid Token');
    }
  }
}
