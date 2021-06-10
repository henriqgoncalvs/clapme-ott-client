import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import palx from 'palx';

import colors from '@styles/tokens/colors';
import font from '@styles/tokens/font';

import createChakraPallete from '@utils/createChakraPallete';

const colorPallete = createChakraPallete(palx(colors['primary-c']['500']));

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    ...colors,
    ...colorPallete,
  },
  fonts: {
    body: font.family['text-f'],
    heading: font.family['title-f'],
  },
  styles: {
    global: {
      body: {
        color: colors['text-c'],
        bg: colors['body-c'],
      },
      h1: {
        fontWeight: 'bold',
        fontSize: '3xl',
      },
      h2: {
        fontWeight: 'bold',
        fontSize: { base: '2xl', sm: '2xl', md: '3xl', lg: '4xl' },
      },
      h3: {
        fontWeight: 'bold',
        fontSize: 'xl',
      },
      h4: {
        fontWeight: 'bold',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'filled',
      },
      variants: {
        filled: {
          bg: 'primary-c.500',
          color: 'secondary-c',
          _hover: {
            bg: 'primary-c.800',
          },
          _active: {
            bg: 'primary-c.800',
          },
          _focus: {
            bg: 'primary-c.800',
          },
        },
        outline: {
          bg: 'transparent',
          borderColor: 'primary-c.500',
          color: 'primary-c.500',
          border: '1px',
          _hover: {
            bg: 'primary-c.800',
            color: 'secondary-c',
          },
          _active: {
            bg: 'primary-c.800',
            color: 'secondary-c',
          },
          _focus: {
            bg: 'primary-c.800',
            color: 'secondary-c',
          },
        },
      },
    },
  },
});

export default theme;
