/*
 * @Description: 描述
 * @Autor: Freddie
 * @Date: 2021-12-22 21:21:13
 * @LastEditors: Freddie
 * @LastEditTime: 2021-12-23 22:49:58
 */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        environment: {
            arrowFunction: false, //打包后兼容低版本
        }
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                // 指定加载器
                loader: 'babel-loader',
                options: {
                    //设置自定义环境
                    presets: [
                        [
                            // 指定环境插件
                            "@babel/preset-env",
                            //配置信息
                            {
                                // 要兼容的目标浏览器
                                targets: {
                                    "chrome": "85",
                                    "ie": '11'
                                },
                                "corejs": "3",
                                "useBuiltIns": "usage", //使用core-js按需加载
                            }
                        ]
                    ]
                }
            }, 'ts-loader'],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "postcss-preset-env",
                                    {
                                        browser: "last 10 versions"
                                    }
                                ]
                            ]
                        }
                    }
                },
                "less-loader"
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './public/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts']
    }
}