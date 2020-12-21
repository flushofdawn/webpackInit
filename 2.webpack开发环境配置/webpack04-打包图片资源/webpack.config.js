const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { template } = require('lodash');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'outfile.js',
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg||png||gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:12].[ext]'
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}
