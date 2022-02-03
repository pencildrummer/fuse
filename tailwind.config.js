const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
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
    //require('daisyui'),
  ],
}
