/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const colors = require('./src/app/styles/tokens/colors');
const font = require('./src/app/styles/tokens/font');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        ...font.family,
      },
      backgroundImage: () => ({
        'header-banner': "url('/img/banner.png')",
        'login-banner': "url('/img/login.png')",
      }),
      boxShadow: {
        DEFAULT: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
