import { Request, Response } from 'express';
import { MessageMap } from '../../../shared/messages';
import { IResourceService } from '../interface';

export class ResourceController {
  constructor(private readonly service: IResourceService) {}

  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id as string;
      const resource = await this.service.get(id);
      return res.status(200).json(resource);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 0;

      const resource = await this.service.getAll({ page, limit });
      return res.status(200).json(resource);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: unknown): Response {
    const message =
      error instanceof Error ? error.message : MessageMap.ERROR.DEFAULT.SERVER;
    return res.status(400).json({ message });
  }
}
