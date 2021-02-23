/* 
  使用dll(动态链接库英文为DLL，Dynamic Link Library)技术，对某些库（ 第三方库：jquery、react、vue... ）进行单独打包
  当你运行webpack时，默认查找webpack.config.js配置文件
    需求：需要运行webpack.dll.js文件
      命令 -->  
        webpack --config webpack.dll.js
*/
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name]  --> jq
    // ['jquery'] --> 要打包的库是jquery
    jq: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, "dll"),
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: resolve(__dirname, "dll/manifest.json"),
    })
  ],
  mode: 'development'
}
