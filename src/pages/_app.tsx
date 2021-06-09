import { ChakraProvider } from '@chakra-ui/react';
import chakraTheme from 'app/styles/chakra-theme';
import type { AppProps } from 'next/app';

import 'app/styles/global.styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
