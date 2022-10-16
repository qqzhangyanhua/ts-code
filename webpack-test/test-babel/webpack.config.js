
const path= require('path')
module.exports ={
    mode:'production',
    entry:'./src/index.js',
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['@babel/preset-env']
                        // plugins:[
                        //     '@babel/plugin-transform-arrow-functions',
                        //     "@babel/plugin-transform-block-scoping"
                        // ]
                    }
                }
            }
        ]
    },
    output:{
        filename:"[name].js",
        path:path.join(__dirname,'./dist'),
   
    },

}