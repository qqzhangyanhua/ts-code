let babel = require('@babel/core');
let loaderUtils = require('loader-utils')

function loader(source) {
    //loader的参数 源代码
    let cb = this.async();
    let options = loaderUtils.getOptions(this)
    babel.transform(source, {
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop  //sourcemap的文件名
    }, (err, result) => {
        cb(err, result.code, result.map) //异步
    })
    console.log('loader1================', options)
    return source

}
module.exports = loader