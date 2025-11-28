import { Request, Response, NextFunction } from 'express';
import { MessageMap } from '../../../shared/messages';
import { IAuthService } from '../../../modules/auth/interfaces/auth.service.interface';

export const authenticate = (authService: IAuthService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          message: `${MessageMap.ERROR.DEFAULT.UNAUTHORIZED}_token_missing`,
        });
      }

      const payload = await authService.validateSession(token);

      req.payload = payload;

      next();
    } catch (error: any) {
      return res.status(401).json({
        message: MessageMap.ERROR.DEFAULT.UNAUTHORIZED,
      });
    }
  };
};
