#! /usr/bin/env node
console.log("开始执行1");

const program = require("commander");

program.version("0.0.1").name("tongban-cli").usage("<command> [options]");

program
  .command("create <project-name>")
  .description("create a new project powered by tongban-cli-service")
  .option("-f, --force", "强制覆盖")
  .action((name, cmd) => {
    console.log("==create", name, cmd);
    require("../lib/create")(name, cmd);
  });

program.parse(process.argv);
