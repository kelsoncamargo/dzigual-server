import express from 'express';

import routerResource from './routes/resource.route';

const resourceRouter = express.Router();

resourceRouter.use('/', routerResource);

export default resourceRouter;
