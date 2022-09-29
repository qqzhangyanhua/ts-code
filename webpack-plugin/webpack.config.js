
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
    resolveLoader: {
        //modules也是一种方式
        modules:['node_modules',path.resolve(__dirname,'loader')]
        //配置别名loader是一种方式
        // alias:{
        //     loader1:path.resolve(__dirname,'loader','loader1.js')
        // }
    },
    devtool:"source-map",
    module:{
        rules:[
            { test:/\.css$/, use:[miniCssExtractPlugin.loader,'css-loader']},
            // { test:/\.js$/, use:['loader1','loader2']}
            { test:/\.js$/, use:{
                loader:'babel-loader',
               options: {
                presets:['@babel/preset-env']
               }
            }}

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