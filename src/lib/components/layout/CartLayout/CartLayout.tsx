import { FiPlusCircle } from 'react-icons/fi';
import { Box, Button, Flex, Stack, StackDivider } from '@chakra-ui/react';

import CartItem from '@organism/Cart/CartItem';
import FinishCart from '@organism/Cart/FinishCart';

function CartLayout() {
  return (
    <Flex w="100%" mx="auto" direction="column">
      <h1 className="mb-12">Carrinho</h1>

      <Stack
        divider={<StackDivider />}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '10', lg: '12' }}
      >
        <Box flex="1">
          <CartItem />
          <CartItem />
          <CartItem />

          <Button
            size="md"
            mt={8}
            type="submit"
            w={300}
            leftIcon={<FiPlusCircle />}
          >
            Continuar comprando
          </Button>
        </Box>
        <Box w="100%" flex="0.5">
          <FinishCart />
        </Box>
      </Stack>
    </Flex>
  );
}

export default CartLayout;
