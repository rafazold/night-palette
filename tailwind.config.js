module.exports = {
  purge: {
    content: ['./src/**/**/*.jsx', './src/**/**/*.js', './src/index.js'],
    // enabled: true,
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
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
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
    },
  },
  plugins: [],
};
