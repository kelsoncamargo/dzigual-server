import jwt from "jsonwebtoken";

import {
  ITokenDecoded,
  ITokenProps,
  IUserProps,
} from "../controller/auth/token/interface";
import { MessageMap } from "./message";
import { validateErrorType } from "./validateErrorType";

const secretKey = "lasjhusagdfiusufdgisyfffuiasyfiuysaiuyfsad";
const iat = Math.floor(Date.now() / 1000) + 60 * 360;

const generateToken = ({ companyDocument, role, email, }: IUserProps) => {
  return jwt.sign({ companyDocument, email, role, iat }, secretKey);
};

const validateToken = async ({ token }: ITokenProps): Promise<ITokenDecoded> => {
  try {
    const decoded = jwt.verify(token, secretKey) as ITokenDecoded;
    if (decoded.iat && Date.now() >= decoded.iat * 1000) {
      throw new Error(MessageMap.ERROR.TOKEN_EXPIRED);
    }
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    validateErrorType(err, MessageMap.ERROR.TOKEN_EXPIRED);
    throw new Error(MessageMap.ERROR.INVALID_TOKEN);
  }
};

export { generateToken, validateToken };