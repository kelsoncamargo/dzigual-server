import { IJwtPayload } from '../../../shared/providers/token/interfaces/jwt.payload.interface';
import { IAuthLogin, IAuthLoginDto } from './auth.login.interface';

export interface IAuthService {
  login(data: IAuthLogin): Promise<IAuthLoginDto>;
  logout(refreshToken: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<{ token: string }>;
  validateSession(accessToken: string): Promise<IJwtPayload>;
}
