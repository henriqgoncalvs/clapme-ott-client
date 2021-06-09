/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const colors = require('./src/app/styles/tokens/colors');
const font = require('./src/app/styles/tokens/font');

module.exports = {
  mode: 'jit',
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        ...font.family,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
