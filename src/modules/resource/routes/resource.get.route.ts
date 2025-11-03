import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { get } from '../service/resource.get.service';

const resourceGetRouter = express.Router();

resourceGetRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const breeds = await get(id);
    res.status(200).send(breeds);
  },
);

export default resourceGetRouter;
