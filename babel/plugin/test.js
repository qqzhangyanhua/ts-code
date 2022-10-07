
 const babel = require('@babel/core');
 const myPlugin  = require('./index');

 const code = `
        console.log('click===')
    if(DEBUG){
        console.log(123)
        var a = 1
        var b = 4
        console.log(a+b)
    }
 `
 const babelOption  = {
     plugins:[['./index.js',{
         isRemove:true
     }]]
 }
 const output =  babel.transformSync(code, babelOption);
 console.log('output====',output.code)