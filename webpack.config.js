const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const context = resolve(__dirname, 'src');

module.exports = {
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [context],
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      title: 'Night Palette',
    }),
  ],
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    progress: true,
    compress: true,
  },
};
