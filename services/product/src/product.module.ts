import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'DATABASE',
      useFactory: () => {
        const pool = new Pool({
          host: 'localhost',
          port: 5432,
          user: 'postgres',
          password: 'password',
          database: 'product_service_db',
        });
        return drizzle(pool);
      },
    },
  ],
})
export class ProductModule {}