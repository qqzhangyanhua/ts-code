const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      inject: "head",
    }),
  ],
};
