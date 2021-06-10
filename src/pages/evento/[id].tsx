import { Box, Center, Container, Flex, Stack, Text } from '@chakra-ui/react';

import Countdown from '@organism/Countdown';

function Event() {
  return (
    <Container
      py="16"
      px="8"
      mt={10}
      h="100vh"
      maxW="100vw"
      pos="relative"
      _before={{
        content: "''",
        bg: 'solid-c',
        pos: 'absolute',
        top: 0,
        left: 0,
        w: '100%',
        h: '100%',
        zIndex: 13,
        opacity: 0.7,
      }}
    >
      <Center maxW="2xl" mx="auto" h="100%" pos="relative" zIndex="15">
        <Flex h="70vh" w="100%" direction={{ base: 'column', md: 'row' }}>
          <Box
            bg="black"
            borderTopLeftRadius="3xl"
            borderBottomLeftRadius={{ base: '0', md: '3xl' }}
            borderTopRightRadius={{ base: '3xl', md: '0' }}
            flex="1"
            p={8}
            h="100%"
            bgImg="/img/o-terno.png"
            bgPos="center"
            bgSize="cover"
          />
          <Box
            bg="solid-c"
            flex="1"
            h="100%"
            d="flex"
            alignItems="center"
            borderTopRightRadius={{ base: '0', md: '3xl' }}
            borderBottomLeftRadius={{ base: '3xl', md: '0' }}
            borderBottomRightRadius="3xl"
            px={6}
            py={16}
          >
            <Stack
              color="solid-text-c"
              align="center"
              justifyContent="space-between"
              height={{ base: '100%', md: '80%' }}
            >
              <Flex align="center" direction="column">
                <h1>O Terno</h1>
                <Text textAlign="center">
                  A banda paulistana cantará o álbum {'<atrás/além>'} e outros
                  sucessos.
                </Text>
              </Flex>

              <Countdown />
            </Stack>
          </Box>
        </Flex>
      </Center>

      <img
        src="/img/o-terno.png"
        className="absolute w-screen h-screen top-0 left-0 object-cover z-10 filter blur-sm"
      />
    </Container>
  );
}

export default Event;
