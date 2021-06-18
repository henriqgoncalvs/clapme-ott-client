import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import styleguide from '@root/styleguide.json';

import chakraTheme from '@styles/chakra-theme';

import AuthProvider from '@contexts/AuthProvider';
import CartProvider from '@contexts/CartProvider';

import Footer from '@layout/Footer';

import Navbar from '@organism/Navbar';

import '@styles/global.styles.css';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <AuthProvider>
        <CartProvider>
          <Head>
            <title>{styleguide.type.brand}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="theme-color"
              content={styleguide.colors['primary-c']['500']}
            ></meta>
            <meta name="description" content={styleguide.type.banner}></meta>
          </Head>
          <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
