const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: ['./src/index.js', './src/count.js'],
    add: './src/add.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'built')
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js/,
        // 排除检测 /node_modules/ 下的文件
        exclude: /node-modules/,
        // 只检测 src 下的文件
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        //  enforce: 'post',  //延后执行  
        // 单个loader 用loader，多个loader用use
        loader: 'eslint-loader',
      },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}
