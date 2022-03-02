const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    './src/client/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
      fontSize: {
        'xxs': '10px'
      },
      fontFamily: {
        'syncopate': ['"Syncopate"', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-radix")(),
  ],
}
