import { ProductCardCartProps } from 'lib/types/components';

export type CartItemI = ProductCardCartProps;

export type CartProviderI = {
  addToCart: (item: CartItemI) => void;
  removeFromCart: (id: number | string) => void;
  finishCart: () => void;
  cart: CartItemI[] | null;
};
