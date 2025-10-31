import { IJwtPayload } from "../../shared/token/token.jwt.interface";

declare global {
  namespace Express {
    interface Request {
      payload: IJwtPayload;
    }
  }
}