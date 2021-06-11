import { ReactNode } from 'react';
import {
  Box,
  Center,
  Container,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  children: ReactNode;
};

function AuthLayout({ title, children }: Props) {
  return (
    <Container py="16" px="8" mt={20}>
      <Center maxW="md" w="100%" mx="auto">
        <Flex direction="column" align="stretch" w="100%">
          <Box alignSelf="center">
            <Image
              src="/img/logo.png"
              width={200}
              height={100}
              objectFit="contain"
            />
            <h1>{title}</h1>
          </Box>

          <Box>{children}</Box>

          <Center>
            <Stack direction={{ base: 'column', md: 'row' }} fontWeight="bold">
              <Text>Não tem uma conta?</Text>
              <Link href="/cadastrar" passHref>
                <ChakraLink color="primary-c.500">Cadastre-se.</ChakraLink>
              </Link>
            </Stack>
          </Center>
        </Flex>
      </Center>
    </Container>
  );
}

export default AuthLayout;
