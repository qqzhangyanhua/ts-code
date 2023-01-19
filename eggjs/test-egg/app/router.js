// app/router.js
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home?.index);
  router.get("/list", controller.list?.index);
  router.get("/news", controller.news?.index);
};
