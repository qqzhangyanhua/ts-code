
pnpm store prune   //删除不再引用的包

pnpm -F @packages/components add lodash  // 某个包安装依赖

glob 可以匹配当前目录下的所有文件
```js
const glob = require('glob')
glob('**/*.js',{
    ignore:['node_modules']
},function(err,file)=>{
    console.log(file)
})
```