/*
  HMR： hot module replacement 热模块替换 
    作用： 当一个模块发生变化，只会重新打包这一个模块（ 而不是打包所有模块 ），提升构建速度
      
      样式文件 ：可以实现 HMR 功能，因为style-loader内部实现了
      
      js文件 ：默认不支持 HMR 功能 ---> 需要 修改 js 代码，添加支持 HMR 功能的代码
          注意：HMR功能对js的处理，只能处理非入口的js文件，(原因 : 入js口文件 一旦更新，会重新引入加载的其他js文件，整体重新打包)
          
      html文件 ：（不需要支持HMR功能）默认不支持 HMR 功能,同时会导致问题 html文件不能热更新了  （ 解决：修改entry入口，将html文件引入 ）
         

*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
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
    // 开启HMR功能
    hot: true
  }
}
