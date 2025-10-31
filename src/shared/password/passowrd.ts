import { decryptPassword } from './decrypt.password';
import { encryptPassword } from './encrypt.password';

class Passowrd {
  encryptPassword = encryptPassword;
  decryptPassword = decryptPassword;
}

export const password = new Passowrd();
