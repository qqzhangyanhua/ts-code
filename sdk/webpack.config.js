const path = require("path");
module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "webpack-numbers.js",
    libraryTarget: "umd",
    globalObject: "this",
    library: "webpackNumbers",
  },
};
