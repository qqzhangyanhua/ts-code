
const path= require('path')
module.exports ={
    mode:'production',
    entry:'./src/index.js',
    module:{
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    output:{
        filename:"[name].js",
        path:path.join(__dirname,'./dist'),
        library:{
            name:"abc",
            type:'umd'
        }
    },
    externals:{
        lodash:{
            commonjs:'lodash',
            commonjs2:"lodash",
            amd:"lodash",
            root:'_'
        }
    }
}