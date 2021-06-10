import { Container } from '@chakra-ui/react';

import CartLayout from '@layout/CartLayout';

import Navbar from '@organism/Navbar';

function Cart() {
  return (
    <>
      <Navbar />
      <Container mt={20} py="16" px="8" maxW="7xl">
        <CartLayout />
      </Container>
    </>
  );
}

export default Cart;
