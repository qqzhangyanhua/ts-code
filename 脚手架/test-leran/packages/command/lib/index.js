class Command {
  constructor(instance) {
    if (!instance) {
      console.error("command 不能为空");
    }
    this.program = instance;
    const cmd = this.program.command(this.command);
    cmd.description(this.description);
    if (this.options?.length > 0) {
      this.options.forEach(function (item) {
        cmd.option(...item);
      });
    }
    cmd.hook("preAction", () => {
      this.preAction();
    });
    cmd.hook("postAction", () => {
      this.postAction();
    });
    cmd.action((...params) => {
      this.action(params);
    });
  }
  get command() {
    throw new Error("command must be");
  }
  get description() {
    throw new Error("description must be");
  }
  get options() {
    return [];
  }
  get action() {
    throw new Error("action must be");
  }
  preAction() {}
  postAction() {}
}
module.exports = Command;
