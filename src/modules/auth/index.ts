import AuthService from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserPrismaRepo } from '../user/repo/user.prisma.repo';
import { RedisCacheProvider } from '../../shared/providers/cache/impl/redis.cache.impl';
import { JwtTokenProvider } from '../../shared/providers/token/impl/jwt.token.impl';

const repository = new UserPrismaRepo();
const cacheProvider = new RedisCacheProvider();
const tokenProvider = new JwtTokenProvider();

export const authService = new AuthService(
  repository,
  cacheProvider,
  tokenProvider,
);

export const authController = new AuthController(authService);
