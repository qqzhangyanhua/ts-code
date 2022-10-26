const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.css$/i,
        use: ["style-loader", "css-loader", 'postcss-loader'],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader", ],
      },
      {
        test: /\.(js|jsx)$/,
        use: {
            loader: 'babel-loader',
        }
    },
    ],
  },
  plugins:[
    // 对比moment和dayjs的区别的时候再打开
    // new BundleAnalyzerPlugin()
  ]
}