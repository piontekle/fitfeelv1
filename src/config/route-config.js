module.exports = {
  init(app) {
    const userRoutes = require("../routes/users");
    const checkInRoutes = require("../routes/checkIns");

    app.use(userRoutes);
    app.use(checkInRoutes);
  }

}
