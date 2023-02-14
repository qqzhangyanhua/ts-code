const Command = require("@zhang/command");
const { log } = require("@zhang/utils");
class InitCommand extends Command {
  get command() {
    return "init [projectName]";
  }
  get description() {
    return "初始化项目";
  }
  get options() {
    return [
      ["-f, --force", "是否强制创建", false],
      ["-c, --close", "是否关闭", false],
    ];
  }
  action([name, opts]) {
    log.verbose("init", name, opts);
  }
  preAction() {
    console.log("preAction");
  }
  postAction() {
    console.log("postAction");
  }
}
function init(instance) {
  return new InitCommand(instance);
}
module.exports = init;
