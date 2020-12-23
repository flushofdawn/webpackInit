const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { runtime } = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'built'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js'
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
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 以下 大部分是 默认值
      /*
      minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSize: 0, // 最大分割 没有限制
      minChunks: 1, // 要提取的chunk 最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载文件的最大数目
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', //名称连接符
      name: true, // 可以使用命名规则
      cacheGroup: {//分割chunk的组
        // node_modules文件会被打包到vender组中的chunk中。 -->  vendors~xxx.js
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk 最少被引用2次.覆盖上面的minChunks
          minChunks: 2,
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新模块打包
          reuseExistingChunk: true,
        }

      } */
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件runtime
    // 解决：修改a文件导致b文件的contenthash变化,导致整个文件重新打包
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]
  }
}
