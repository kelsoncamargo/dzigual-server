import { Router } from 'express';
import usersRouter from '../modules/user/user.routes';
import authRouter from '../modules/auth/auth.routes';

export const router = Router();

router.use('/users', usersRouter);

router.use('/auth', authRouter);

export default router;
