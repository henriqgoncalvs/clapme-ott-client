import { ReactNode } from 'react';
import { Box, Center, Container, Flex } from '@chakra-ui/react';
import Image from 'next/image';

import Heading from '@organism/Footer/Heading';

type Props = {
  title: string;
  children: ReactNode;
};

function InstitutionalLayout({ title, children }: Props) {
  return (
    <Container py="16" px="8" mt={20} maxW="6xl">
      <Center w="100%" mx="auto">
        <Flex direction="column" w="100%">
          <Flex alignSelf="center" direction="column" align="center">
            <Box
              px={6}
              py={4}
              borderRadius="lg"
              className="shadow"
              bg="solid-c"
            >
              <Image
                src="/img/logo.png"
                width={200}
                height={100}
                objectFit="contain"
              />
            </Box>
            <Heading as="h1" color="solid-c" my={6}>
              {title}
            </Heading>
          </Flex>

          <Box as="p" textAlign="justify">
            {children}
          </Box>
        </Flex>
      </Center>
    </Container>
  );
}

export default InstitutionalLayout;
