import express, { NextFunction, Request, Response } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';
import { resourceService } from '../service/resource.service';

const resourceGetRouter = express.Router();

resourceGetRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    await authenticate(req, res, next);
  },

  async (req: Request, res: Response) => {
    const tmp = await resourceService.getAll({
      ...req.body,
    });

    return res.status(200).json(tmp);
  },
);

export default resourceGetRouter;
