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
  }

}
