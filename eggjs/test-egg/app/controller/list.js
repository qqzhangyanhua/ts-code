// app/controller/home.js
const Controller = require("egg").Controller;

class ListController extends Controller {
  async index() {
    this.ctx.body = {
      name: "list",
      time: new Date().getTime(),
    };
  }
}

module.exports = ListController;
