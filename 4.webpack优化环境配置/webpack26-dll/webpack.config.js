const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

process.env.NODE_ENV = 'production'

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      //html 压缩
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/manifest.json"),
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, "dll/jq.js"),
    })
  ],
  mode: 'production'
}
