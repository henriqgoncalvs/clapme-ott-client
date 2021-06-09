import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import styleguide from '@root/styleguide.json';

import chakraTheme from '@styles/chakra-theme';

import '@styles/global.styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <Head>
        <title>{styleguide.type.brand}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
