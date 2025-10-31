import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { authorize } from '../../../middlewares/authorize/authorize.middleware';
import { userController } from '../controller/user.controller';

const userGetAllRouter = express.Router();

userGetAllRouter.get(
  '/getAll',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  authorize('user:*'),

  async (req: Request, res: Response) => {
    await userController.getAll(req, res);
  },
);

export default userGetAllRouter;
