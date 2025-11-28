import { Router } from 'express';
import { authenticate } from '../../../middlewares/auth/middleware/auth.middleware';

import { ApiResourceRepo } from '../repo/api.resource.repo';
import { ResourceService } from '../service/resource.service';
import { ResourceController } from '../controller/resource.controller';
import { userRequireAuth } from '../../user';

const resourceRouter = Router();

const repository = new ApiResourceRepo();
const service = new ResourceService(repository);
const controller = new ResourceController(service);

resourceRouter.get('/', userRequireAuth, controller.getAll);

resourceRouter.get('/:id', userRequireAuth, controller.get);

export default resourceRouter;
