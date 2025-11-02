import { getAll } from './resource.getAll.controller';

export class ResourceController {
  getAll = getAll;
}

export const resourceController = new ResourceController();
