import express, { Request, Response } from 'express';

import routerUser from './routes/user.route';

const userRouter = express.Router();

userRouter.use('/', routerUser);

export default userRouter;
