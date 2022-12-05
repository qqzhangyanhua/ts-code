const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "webpack-numbers.js",
    libraryTarget: "umd",
    library: "NxReport",
  },
};
