const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const workboxWebpackPlugin = require("workbox-webpack-plugin");

/* 
  PWA: 渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin

*/
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
    new OptimizeCssAssetsWebpackPlugin(),
    new workboxWebpackPlugin.GenerateSW({
      /* 
        1. 帮助serviceworker快速启动
        2. 删除旧的serviceworker
      */

      clientsClaim: true,
      skipWaiting: true
    })
  ],
  mode: 'production'
}
