const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            include:function(modulePath){
              console.log('modulePath===', modulePath);
              // return  /node_modules/
            },
            use: {
                loader: 'babel-loader',
            }
        }
    ]
  },
}