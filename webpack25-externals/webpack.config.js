const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { template } = require('lodash');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, "build")
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production',
  externals: {
    jquery: 'jQuery'
  }
}
