const fs = require('fs');
const path = require('path');
// 扫描VUE文件
exports.scanFileVue = function(scanPath) {
    const entryFiles = glob.sync(path.join(process.cwd(), `${scanPath}/**/*.vue`));
    // console.log(entryFiles);
    return entryFiles;
}

// 获取代码文件内容
exports.getCode = function(fileName) {
    try{
        console.log(fileName, 'fileName');
        const code = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');
        console.log(code);
        return code;
    }catch(e){
        throw e;
    }
}
// 将TS片段写入TS文件
exports.writeTsFile = function(content, fileName) {
    try{
        fs.writeFileSync(path.join(process.cwd(),`${fileName}.ts`), content, 'utf8');
        console.log('写入临时文件成功');
    }catch(e){
        console.log('写入临时文件失败',e);
        
        throw e;
    }
}
// vue TS 片段提取后写入临时文件所在的暂存目录
exports.VUETEMPTSDIR = 'vue_temp_ts_dir';