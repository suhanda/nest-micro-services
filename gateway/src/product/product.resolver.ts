import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Product } from './product.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface ProductService {
  getProduct(data: { id: number }): Promise<Product>;
}

@Resolver(() => Product)
export class ProductResolver implements OnModuleInit {
  private productService: ProductService;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService<ProductService>('ProductService');
  }

  @Query(() => Product)
  @UseGuards(JwtAuthGuard)
  async product(@Args('id') id: number) {
    return this.productService.getProduct({ id });
  }
}