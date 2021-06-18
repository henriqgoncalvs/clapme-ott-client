/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';

import { ProductsAPI } from 'core/api/fetchers';
import { CART_COOKIES } from 'core/config';
import { CartItemI, CartProviderI } from 'lib/types/contexts/cart';

const CartContext = createContext({} as CartProviderI);

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemI[] | null>(null);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (cart === null) {
      if (parseCookies()[CART_COOKIES]) {
        setCart(JSON.parse(parseCookies()[CART_COOKIES]));
      } else {
        setCart([]);
      }
    }
  }, [cart]);

  const addToCart = (item: CartItemI) => {
    const newCart = [...cart!, item];

    toast({
      position: 'top',
      title: 'Item adicionado ao carrinho.',
      description: `'${item.title}' foi adicionado com sucesso.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setCart(newCart);
    setCookie(null, CART_COOKIES, JSON.stringify(newCart));
  };

  const removeFromCart = (id: number | string) => {
    const newCart = cart!.filter((cartItem) => cartItem.id !== id);

    setCart(newCart);
    setCookie(null, CART_COOKIES, JSON.stringify(newCart));
  };

  const finishCart = async () => {
    const productsPromises = cart!.map((cartItem) =>
      ProductsAPI.purchase(cartItem.id),
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
      toast({
        position: 'top',
        title: 'Sucesso na compra',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/');
      router.reload();
    }

    setCart([]);
    setCookie(null, CART_COOKIES, JSON.stringify([]));
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
