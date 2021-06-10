import { Container } from '@chakra-ui/react';

import CartLayout from '@layout/CartLayout';

function Cart() {
  return (
    <>
      <Container mt={20} py="16" px="8" maxW="7xl">
        <CartLayout />
      </Container>
    </>
  );
}

export default Cart;
