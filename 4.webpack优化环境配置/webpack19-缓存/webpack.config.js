const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

/* 
  缓存: 
    babel缓存
      目的：让第二次打包构建速度更快
      配置  cacheDirectory:true

    文件资源缓存
      目的： 让代码上线运行缓存 更好使用
        
      hash  每次webpack构建时会生成一个唯一的hash值
        问题:（只修改一个文件）因为js和css 使用同一个hash值。重新打包，会导致所有缓存失效，所以就会更新所有文件=，这样对于性能不友好。
        
        chunkhash  根据chunk生成。如果打包来源于同一个chunk，那么hash值 就是一样的，
        也并不能解决  修改一个文件  只改变一个打包后的文件
        因为css是在js中被引入，所以同属于一个chunk
        
        contenthash  根据文件的内容生成hash值，不同文件的hash值不同。 重新构建只要文件没变hash值根之前一样不变。
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
