import { FaRegSadTear } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';
import { Box, Button, Flex, Stack, StackDivider } from '@chakra-ui/react';
import Link from 'next/link';

import { useCart } from '@contexts/CartProvider';

import CartItem from '@organism/Cart/CartItem';
import FinishCart from '@organism/Cart/FinishCart';

function CartLayout() {
  const { cart } = useCart();

  return (
    <Flex w="100%" mx="auto" direction="column">
      <h1 className="mb-12">Carrinho</h1>

      {cart.length > 0 ? (
        <Stack
          divider={<StackDivider />}
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '10', lg: '12' }}
        >
          <Box flex="1">
            {cart.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                id={cartItem.id}
                title={cartItem.title}
                description={cartItem.description}
                price={cartItem.price}
              />
            ))}

            <Link href="/" passHref>
              <Button
                as="a"
                size="md"
                mt={8}
                type="submit"
                w={300}
                leftIcon={<FiPlusCircle />}
              >
                Continuar comprando
              </Button>
            </Link>
          </Box>
          <Box w="100%" flex="0.5">
            <FinishCart />
          </Box>
        </Stack>
      ) : (
        <Box
          mt="2"
          fontWeight="semibold"
          as="h4"
          fontSize="xl"
          lineHeight="tight"
          d="flex"
          alignItems="flex-start"
        >
          <FaRegSadTear className="mr-3 mt-1" fontSize={30} />
          Seu carrinho está vazio
        </Box>
      )}
    </Flex>
  );
}

export default CartLayout;
