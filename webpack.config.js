const HtmlPlugin = require('html-webpack-plugin');

const { resolve } = require('path');

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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlPlugin({
      inject: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: 'Dark Mode Color Palettes for Designers and Artists',
      },
      title: 'Night Palette',
      favicon: './src/assets/favicon.ico',
    }),
  ],
};
