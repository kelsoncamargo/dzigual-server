import { Prisma } from "@prisma/client";
import { MessageMap } from "./message";

export const validateErrorType = (err: unknown, specificError: string | void): void => {
  if (err instanceof Error && err.message === specificError) {
    throw err.message;
  }

  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.meta?.target &&
    Array.isArray(err.meta.target)
  ) {
    const field = `${err.meta.target[0].toUpperCase()}` as keyof typeof MessageMap.ERROR.IN_USE;
    throw new Error(MessageMap.ERROR.IN_USE[field]);
  }
};
