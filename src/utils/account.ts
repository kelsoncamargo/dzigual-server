import { UUID } from "crypto";
import database from "../config/database";
import { IAllAccountsProps } from "../controller/auth/token/interface";
import { IAccountDTO } from "../shared/interfaces/account";
import { MessageMap } from "./message";
import { validateErrorType } from "./validateErrorType";

const getAccount = async (dataAccount: IAllAccountsProps): Promise<any> => {
  // try {
  //   const account = await database..findFirst({
  //     where: {
  //       id: dataAccount.id,
  //       email: dataAccount.email,
  //     },
  //   });


  //   if (!account) throw new Error(MessageMap.ERROR.USER_NOT_FOUND);

  //   return account;
  // } catch (err) {
  //   validateErrorType(err, MessageMap.ERROR.USER_NOT_FOUND);
  //   throw new Error(MessageMap.ERROR.SYSTEM.DATABASE);
  // }
};

const getAccountId = async (id: string): Promise<any> => {
  // try {
  //   const account = await database.account.findFirst({
  //     where: {
  //       id
  //     },
  //   });

  //   console.log(account)

  //   if (!account) throw new Error(MessageMap.ERROR.USER_NOT_FOUND);

  //   return account;
  // } catch (err) {
  //   validateErrorType(err, MessageMap.ERROR.USER_NOT_FOUND);
  //   throw new Error(MessageMap.ERROR.SYSTEM.DATABASE);
  // }
};



export { getAccount, getAccountId };
