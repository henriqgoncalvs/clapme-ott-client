import { createContext, ReactNode, useContext, useState } from 'react';
import { useToast } from '@chakra-ui/toast';

import { ProductsAPI } from 'core/api/fetchers';
import { CartItemI, CartProviderI } from 'lib/types/contexts/cart';

const CartContext = createContext({} as CartProviderI);

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemI[]>([]);
  const toast = useToast();

  const addToCart = (item: CartItemI) => {
    toast({
      position: 'top',
      title: 'Item adicionado ao carrinho.',
      description: `'${item.title}' foi adicionado com sucesso.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    console.log(id, cart);
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const finishCart = async () => {
    const productsPromises = cart.map((cartItem) =>
      ProductsAPI.purchase(cartItem.productId),
    );

    const response = await Promise.all(productsPromises);

    console.log(response);
  };

  const values = {
    cart,
    addToCart,
    removeFromCart,
    finishCart,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
export default CartProvider;
