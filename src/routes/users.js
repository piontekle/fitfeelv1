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

    } else {
      passport.authenticate("local")(req, res, () => {
        res.status(200).send({ message: 'user created' });
      })
    }
  })
})

app.post("/sign-in", (req, res, next) => {
  passport.authenticate("local")(req, res, function() {

    if(!req.user){
      res.status(401).send({message: 'invalid username or password'});
    } else {
      res.status(200).send({ message: 'user found and logged in'});
    }
  })
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
        message: 'User found'
      });
    }
  })
})

module.exports = app;
