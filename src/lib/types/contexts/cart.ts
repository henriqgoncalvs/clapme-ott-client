import { EventCardCartProps } from 'lib/types/components';

export type CartItemI = EventCardCartProps;

export type CartProviderI = {
  addToCart: (item: CartItemI) => void;
  removeFromCart: (id: string) => void;
  finishCart: () => void;
  cart: CartItemI[];
};
