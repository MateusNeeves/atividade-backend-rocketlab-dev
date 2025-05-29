import { Controller, Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  
  @Post('/checkout')
  checkout(@Body() createCartDto: CreateCartDto) {
    return this.cartService.checkout(createCartDto);
  }
}
