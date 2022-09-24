
let path = require('path')
let DonePlugin = require('./plugins/donePlugin')
let AsyncPlugin = require('./plugins/asyncPlugin')
let HTMLWebpackPlugin = require('html-webpack-plugin')
let FileListPlugin = require('./plugins/fileListPlugin')
let miniCssExtractPlugin = require('mini-css-extract-plugin')
let LineSourcePlugin = require('./plugins/lineSourcePlugin')
module.exports={
    mode: 'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    }, 
    module:{
        rules:[
            { test:/\.css$/, use:[miniCssExtractPlugin.loader,'css-loader']}
        ]
    },
    plugins:[
        new LineSourcePlugin(),
        new miniCssExtractPlugin({ 
            filename:'bundle.css',
        }),
         new DonePlugin(),
         new AsyncPlugin(),
         new FileListPlugin({
             filename: 'list.md',
         }),
         new HTMLWebpackPlugin(
             { template:'./src/index.html'}
         )
    ]
}