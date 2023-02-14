const commander = require("commander");
const createInitCommand = require("@zhang/init");
const semver = require("semver");
const program = new commander.Command();
const { log } = require("@zhang/utils");
const pkg = require("../package.json");
const LOWEST_NODE_VERSION = "12.0.0";
const checkNodeVersion = () => {
  log.verbose("checkNodeVersion", process.version);
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(`cli 需要安装${LOWEST_NODE_VERSION} 以上版本的 Node.js`);
  } else {
    log.success("checkNodeVersion", "当前版本符合要求");
  }
};
function preAction() {
  //检查node 版本
  checkNodeVersion();
}

module.exports = function (args) {
  log.success("Hello from cli", pkg.version);
  program
    .name(Object.keys(pkg.bin)[0])
    .version(pkg.version)
    .usage("<command> [options]")
    .option("-d , --debug", "是否开启调试模式", false)
    .hook("preAction", preAction);
  createInitCommand(program);

  // program
  //   .command("create <app-name>")
  //   .description("创建一个新的项目")
  //   .option("-f, --force", "是否强制创建", false)
  //   .action((name) => {
  //     console.log("create", name);
  //   });
  program.parse(args);
};
process.on("uncaughtException", (err) => {
  log.error("uncaughtException", err.message);
  // process.exit(1);
});
