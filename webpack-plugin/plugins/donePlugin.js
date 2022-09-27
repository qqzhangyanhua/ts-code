
class DonePlugin{
    apply(complier) {
        complier.hooks.done.tap('DonePlugin',(states)=>{
            console.log('编译完成')
        })
    }
}
module.exports = DonePlugin;