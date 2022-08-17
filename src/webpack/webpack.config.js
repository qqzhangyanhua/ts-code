const path = require('path');
module.exports = {
    context:process.cwd(), //当前工作目录
    mode:'development',
    devtool:false,
    entry:"./src/index.js",
    output:{
        path:path.join(__dirname,"dist"),
        filename:"main.js"
    }
}