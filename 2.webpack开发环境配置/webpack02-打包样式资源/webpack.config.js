const { resolve } = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'outFile.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // use 数组中的loader执行顺序：从后到前 依次执行 
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          // use 数组中的loader执行顺序：从后到前 依次执行 
          'style-loader',
          'css-loader',
          'less-loader',
        ]
      }
    ]
  },
  plugins: [],
  //mode: 'development',
  mode: 'development'
}
