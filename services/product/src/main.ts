import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductModule, {
    transport: Transport.GRPC,
    options: {
      package: 'product',
      protoPath: join(__dirname, '../../../proto/product.proto'),
    },
  });
  await app.listen();
}
bootstrap();