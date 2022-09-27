
class AsyncPlugin{
    apply(compiler){
        compiler.hooks.emit.tapAsync('AsyncPlugin',(compilation,cb)=>{
            setTimeout(()=>{
                console.log('文件发射出来了---异步')
                cb()
            },1000)
        })
    }
}
module.exports = AsyncPlugin;