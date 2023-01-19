const { Controller } = require("egg");

class NewsController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
}
module.exports = NewsController;
