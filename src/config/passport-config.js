const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const RememberMeStrategy = require("../..").Strategy;
const User = require("../db/models").User;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
      usernameField: "username"
    }, (username, password, done) => {
      User.findOne({where: {username: username}})
      .then((user) => {
        if (!user || !authHelper.comparePass(password, user.password)) {
          return done(null, false, {message: "Invalid username or password"});
        }
        return done(null, user, {message: "user created"});
      })
    }));

    // passport.use(new RememberMeStrategy( {
    //   usernameField: "username"
    // }, function(token, username, done) {
    //     User.findByPk({where: {username}})
    //     .then((user) => {
    //       Token.consume(token, function(err, user) {
    //
    //       })
    //     })
    //
    //   }
    // ));

    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });

    passport.deserializeUser((id, callback) => {
      User.findByPk(id)
      .then((user) => {
        callback(null, user);
      })
      .catch((err => {
        callback(err, user);
      }))
    });

  }
}
