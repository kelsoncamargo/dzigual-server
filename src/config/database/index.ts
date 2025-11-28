import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prismaDB = new PrismaClient({
  adapter,
  errorFormat: 'colorless',
  transactionOptions: {
    maxWait: 1500,
    timeout: 5000,
  },
});

export default prismaDB;
