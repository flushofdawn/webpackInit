const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/index.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // 用来打包less文件
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      // 用来打包css文件
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 用来打包图片文件
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // 用来打包其他类型文件
      {
        exclude: /\.(jpg|png|gif|less|css|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'other'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
  }
}
