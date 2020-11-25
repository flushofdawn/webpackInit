const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");



//定义nodejs环境变量：决定 需要在package.json里面的 browserslist 使用哪个配置 
process.env.NODE_ENV = 'production'

module.exports = {
  // 单入口   
  // entry: './src/js/index.js', 
  entry: {
    // 多入口 每有一个入口，打包之后就有几个bundle
    main: './src/js/index.js',
    test: './src/js/test.js',
  },
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
