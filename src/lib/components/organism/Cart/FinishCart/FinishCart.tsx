import { IoBagCheckOutline } from 'react-icons/io5';
import { Button, Flex, Text } from '@chakra-ui/react';

import { useCart } from '@contexts/CartProvider';

function FinishCart() {
  const { finishCart } = useCart();

  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Flex w="100%" alignItems="center" justifyContent="space-between" mb={6}>
        <Text fontWeight="bold">Sub-total:</Text>
        <p>R$ 00,00</p>
      </Flex>
      <Flex w="100%" alignItems="center" justifyContent="space-between" mb={6}>
        <Text fontWeight="bold">Desconto:</Text>
        <p>-</p>
      </Flex>
      <Flex w="100%" alignItems="center" justifyContent="space-between" mb={6}>
        <Text fontWeight="bold">Total:</Text>
        <p>R$ 00,00</p>
      </Flex>
      <Button
        size="lg"
        type="submit"
        leftIcon={<IoBagCheckOutline />}
        onClick={finishCart}
      >
        Finalizar compra
      </Button>
    </Flex>
  );
}

export default FinishCart;
