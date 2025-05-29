import { CartProducts } from '../../cart-products/entities/cart-products.entity';

export class Cart {
  id: number;
  totalPrice: number;
  items: CartProducts[];
}