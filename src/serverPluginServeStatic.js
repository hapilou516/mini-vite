const staticServe = require("koa-static");
const path = require("path");

function serverStaticPlugin({ app, root }) {
  app.use(staticServe(root));
  app.use(staticServe(path.resolve(root, 'public')))
}

module.exports = serverStaticPlugin;
