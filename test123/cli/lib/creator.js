const Inquirer = require("inquirer");

class Creator {
  constructor(projectName, target) {
    this.projectName = projectName;
    this.target = target;
  }
  fetchTag() {}
  create() {
    console.log("开始创建项目", this.projectName);
    //1 拉模板
    let repo = this.fetchTag();
  }
}
module.exports = Creator;
