const CheckIn = require("./models").CheckIn;

module.exports = {
  addCheckIn(newCheckIn, callback) {
    return CheckIn.create({
      title: newCheckIn.title,
      exercise: newCheckIn.exercise,
      preCheck: newCheckIn.preCheck,
      userId: newCheckIn.userId
    })
    .then((checkIn) => {
      callback(null, checkIn);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getCheckIn(checkInId, callback){
    return CheckIn.findByPk(checkInId)
    .then((checkIn) => {
      callback(null, checkIn);
    })
    .catch((err) => {
      callback(err);
    });
  },
  postCheckIn(checkInId, postCheckIn, callback) {
    console.log(postCheckIn);
    return CheckIn.findByPk(checkInId)
    .then((checkIn) => {
      if(!checkIn) return callback("Check in not found");

      checkIn.update({ postCheck: [postCheckIn.feelings, postCheckIn.comment] })
      .catch((err) => {
        callback(err);
      });
    })
  }

}
