

const path = require('path')
const EslintPlugin = require('eslint-webpack-plugin');
<<<<<<< HEAD
const {merge} = require('webpack-merge');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;  //打包分析工具
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const otherConfig ={
  plugins: [new EslintPlugin(),new CleanWebpackPlugin()],
  mode:'production',
//   cache: {
//     type: 'filesystem'
// },
=======
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");  //计算打包用时间的
const smp = new SpeedMeasurePlugin();
const webpackConfig = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new EslintPlugin()],
  mode:'development',
>>>>>>> 56760f28d3334c70e36675fbf14cdbebcf708af2
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
<<<<<<< HEAD
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
=======
};
module.exports = smp.wrap(webpackConfig)
>>>>>>> 56760f28d3334c70e36675fbf14cdbebcf708af2
