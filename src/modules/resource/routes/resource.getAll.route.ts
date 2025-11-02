import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { getAll } from '../repo/resource.getAll.repo';

const resourceGetRouter = express.Router();

resourceGetRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response) => {
    const tmp = await getAll();

    return res.status(200).json(tmp);
  },
);

export default resourceGetRouter;
