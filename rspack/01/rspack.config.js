const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
  },
 module: {
    rules: [
        {
          test: /\.js$/,
          loader: require.resolve('./src/loader.js'),
        },
      ],
 },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  builtins: {
    html: [{ template: './src/index.html' }],
  },
};