import { Injectable, Inject } from '@nestjs/common';
import { DrizzleClient } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { users } from './user.schema';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE') private db: DrizzleClient) {}

  async getUser(id: number) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createUser(userData: Omit<typeof users.$inferInsert, 'id'>) {
    const [newUser] = await this.db.insert(users).values(userData).returning();
    return newUser;
  }

  async updateUser(id: number, userData: Partial<typeof users.$inferInsert>) {
    const [updatedUser] = await this.db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async deleteUser(id: number) {
    const [deletedUser] = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    return deletedUser;
  }

  async login(username: string, password: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (user && user.password === password) {
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        message: 'Login successful',
        user: userWithoutPassword,
      };
    }
    return {
      success: false,
      message: 'Invalid credentials',
      user: null,
    };
  }
}