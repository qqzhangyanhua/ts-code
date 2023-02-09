#!/usr/bin/env node
const commander = require("commander");
const pkg = require("../package.json");
// const { program } = commander;
const program = new commander.Command();
program
  .usage("<command> [options]")
  .version(pkg.version)
  .option("-d, --debug", "debug模式", false)
  .option("-e, --env <envName>", "获取环境变量")
  .parse(process.argv);

// program.outputHelp();  打印帮助信息
//command 注册命令

const clone = program.command("clone <source> [destination]");
clone.description("clone a repository").action(() => {
  console.log("clone");
});

console.log("program", program.opts());
