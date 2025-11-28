import { Request, Response } from 'express';
import { IAuthService } from '../interfaces/auth.service.interface';
import { cookies } from '../../../shared/cookies/cookies'; // Seu helper de cookies
import { MessageMap } from '../../../shared/messages';

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      const { newToken, newRefreshToken } = await this.authService.login({
        email,
        password,
      });

      cookies.setAuthCookies(res, newToken, newRefreshToken);

      return res.status(200).json({
        message: `login_${MessageMap.SUCCESS.DEFAULT.SUCCESS}`,
      });
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  logout = async (req: Request, res: Response): Promise<Response> => {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        throw new Error(`${MessageMap.ERROR.DEFAULT.NOT_FOUND}_token`);
      }

      await this.authService.logout(refreshToken);

      cookies.clearAuthCookies(res);

      return res.status(200).json({
        message: `logout_${MessageMap.SUCCESS.DEFAULT.SUCCESS}`,
      });
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<Response> => {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        throw new Error(`${MessageMap.ERROR.DEFAULT.UNAUTHORIZED}_token`);
      }

      const { token } = await this.authService.refreshToken(refreshToken);

      res.clearCookie('accessToken');
      cookies.setAccessToken(res, token);

      return res.status(200).json({
        message: `token_${MessageMap.SUCCESS.DEFAULT.CREATED}`,
      });
    } catch (error: any) {
      return this.handleError(res, error);
    }
  };

  private handleError(res: Response, error: any): Response {
    return res.status(400).json({ message: error.message });
  }
}
