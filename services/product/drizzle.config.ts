import type { Config } from 'drizzle-kit';

export default {
  schema: './src/product.schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'product_service_db',
  },
} satisfies Config;