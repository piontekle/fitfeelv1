const express = require("express");
const app = express();
const userQueries = require("")

app.post("/sign-up", (req, res, next) => {
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passConfirm
  };

  userQueries.createUser(newUser, (err, user) => {
    if(err){
      req.flash("error", err);
      res.redirect("/sign_up");
    } else {
      passport.authenticate("local")(req, res, () => {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/")
      })
    }
  })
})

module.exports = app;
