

const path = require('path')
const EslintPlugin = require('eslint-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const webpackConfig = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new EslintPlugin()],
  mode:'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use:['style-loader', 'css-loader']
        // include: {
        //   and: [path.join(__dirname, "./src/")],
        // },
        // use:['style-loader','css-loader',{
        //     loader:'less-loader',
        // }]
      },
      {
        test: /\.js$/,
        use: [
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
};
module.exports = smp.wrap(webpackConfig)