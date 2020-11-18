const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'outfile.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 打包其他资源
      {
        exclude: /\.(css|html|js|less|vue)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}
