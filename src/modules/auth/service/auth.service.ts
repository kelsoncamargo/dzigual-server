import { MessageMap } from '../../../shared/messages';
import { password as passwordHelper } from '../../../shared/password/passowrd';
import { IAuthLogin, IAuthLoginDto } from '../interfaces/auth.login.interface';
import { IAuthRepository } from '../interfaces/auth.interfaces';
import { ICacheProvider } from '../../../shared/providers/cache/cache.provider.interface';
import { ITokenProvider } from '../../../shared/providers/token/token.provider.interface';
import dotenv from 'dotenv';
import path from 'path';
import { IAuthService } from '../interfaces/auth.service.interface';
import { IJwtPayload } from '../../../shared/providers/token/interfaces/jwt.payload.interface';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default class implements IAuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly cacheProvider: ICacheProvider,
    private readonly tokenProvider: ITokenProvider,
  ) {}

  private async validateStoredToken(
    key: string,
    tokenToValidate: string,
  ): Promise<void> {
    const storedToken = await this.cacheProvider.get(key);

    if (!storedToken || storedToken !== tokenToValidate) {
      throw new Error(
        `${MessageMap.ERROR.DEFAULT.UNAUTHORIZED}_token_invalidated`,
      );
    }
  }

  public async login(data: IAuthLogin): Promise<IAuthLoginDto> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) {
      throw new Error(`user_${MessageMap.ERROR.DEFAULT.NOT_FOUND}`);
    }

    const { id, email, password } = user;

    const passwordMatch = await passwordHelper.decryptPassword(
      data.password,
      password,
    );

    if (!passwordMatch) {
      throw new Error(MessageMap.ERROR.DEFAULT.UNAUTHORIZED);
    }

    const newToken = await this.tokenProvider.generateAccessToken({
      id,
      email,
    });
    await this.cacheProvider.save(
      `access_token:${id}`,
      newToken,
      parseInt(`${process.env.TIME_ACCESS_TOKEN_BY_CACHE as any}`),
    );

    const newRefreshToken = await this.tokenProvider.generateRefreshToken({
      id,
      email,
    });

    await this.cacheProvider.save(
      `refresh_token:${id}`,
      newRefreshToken,
      parseInt(`${process.env.TIME_REFRESH_TOKEN_BY_CACHE as any}`),
    );

    return { newToken, newRefreshToken };
  }

  public async logout(refreshToken: string): Promise<void> {
    const payload = await this.tokenProvider.validateToken(refreshToken);
    const { id: userId } = payload;

    await this.validateStoredToken(`refresh_token:${userId}`, refreshToken);

    await this.cacheProvider.delete(`refresh_token:${userId}`);
    await this.cacheProvider.delete(`access_token:${userId}`);
  }

  public async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const payload = await this.tokenProvider.validateToken(refreshToken);
    const { id: userId } = payload;

    await this.validateStoredToken(`refresh_token:${userId}`, refreshToken);

    const newToken = await this.tokenProvider.generateAccessToken({
      id: payload.id,
      email: payload.email,
    });
    await this.cacheProvider.delete(`access_token:${userId}`);

    await this.cacheProvider.save(
      `access_token:${userId}`,
      newToken,
      parseInt(`${process.env.TIME_ACCESS_TOKEN_BY_CACHE as any}`),
    );

    return { token: newToken };
  }

  public async validateSession(accessToken: string): Promise<IJwtPayload> {
    const payload = await this.tokenProvider.validateToken(accessToken);
    const userId = payload.id;

    const storedToken = await this.cacheProvider.get(`access_token:${userId}`);

    if (!storedToken || storedToken !== accessToken) {
      throw new Error(
        `${MessageMap.ERROR.DEFAULT.UNAUTHORIZED}_session_revoked`,
      );
    }

    return payload;
  }
}
