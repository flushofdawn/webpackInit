const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

/* 
  tree shaking 去除无用的无用代码
    前提：1. 必须使用ES6 模块化      2.开启production环境
    作用： 减少代码体积

    在package.json中配置 
        "sideEffects": false ( 所有代码都没有副作用,都可以进行tree shaking )
      问题： 可能会把 css / less / @babel/polyfill （副作用）文件干掉
       "sideEffects": ["*.less","*.css"] 配置忽略去除样式文件

*/

//定义nodejs环境变量：决定 需要在package.json里面的 browserslist 使用哪个配置 
process.env.NODE_ENV = 'production'

const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  'css-loader',
  {
    //需要在package.json里面 定义browserslist配置 信息
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => {
        require('postcss-preset-env')
      }
    }
  }
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    /* publicPath: '../', */
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        //需要在package.json里面的 定义eslintConfig配置  我们使用的是 airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',  // 优先执行 eslint-loader
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // 以下loader只会匹配一个
        // ↑↑↑  注意： oneOf 不能有两个配置处理同一种类型的文件 所以 处理js的 文件 只能有一个 ，并且 eslint-loader 需要优先执行，所以提到上面去了  ↑↑↑ 
        oneOf: [{
          test: /\.css$/,
          use: [
            ...commonCssLoader
          ]
        },
        {
          test: /\.less$/,
          use: [
            ...commonCssLoader,
            'less-loader',
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: 3 },
                  targets: {
                    chrome: '60',
                    firefox: '50',
                    edge: '17',
                    ie: '8'
                  }
                }
              ]
            ],
            //开启babel缓存
            //第二次构建时，会读取之前的缓存
            cacheDirectory: true
          }
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            name: '[hash:10].[ext]',
            outputPath: './images',
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        }, {
          exclude: /\.(png|jpg|gif|jpeg|js|css|less|html)$/,
          loader: 'file-loader',
          options: {
            name: '[hash:10].[ext]',
            outputPath: './other',
          }
        }]
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
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production'
}
