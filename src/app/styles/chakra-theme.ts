import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import palx from 'palx';

import colors from '@styles/tokens/colors';
import font from '@styles/tokens/font';

import createChakraPallete from '@utils/createChakraPallete';

const colorPallete = palx(colors['primary-c']);

createChakraPallete(colorPallete);

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    body: font.family['text-f'],
    heading: font.family['title-f'],
  },
});

export default theme;
