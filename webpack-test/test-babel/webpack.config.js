const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const vueLoaderPlugin=require('vue-loader/lib/plugin') 
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.vue$/, 
                use:['vue-loader']
            },
            {
            test: /\.(js|jsx)$/,
            // exclude: /node_modules/,
            exclude: /node_modules\/(?!(json-bigint|ANOTHER-ONE)\/).*/, //排除node_modules下的MY_MODULE和ANOTHER-ONE
            // include:[ path.resolve(__dirname, './node_modules/json-bigint'),path.resolve(__dirname,'./src')], //只转换这个包
            use: {
                loader: 'babel-loader',
            }
        },
        {
            test:/\.css$/,
            use:['style-loader','css-loader'] // 从右向左解析原则
          }]
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, './dist'),

    },
  
    plugins: [
        new vueLoaderPlugin(),
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: "index.html"
        }),
      ],


}