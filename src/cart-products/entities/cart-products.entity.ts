import { Product } from '../../products/entities/products.entity';
import { Cart } from '../../cart/entities/cart.entity';

export class CartProducts {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  
  // Relações
  cart: Cart;
  product: Product;
}