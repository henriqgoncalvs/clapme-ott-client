import { createContext, ReactNode, useContext, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';

import { ProductsAPI } from 'core/api/fetchers';
import { CartItemI, CartProviderI } from 'lib/types/contexts/cart';

const CartContext = createContext({} as CartProviderI);

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemI[]>([]);
  const toast = useToast();
  const router = useRouter();

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

  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const finishCart = async () => {
    const productsPromises = cart.map((cartItem) =>
      ProductsAPI.purchase(cartItem.productId),
    );

    const response = await Promise.all(productsPromises);

    if (response.filter((r) => r.status !== 200).length) {
      response
        .filter((r) => r.status !== 200)
        .forEach(() =>
          toast({
            position: 'top',
            title: 'Erro na compra do item',
            description: `Entre em contato com o suporte`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          }),
        );
    } else {
      router.push('/');
    }
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
