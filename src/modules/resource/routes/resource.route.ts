import express from 'express';
import resourceGetRouter from './resource.getAll.route';

const userRouter = express.Router();

userRouter.use('/', resourceGetRouter);

export default userRouter;
