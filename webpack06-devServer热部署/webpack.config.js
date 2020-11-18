const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { template } = require('lodash');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'outfile.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 打包其他资源
      {
        exclude: /\.(css|html|js|less|vue)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  // 开发服务器 devServer： 用来自动化( 自动编译（热部署）、自动打开浏览器、自动刷新浏览器 )
  // 特点：只会在 内存中 编译打包，不会有任何输出，当服务关闭就会删除打包文件
  // 启动命令： npx webpack-dev-server
  devServer: {
    // 项目构建后的路径 
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    //自动打开浏览器
    open: true
  },
}
