import {
  Box,
  Link as ChakraLink,
  SimpleGrid,
  SimpleGridProps,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';

import Heading from '../Heading';

function LinkGrid(props: SimpleGridProps) {
  return (
    <SimpleGrid columns={1} {...props}>
      <Box minW="130">
        <Heading mb="4">Institucional</Heading>
        <Stack color="solid-text-c">
          <Link href="/quem-somos" passHref>
            <ChakraLink>Quem somos</ChakraLink>
          </Link>
          <Link href="/termos-de-uso" passHref>
            <ChakraLink>Termos de uso</ChakraLink>
          </Link>
          <Link href="/politica-de-privacidade" passHref>
            <ChakraLink>Política de Privacidade</ChakraLink>
          </Link>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}

export default LinkGrid;
