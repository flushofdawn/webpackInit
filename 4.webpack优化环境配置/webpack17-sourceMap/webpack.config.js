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
  },
  /* 
    sourceMap : 一种提供源代码到构建后代码映射技术（如果构建后代码出错了，可以通过映射追踪源代码错误）
      [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

        source-map： 外部
          错误代码准确位置 和 源代码的错误位置

        inline-source-map ： 内联 （只生成一个内联的source-map ）
          错误代码准确位置 和 源代码的错误位置

        hidden-source-map ： 外部
          错误代码错误原因 没有错误位置 不能追踪源代码错误，但是会提示构建后的代码错误位置

        eval-source-map ：   内联 （每个文件都生成一个内联的source-map ，都在eval函数中）
          错误代码准确位置 和 源代码的错误位置 生成文件 带有hash值

        nosources-source-map: 外部
          错误代码错误原因  没有任何源代码信息

        cheap-source-map：    外部
          错误代码准确位置 和 源代码的错误位置 只能精确到 行 !

        cheap-module-source-map： 外部
          错误代码准确位置 和 源代码的错误位置 只能精确到 行 !
          会将 loader 的 source-map加入

        内联 和 外部 区别：
          1.外部 生成了文件，内联 在代码内部生成map文件  
          2.内联构建速度更快


        开发环境：
          要求速度块，调试更加友好  模式速度 快 -> 慢（ eval > inline > cheap > .... ） 具体见    /asset/images/source-map构建速度.png

            推荐  eval-source-map  (vue react 框架开发环境默认使用的类型)
                  eval-cheap-source-map

        生产环境：
          源代码是否隐藏？         调试是否需要更加友好？（根据项目来做判断）
           hidden-source-map     只隐藏源代码，会提示构建后的代码错误位置     
           nosources-source-map  全部隐藏
           （ !!! 不使用内联，原因：会使单个文件代码体积过大，所以在生产环境不推荐内联的source-map ）
           推荐  source-map / cheap-source-map

  */
  devtool: 'eval'
}
