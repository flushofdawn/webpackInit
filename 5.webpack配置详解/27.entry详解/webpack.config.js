const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* 
  entry: 入口起点
  1. string -->  entry: './src/index.js',
      单入口
      打包形成一个chunk。 输出一个bundle文件。
      此时chunk的名称默认是 main
  
  2. arr -->  entry: ['./src/index.js', './src/add.js'],
      多入口
      所有入口文件最终只会形成一个chunk，输出也只有一个bundle文件。
          -->只有再HMR功能中 让html热更新生效~
  
  3. object
      多入口 
      entry: {
        index: './src/index.js',
        add: './src/add.js'
      },
      有几个入口文件就形成几个chunk，输出几个bundle文件
      此时chunk的名称是 key 
*/

module.exports = {
  entry: {
    index: ['./src/index.js', './src/count.js'],
    add: './src/add.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'built')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}
