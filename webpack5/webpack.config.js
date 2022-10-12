

const path = require('path')
const EslintPlugin = require('eslint-webpack-plugin');
const {merge} = require('webpack-merge');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;  //打包分析工具
const WebpackBar = require('webpackbar'); //打包进度
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const otherConfig ={
  plugins: [new EslintPlugin(),new CleanWebpackPlugin(),  new WebpackBar()],
  mode:'production',
//   cache: {
//     type: 'filesystem'
// },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use:['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript"],
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
}
module.exports = (env ,argv)=>{
  // console.log('env=====',env)
  // console.log('argv======',argv)
  return [ 
    merge( {
      entry: "./src/index.ts",
      output: {
        filename: '[contenthash:8].bundle.js',
        path: path.resolve(__dirname, "dist"),
      },
    },otherConfig),merge(otherConfig,{
      entry: "./src/index2.ts",
      output: {
        filename: "index2.js",
        path: path.resolve(__dirname, "dist1"),
      },
    })
  ]
}
