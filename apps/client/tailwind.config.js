const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "../../packages/core-ui/lib/**/*.{js,ts,jsx,tsx}",
    "../../packages/core-client/lib/**/*.{js,ts,jsx,tsx}",
    // These needs to be changed to allow styles included in plugins?
    // Or something more automatic instead adding every style for every plugin
    "../../packages/**/client/**/*.{js,ts,jsx,tsx}",
    "../../plugins/**/client/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
      fontSize: {
        xxs: "10px",
      },
      fontFamily: {
        syncopate: ['"Syncopate"', "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-radix")()],
};
