const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

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
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
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
          ]
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
      filename: 'css/built.css',
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production'
}
