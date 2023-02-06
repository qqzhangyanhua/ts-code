#!/usr/bin/env node
console.log("action");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const arg = hideBin(process.argv);
const cli = yargs(arg);
const dedent = require("dedent");
yargs(arg)
  .usage("mo-test [command] <options>")
  .strict()
  .alias("h", "help")
  .alias("v", "version")
  .wrap(cli.terminalWidth()) //宽度
  .epilogue(dedent`这里可以写一些说明`)
  .options({
    debug: {
      type: "boolean",
      describe: "'debug'模式",
      alias: "d",
    },
  })
  .option("ci", {
    type: "boolean",
    describe: "是否是CI环境",
    alias: "c",
  })
  .option("register", {
    type: "boolean",
    describe: "register",
    alias: "r",
  })
  .group(["debug", "ci"], "调试选项:")
  .demandCommand(1, "最少输入一个参数").argv;
