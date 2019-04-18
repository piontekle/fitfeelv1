module.exports = {
  init(app) {
    const staticController = require("../controllers/static");

    app.use(staticController);
  }

}
