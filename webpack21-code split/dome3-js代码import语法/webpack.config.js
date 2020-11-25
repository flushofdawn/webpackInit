const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");



//定义nodejs环境变量：决定 需要在package.json里面的 browserslist 使用哪个配置 
process.env.NODE_ENV = 'production'

module.exports = {
  entry: './src/js/index.js',
  output: {
    /* publicPath: '../', */
    //[name] 取文件名
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
  ],
  mode: 'production'
}
