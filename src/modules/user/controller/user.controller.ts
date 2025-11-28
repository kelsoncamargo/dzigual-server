import { IUserService } from '../interface/user.services.interface';
import { Request, Response } from 'express';
import { MessageMap } from '../../../shared/messages';
import { cookies } from '../../../shared/cookies/cookies';

export class UserController {
  constructor(private readonly service: IUserService) {}

  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.payload.id as string;
      const resource = await this.service.get(id);
      return res.status(200).json({ message: resource });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const body = req.body;
      const resource = await this.service.create(body);
      return res.status(201).json({ message: resource });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.payload.id as string;
      const body = req.body;
      const resource = await this.service.update(id, body);
      return res.status(200).json({ message: resource });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.payload.id as string;
      const resource = await this.service.delete(id);
      cookies.clearAuthCookies(res);
      return res.status(200).json({ message: resource });
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
