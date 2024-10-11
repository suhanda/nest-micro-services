import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductResolver } from './product.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(__dirname, '../../../proto/product.proto'),
        },
      },
    ]),
  ],
  providers: [ProductResolver],
})
export class ProductModule {}