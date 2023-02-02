const fs = require("fs");
const path = require("path");
const Creator = require("./creator");
module.exports = function (name, cmd) {
  //获取执行命令的目录
  const cwd = process.cwd();
  const targetDir = path.join(cwd, name);
  console.log("targetDir", targetDir);
  //如果目录存在
  if (fs.existsSync(targetDir)) {
    //操作
  }
  //创建项目
  const creator = new Creator(name, targetDir);
  creator.create();
};
