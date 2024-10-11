import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'GetProduct')
  getProduct(data: { id: number }) {
    return this.productService.getProduct(data.id);
  }

  @GrpcMethod('ProductService', 'CreateProduct')
  createProduct(data: { name: string; price: number }) {
    return this.productService.createProduct(data);
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  updateProduct(data: { id: number; name?: string; price?: number }) {
    const { id, ...updateData } = data;
    return this.productService.updateProduct(id, updateData);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  deleteProduct(data: { id: number }) {
    return this.productService.deleteProduct(data.id);
  }
}