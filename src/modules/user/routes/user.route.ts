import express from 'express';
import userGetRouter from './user.get.route';
import userGetAllRouter from './user.getAll.route';
import userCreateRouter from './user.create.route';
import userUpdateRouter from './user.update.route';
import userSuspendRouter from './user.suspend.route';
import userRemoveRouter from './user.remove.route';

const userRouter = express.Router();

userRouter.use('/', userCreateRouter);

userRouter.use('/', userGetRouter);

userRouter.use('/', userGetAllRouter);

userRouter.use('/', userUpdateRouter);

userRouter.use('/', userSuspendRouter);

userRouter.use('/', userRemoveRouter);

export default userRouter;
