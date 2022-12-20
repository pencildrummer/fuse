const plugin = require("tailwindcss/plugin");

// Animations from https://tailwindui.com/components/preview

module.exports = plugin(
  function ({ matchUtilities, theme }) {
    //matchUtilities();
  },
  {
    theme: {
      extend: {
        animation: {
          "fade-in": "fade-in 0.3s ease-out",
          "fade-out": "fade-out 0.2s ease-in",
          show: "show 0.3s ease-out",
          hide: "hide 0.2s ease-in",
        },
        keyframes: {
          "fade-in": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
          "fade-out": {
            "0%": { opacity: 1 },
            "100%": { opacity: 0 },
          },
          show: {
            "0%": {
              opacity: 0,
              "--tw-scale-x": "0.95",
              "--tw-scale-y": "0.95",
              transform:
                "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
            },
            "100%": {
              opacity: 1,
              "--tw-scale-x": "1",
              "--tw-scale-y": "1",
              transform:
                "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
            },
          },
          hide: {
            "0%": {
              opacity: 1,
              "--tw-scale-x": "1",
              "--tw-scale-y": "1",
              transform:
                "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
            },
            "100%": {
              opacity: 0,
              "--tw-scale-x": "0.95",
              "--tw-scale-y": "0.95",
              transform:
                "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
            },
          },
        },
      },
    },
  }
);
