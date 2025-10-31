import { PrismaClient } from "prisma/prisma-client";

const prismaDB = new PrismaClient({
  errorFormat: "colorless",
  transactionOptions: {
    maxWait: 1500,
    timeout: 5000,
  },
});

export default prismaDB;
