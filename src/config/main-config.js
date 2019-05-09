require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const expressValidator = require("express-validator");
const passportConfig = require("./passport-config");

module.exports = {
  init(app){
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'client/build')));
    if(process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, 'client/build')));
      //
      app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'client/build/index.html'));
      })
    }
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'/client/public/index.html'));
    })
    app.use(cors());
    app.use(morgan("dev"));
    app.use(expressValidator());
    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.29e+9 }
    }));
    passportConfig.init(app);
    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    })
  }
}
