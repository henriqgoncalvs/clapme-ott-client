import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import colors from 'app/styles/tokens/colors';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
});

export default theme;
