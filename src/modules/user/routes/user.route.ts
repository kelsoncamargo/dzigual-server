import { Router } from 'express';
import { userSchema } from '../schema/user.schema';
import { celebrate } from 'celebrate';
import { userController, userRequireAuth } from '..';

const userRouter = Router();

userRouter.get('/', userRequireAuth, userController.get);

userRouter.post('/', celebrate(userSchema.create()), userController.create);

userRouter.patch(
  '/',
  userRequireAuth,
  celebrate(userSchema.update()),
  userController.update,
);

userRouter.delete('/', userRequireAuth, userController.delete);

export default userRouter;
