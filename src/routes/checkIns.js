const express = require("express");
const app = express();
const checkInQueries = require("../db/queries.checkIns.js");

app.post("/check-in", (req, res, next) => {
  console.log("*****CHECKING IN****")
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
      console.log("check in created")
      res.status(303).send({ message: "check in created!"});
    }
  });
});

app.get("get-check-in", (req, res, next) => {
  console.log("****GETTING CHECK-IN")
  checkInQueries.getCheckIn(req.query.title, (err, result) => {
    if (err || result.user === undefined) {
      res.status(401).send({message: 'No check in found.'});
    } else {
      res.status(200).send({
        title: checkIn.title,
        exercise: checkIn.user.email,
        feelings: checkIn.user.password,
        comment: checkIn.comment,
        message: 'check in found'
      });
    }
  })
})

module.exports = app;
