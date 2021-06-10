import * as React from 'react';
import { Box, Stack, StackDivider } from '@chakra-ui/react';
import Image from 'next/image';

import Copyright from '@organism/Footer/Copyright';
import LinkGrid from '@organism/Footer/LinkGrid';
import SocialMediaLinks from '@organism/Footer/SocialMediaLinks';

function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      py="12"
      px={{ base: '4', md: '8' }}
      d="flex"
      justifyContent="center"
      w="100%"
      bg="solid-c"
    >
      <Stack maxW="7xl" flex="1" spacing="10" divider={<StackDivider />}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '10', lg: '28' }}
        >
          <Box
            flex="1"
            d="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            flexDirection="column"
          >
            <Image
              src="/img/logo.png"
              width="100"
              height="60"
              objectFit="contain"
            />
            <Image
              src="/img/clapme-logo.png"
              width="100"
              height="60"
              objectFit="contain"
            />
          </Box>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: '10', md: '20' }}
          >
            <LinkGrid spacing={{ base: '10', md: '20', lg: '28' }} flex="1" />
          </Stack>
        </Stack>
        <Stack
          direction={{ base: 'column-reverse', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Copyright />
          <SocialMediaLinks />
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
