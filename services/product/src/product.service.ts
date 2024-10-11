import { Injectable, Inject } from '@nestjs/common';
import { DrizzleClient } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { products } from './product.schema';

@Injectable()
export class ProductService {
  constructor(@Inject('DATABASE') private db: DrizzleClient) {}

  async getProduct(id: number) {
    const [product] = await this.db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(productData: Omit<typeof products.$inferInsert, 'id'>) {
    const [newProduct] = await this.db.insert(products).values(productData).returning();
    return newProduct;
  }

  async updateProduct(id: number, productData: Partial<typeof products.$inferInsert>) {
    const [updatedProduct] = await this.db
      .update(products)
      .set(productData)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number) {
    const [deletedProduct] = await this.db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return deletedProduct;
  }
}