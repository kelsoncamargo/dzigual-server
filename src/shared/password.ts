import bcrypt from 'bcrypt';
import { MessageMap } from './messages';

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error(MessageMap.ERROR.PASSWORD.NOT_ENCRYPTED);
  }
};

export const decryptPassword = async (remote: string, local?: string) => {
  try {
    if (!local) throw new Error(MessageMap.ERROR.PASSWORD.NOT_FOUND);
    return await bcrypt.compare(remote, local);
  } catch (err) {
    return new Error(MessageMap.ERROR.PASSWORD.COMPARISON_FAILED);
  }
};
