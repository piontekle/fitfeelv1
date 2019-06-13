const express = require("express");
const app = express();
const checkInQueries = require("../db/queries.checkIns.js");

app.post("/check-in", (req, res, next) => {
  console.log("User ID: " + req.body.userId)
  let newCheckIn = {
    title: req.body.title,
    exercise: req.body.exercise,
    feelings: req.body.feelings,
    comment: req.body.comment,
    userId: req.body.userId
  }

  checkInQueries.addCheckIn(newCheckIn, (err, checkIn) => {
    if(err){
      console.log(err)
      res.status(500).send({ message: err });
    } else {
      res.status(200).send({ message: "check in created"});
    }
  });
});

app.get("/get-check-in", (req, res, next) => {
  console.log("****GETTING CHECK-IN")
  checkInQueries.getCheckIn(req.query.title, (err, checkIn) => {
    if (err || checkIn === undefined) {
      console.log("****ERR IS: " + err);
      res.status(401).send({message: 'No check in found.'});
    } else {
      res.status(200).send({
        title: checkIn.title,
        exercise: checkIn.exercise,
        feelings: checkIn.feelings,
        comment: checkIn.comment,
        message: 'check in found'
      });
    }
  })
})

module.exports = app;
