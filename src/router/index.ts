import { Router, NextFunction } from 'express';
import companyRouter from '../modules/company/routes/company.routes';
import userRouter from '../modules/user/user.routes';
import authRouter from '../modules/auth/auth.routes';

export const router = Router();

router.use('/company', companyRouter);

router.use('/user', userRouter);

router.use('/auth', authRouter);

export default router;
