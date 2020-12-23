const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'built')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development',
  devServer: {
    // 代码运行的目录
    contentBase: resolve(__dirname, "built"),
    // 监视contentBase目录下的所有文件，一旦文件发生变化就会reload重载
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    }
    // 启动zip压缩
    compress: true,
    // 域名
    host: 'localHost',
    // 端口号
    post: 8080,
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 启动服务器 日志不显示
    clientLogLevel: 'none',
    // 除了一些 基本启动信息以外，其他内容都不要去显示
    quiet: true,
    // 如果出现错误 ， 不要全屏提示~
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦devSever(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另一个服务器(3000)
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx  改写-->  /xxx    (去掉/api) 
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
