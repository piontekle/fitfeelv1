const express = require("express");
const app = express();
const checkInQueries = require("../db/queries.checkIns.js");

app.post("/check-in", (req, res, next) => {
  let newCheckIn = {
    title: req.body.title,
    exercise: req.body.exercise,
    preCheck: [req.body.feelings, req.body.comment],
    userId: req.body.userId
  }

  req.checkBody("title", "title must be at least 4 characters long").isLength({min: 4});
  req.checkBody("exercise", "Exercise must be selected").exists();

  const errors = req.validationErrors();

  if (errors) {
    res.status(500).send({ message: errors })
  } else {
    checkInQueries.addCheckIn(newCheckIn, (err, checkIn) => {
      if(err){
        console.log(err)
        res.status(500).send({ message: err });
      } else {
        res.status(200).send({ message: "check in created"});
      }
    });
  }
});

app.get("/get-check-in", (req, res, next) => {
  checkInQueries.getCheckIn(req.query.title, (err, checkIn) => {
    if (err || checkIn === undefined) {
      res.status(401).send({message: 'No check in found.'});
    } else {
      res.status(200).send({
        title: checkIn.title,
        exercise: checkIn.exercise,
        preCheck: checkIn.preCheck,
        postCheck: checkIn.postCheck,
        message: 'check in found'
      });
    }
  })
})

module.exports = app;
