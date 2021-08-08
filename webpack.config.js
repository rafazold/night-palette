const HtmlPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve, join } = require('path');

const publicPath = process.env.PUBLIC_PATH || '/';

const context = resolve(__dirname, 'src');

module.exports = {
  // entry: ['core-js/stable', 'regenerator-runtime/runtime', './src'],
  output: {
    publicPath,
    path: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: context,
        options: {
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
          ],
        },
      },
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      { test: /\.html$/, loader: 'html-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlPlugin({
      inject: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: 'Dark Mode Color Palettes for Designers and Artists',
        'theme-color': '#000000',
        'og:title': { property: 'og:title', content: 'Night Palette' },
        'og:description': {
          property: 'og:description',
          content: 'Dark Mode Color Palettes for Designers and Artists',
        },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': { property: 'og:url', content: 'https://nightpalette.com' },
        'og:image': {
          property: 'og:image',
          content: '/assets/images/night-share.png',
        },
        'twitter:card': {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        'twitter:title': { name: 'twitter:title', content: 'Night Palette' },
        'twitter:description': {
          name: 'twitter:description',
          content: 'Dark Mode Color Palettes for Designers and Artists',
        },
        'twitter:image': {
          name: 'twitter:image',
          content: '/assets/images/night-share.png',
        },
        pinterest: {
          name: 'p:domain_verify',
          content: '7602c8d45d3528f005b2b9ef249968e9',
        },
      },
      title: 'Night Palette',
      favicon: './src/assets/favicon.ico',
    }),
    new WebpackPwaManifest({
      name: 'Night Palette',
      short_name: 'Night-Palette',
      description: 'Dark Mode Color Palettes for Designers and Artists',
      background_color: '#000',
      icons: [
        {
          src: resolve('./src/assets/images/night-logo.png'),
          sizes: [120, 152, 167, 180, 192, 512, 1024],
          destination: join('assets'),
          ios: true,
        },
        {
          src: resolve('./src/assets/images/night-logo.png'),
          size: 1024,
          destination: join('assets'),
          ios: 'startup',
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets/images', to: 'assets/images' }],
    }),
  ],
};
