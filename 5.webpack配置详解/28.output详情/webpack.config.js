const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    // 文件名称 ( 指定名称 + 目录 )
    filename: 'js/[name].js',
    //输出文件目录( 将来所有资源输出的公共目录 )
    path: resolve(__dirname, 'built'),
    // 所有资源引入公共路径前缀 --> 'imgs/a,jpg' --> '/imgs/a,jpg'
    //publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', //非入口chunk的名称 ( 1.import导入的文件打包名称 2. 通过optimization将node_modules中的内容分割成单独chunk [参看 code split] )
    library: '[name]',  // 整个库向外暴露的变量名
    // libraryTarget: 'window'   // 向外暴露的变量名添加到哪个上面 browser (浏览器)
    // libraryTarget: 'global'   // 向外暴露的变量名添加到哪个上面 node
    // libraryTarget: 'commonjs'   // 向外暴露的变量名添加到哪个上面

  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}
