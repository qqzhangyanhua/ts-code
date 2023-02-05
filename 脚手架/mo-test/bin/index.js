#!/usr/bin/env node
const utils = require("./utils");
const argv = require("process").argv;
const command = argv[2];
const options = argv.slice(3);
let [option, param] = options;
option = option && option.replace(/^-+/, "");
if (command) {
  console.log("执行命令", command);
  if (utils[command]) {
    utils[command]({ option, param });
  }
} else {
  console.log("请输入命令");
}
//实现参数解析
