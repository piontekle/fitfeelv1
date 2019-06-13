require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const expressValidator = require("express-validator");
const passportConfig = require("./passport-config");

module.exports = {
  init(app, express){
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

      next();
    })
    app.use(express.static(path.join(__dirname, '../..', 'client/build')));
    if(process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../..', 'client/build')));

      app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../..', 'client/build', 'index.html'));
      })
    }
    app.use(cors());
    app.use(morgan("dev"));
    app.use(expressValidator());
    app.use(session({
      secret: process.env.DATABASE_URL,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 }
    }));
    passportConfig.init(app);
    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    })
  }
}
