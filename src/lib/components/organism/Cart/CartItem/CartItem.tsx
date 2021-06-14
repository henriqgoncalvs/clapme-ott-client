import { MdDeleteForever } from 'react-icons/md';
import { Box, Center, Flex, IconButton, Stack, Text } from '@chakra-ui/react';

import { CartItemI } from 'lib/types/contexts/cart';

import { useCart } from '@contexts/CartProvider';

import EventCardCart from '../EventCardCart';

function CartItem({
  id,
  title,
  description,
  date,
  imgUrl,
  productId,
}: CartItemI) {
  const { removeFromCart } = useCart();

  return (
    <Stack
      justifyContent="space-between"
      direction={{ base: 'column', md: 'row' }}
      mb={16}
    >
      <Box flex="1" mr={{ base: 0, md: 6 }} mb={{ base: 6, md: 0 }}>
        <EventCardCart
          productId={productId}
          title={title}
          description={description}
          date={date}
          imgUrl={imgUrl}
        />
      </Box>

      <Box w="100%" flex="1">
        <Flex h="100%" alignItems="center" justifyContent="space-between">
          <Flex direction="column" alignItems="center" flex="1">
            <Text fontWeight="bold" mb="6">
              Valor
            </Text>
            <p>R$ 00,00</p>
          </Flex>

          {/* <Flex direction="column" alignItems="center" flex="1">
            <Text fontWeight="bold" mb="4">
              Quantidade
            </Text>
            <Box w="50%">
              <NumberInput>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Flex> */}

          <Center flex="0.6">
            <IconButton
              aria-label="Remove"
              icon={<MdDeleteForever fontSize="20px" />}
              onClick={() => removeFromCart(id)}
            />
          </Center>
        </Flex>
      </Box>
    </Stack>
  );
}

export default CartItem;
