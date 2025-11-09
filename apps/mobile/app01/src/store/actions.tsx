import {addToCart} from '@/store/cartSlice';
import {removeFromCart} from '@/store/cartSlice';
import {addToWishlist} from '@/store/wishlistSlice';
import {removeFromWishlist} from '@/store/wishlistSlice';

export const actions = {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
};
