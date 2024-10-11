import type { Config } from 'drizzle-kit';

export default {
  schema: './src/user.schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'user_service_db',
  },
} satisfies Config;