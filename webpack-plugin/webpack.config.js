const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{loader:"a-loader",options:{
          author: "zyh",
          email:'42434@qq.com'
        }}],
      },
    ],
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "loader"),
    ],
  },
};