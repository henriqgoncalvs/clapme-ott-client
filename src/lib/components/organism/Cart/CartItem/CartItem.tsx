import { MdDeleteForever } from 'react-icons/md';
import {
  Box,
  Center,
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from '@chakra-ui/react';

import EventCardCart from '../EventCardCart';

function CartItem() {
  return (
    <Stack
      justifyContent="space-between"
      direction={{ base: 'column', md: 'row' }}
      mb={16}
    >
      <Box flex="1" mr={{ base: 0, md: 6 }} mb={{ base: 6, md: 0 }}>
        <EventCardCart
          title="O Terno"
          description="Apresentação da banda O Terno"
          date="12 MAI - 22H"
          imgUrl="/img/o-terno.png"
        />
      </Box>

      <Box w="100%" flex="1">
        <Flex h="100%" alignItems="center" justifyContent="space-between">
          <Flex direction="column" alignItems="center" flex="1">
            <Text fontWeight="bold" mb="6">
              Valor
            </Text>
            <p>R$ 100,00</p>
          </Flex>

          <Flex direction="column" alignItems="center" flex="1">
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
          </Flex>

          <Center flex="0.6">
            <IconButton
              as="button"
              aria-label="Remove"
              icon={<MdDeleteForever fontSize="20px" />}
            />
          </Center>
        </Flex>
      </Box>
    </Stack>
  );
}

export default CartItem;
