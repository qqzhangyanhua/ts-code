module.exports =({types: t})=>{
    return {
        visitor: {
            //插件写逻辑的地方
            Identifier(path){
                const parentisIf = t.isIfStatement(path.parentPath)
                // console.log("Identifier====",path.node.name)
                //如果是debug并且if
                if(path.node.name ==='DEBUG' && parentisIf){
                    const stringNode = t.StringLiteral('DEBUG')
                    path.replaceWith(stringNode)

                }
            },
            StringLiteral(path,state){
                const parentisIf = t.isIfStatement(path.parentPath)
                //控制在生产才移除
                if(path.node.value ==='DEBUG' && parentisIf){
                    path.parentPath.remove()
                }
                console.log('value=========',state.opts)
            }
        }
    }
}