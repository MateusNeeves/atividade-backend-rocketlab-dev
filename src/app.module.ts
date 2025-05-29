import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { CartModule } from './cart/cart.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';


@Module({
  imports: [ProductsModule, CartModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
