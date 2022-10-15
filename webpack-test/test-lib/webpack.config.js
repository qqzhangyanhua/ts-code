
const path= require('path')
module.exports ={
    mode:'production',
    entry:'./src/index.js',
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