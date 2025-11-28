import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authSchema } from '../schema/auth.schema';
import { authController } from '../';

const authRouter = Router();

authRouter.post('/', celebrate(authSchema.login()), authController.login);

authRouter.put('/', authController.logout);

authRouter.get('/', authController.refreshToken);

export default authRouter;
