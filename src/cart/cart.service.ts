import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async checkout(createCartDto: CreateCartDto) {
    const inputProducts = Object.entries(createCartDto.products).map(([productId, quantity]) => ({
      id: Number(productId),
      quantity: Number(quantity)
    }));

    const products = (await this.prisma.product.findMany({
      where: {
        id: { in: inputProducts.map(p => p.id) }
      },
      select: { 
        id: true,
        price: true 
      }
    })).map(p => ({
      id: p.id,
      price: p.price
    }));

    if (products.length !== inputProducts.length) {
      const foundIds = products.map(p => p.id);
      const missingIds = inputProducts.map(p => p.id).filter(id => !foundIds.includes(id));
      throw new NotFoundException(`Products with ids ${missingIds.join(', ')} not found`);
    }

    let totalPrice = 0;

    for (const inputProduct of inputProducts) {
      const product = products.find(p => p.id === inputProduct.id);
      if (!product) {
        throw new NotFoundException(`Product with id ${inputProduct.id} not found`);
      }
      totalPrice += inputProduct.quantity * product.price;
    }

    return this.prisma.$transaction(async (prisma) => {
      const newCart = await prisma.cart.create({
        data: {
          userId: createCartDto.userId,
          totalPrice: totalPrice
        }
      });

      const cartItems = Object.entries(createCartDto.products).map(([productId, quantity]) => ({
        cartId: newCart.id,
        productId: Number(productId),
        quantity: Number(quantity)
      }));

      await prisma.cartProducts.createMany({
        data: cartItems
      });

      return prisma.cart.findUnique({
        where: { id: newCart.id },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });
    });
  }
}
