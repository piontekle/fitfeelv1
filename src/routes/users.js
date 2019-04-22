const express = require("express");
const app = express();
const passport = require("passport");
const userQueries = require("../db/queries.users.js");

app.post("/sign-up", (req, res, next) => {
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirm
  };

  userQueries.createUser(newUser, (err, user) => {
    if(err){
      console.log(err)
      res.status(500).send({ message: err });
      res.redirect("/sign-up");
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("user created")
        res.redirect("/");
      })
    }
  })
})

module.exports = app;
