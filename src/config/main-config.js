require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const expressValidator = require("express-validator");
const passportConfig = require("./passport-config");

module.exports = {
  init(app){
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());
    app.use(morgan("combined"));
    app.use(expressValidator());
    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 }
    }));
    app.use(flash());
    passportConfig.init(app);
    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    })
  }
}
