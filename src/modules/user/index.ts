import { authenticate } from '../../middlewares/auth/middleware/auth.middleware';
import { authService } from '../auth';
import { UserController } from './controller/user.controller';
import { UserPrismaRepo } from './repo/user.prisma.repo';
import { UserService } from './service/user.service';
import { RedisCacheProvider } from '../../shared/providers/cache/impl/redis.cache.impl';

export const userRepository = new UserPrismaRepo();
const cacheProvider = new RedisCacheProvider();
export const userService = new UserService(userRepository, cacheProvider);
export const userController = new UserController(userService);
export const userRequireAuth = authenticate(authService);
