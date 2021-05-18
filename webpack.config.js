require('dotenv/config');

const HtmlPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const { resolve } = require('path');

const publicPath = process.env.PUBLIC_PATH || '/';

const context = resolve(__dirname, 'src');

module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './src'],
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
          presets: ['@babel/preset-react'],
          plugins: [
            [
              '@babel/transform-runtime',
              {
                regenerator: true,
              },
            ],
          ],
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          publicPath,
        },
      },
    ],
  },
  plugins: [
    new DotenvPlugin(),
    new HtmlPlugin({
      inject: true,
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      title: 'Night Palette',
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    progress: true,
    compress: true,
  },
};
