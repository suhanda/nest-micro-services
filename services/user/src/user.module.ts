import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'DATABASE',
      useFactory: () => {
        const pool = new Pool({
          host: 'localhost',
          port: 5432,
          user: 'postgres',
          password: 'password',
          database: 'user_service_db',
        });
        return drizzle(pool);
      },
    },
  ],
})
export class UserModule {}