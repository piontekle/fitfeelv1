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

  req.checkBody("username", "username must be at least 4 characters long").isLength({min: 4});
  req.checkBody("email", "email must be valid").isEmail();
  req.checkBody("password", "password must be at least 6 characters in length").isLength({min: 6});
  req.checkBody("passwordConfirm", "must match password provided").matches(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    res.status(500).send({ message: errors });
  } else {
    userQueries.createUser(newUser, (err, user) => {
      if(err){
        console.log(err)
        res.status(500).send({ message: err });

      } else {
        passport.authenticate("local")(req, res, () => {
          res.status(200).send({ message: 'user created' });
        })
      }
    })
  }
})

app.post("/sign-in", (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
    if(!user){
      res.status(401).send({message: info.message});
    } else {
      res.status(200).send({ message: 'user found and logged in'});
    }
  })(req, res, next);
})

app.post("/sign-out", (req, res, next) => {
  req.logout();
  res.status(200).send({ message: 'user logged out'});
})

app.get("/find-user", (req, res, next) => {
  userQueries.findUser(req.query.username, (err, result) => {
    if (err || result.user === undefined) {
      res.status(401).send({message: 'No user found.'});
    } else {
      res.status(200).send({
        username: result.user.username,
        email: result.user.email,
        password: result.user.password,
        id: result.user.id,
        checkIns: result.checkIns,
        message: 'User found'
      });
    }
  })
})

module.exports = app;
