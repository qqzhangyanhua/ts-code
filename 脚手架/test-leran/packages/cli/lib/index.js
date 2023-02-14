const commander = require("commander");
// const { program } = require("commander");
const program = new commander.Command();

const pkg = require("../package.json");

module.exports = function (args) {
  console.log("Hello from cli", args);

  program
    .name(Object.keys(pkg.bin)[0])
    .version(pkg.version)
    .usage("<command> [options]")
    .option("-d , --debug", "是否开启调试模式", false);
  program
    .command("create <app-name>")
    .description("创建一个新的项目")
    .option("-f, --force", "是否强制创建", false)
    .action((name) => {
      console.log("create", name);
    });
  program.parse(args);
};
