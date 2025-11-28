import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

if (!process.env.DATABASE_URL) {
  console.error(
    ' CRITICAL ERROR: DATABASE_URL environment variable is missing.',
  );
} else {
  console.log('DATABASE_URL loaded successfully.');
}
export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    path: 'prisma/migrations',
    seed: 'ts-node prisma/seed.ts',
  },
});
