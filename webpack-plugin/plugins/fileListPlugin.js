
class FileListPlugin{
    constructor({filename}){
        this.filename = filename
    }
    apply(compiler){
        compiler.hooks.emit.tap('FileListPlugin',(compilation)=>{
            let assets = compilation.assets;
            let content = `## 文件名    文件大小\r\n`
            Object.entries(assets).forEach(([filename, stateObj])=>{
                console.log('element====',filename)
                content+=`- ${filename}   ${stateObj.size()}\r\n`
            })
            assets[this.filename] ={
                source: ()=>{
                        return content
                },
                size:()=>{
                    return content.length
                }
            }
        })
    }
}
module.exports = FileListPlugin;