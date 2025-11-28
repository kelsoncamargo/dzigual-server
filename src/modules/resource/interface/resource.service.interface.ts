import { IResourceGetAllDto } from './dtos';

export interface IResourceService {
  get(id: string): Promise<object>;
  getAll(options: IResourceGetAllDto): Promise<object>;
}
