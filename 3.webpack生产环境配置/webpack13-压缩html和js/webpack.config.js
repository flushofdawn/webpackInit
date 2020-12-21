const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/index.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env',
              {
                //按需加载 
                useBuiltIns: 'usage',
                //指定core-js版本
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '8',
                  safari: '10',
                  edge: '17'
                }
              }]
          ]
        }
      }
    ]
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

    })
  ],
  // js压缩 - 生产环境会自动压缩js，所以只需要把mode改成production  UglifyJsPlugin
  mode: 'production'
}
