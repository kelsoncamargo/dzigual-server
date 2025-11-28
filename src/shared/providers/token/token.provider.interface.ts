import { IJwtPayload } from './interfaces/jwt.payload.interface';

export interface ITokenProvider {
  generateAccessToken(payload: IJwtPayload): Promise<string>;
  generateRefreshToken(payload: IJwtPayload): Promise<string>;
  validateToken(token: string): Promise<IJwtPayload>;
}
