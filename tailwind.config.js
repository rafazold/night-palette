const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: {
    content: ['./src/**/**/*.jsx', './src/**/**/*.js', './src/index.js'],
    whitelist: ['font-primary'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'card-gray': '#191919',
        'button-gray': '#262626',
        'light-gray': '#efefef',
        'button-blue': '#0097c4',
        'button-green': '#15ffb7',
      },
      spacing: {
        '1/10': '10%',
        40: '31.25rem',
      },
      boxShadow: {
        main: '0 3px 20px 0 rgba(0, 0, 0, 0.45)',
        white: '0 3px 20px 0 rgba(255,255,255, 0.45)',
        turquoise: '0 3px 20px 0 rgba(0, 255, 177, 0.45)',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        '17%': '17%',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
      textColor: ['disabled'],
      gradientColorStops: ['disabled'],
      display: ['hover', 'group-hover'],
      maxHeight: ['hover', 'group-hover'],
      opacity: ['hover', 'group-hover', 'responsive', 'disabled'],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.hide-tap': {
          '-webkit-tap-highlight-color': 'transparent',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
