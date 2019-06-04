const CheckIn = require("./models").CheckIn;

module.exports = {
  addCheckIn(newCheckIn, callback) {
    return CheckIn.create({
      title: newCheckIn.title,
      exercise: newCheckIn.exercise,
      feelings: newCheckIn.feelings,
      comment: newCheckIn.comment,
      userId: newCheckIn.userId
    })
    .then((checkIn) => {
      callback(null, checkIn);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getCheckIn(checkInTitle, callback){
    return CheckIn.findOne({where: {title: checkInTitle}})
    .then((checkIn) => {
      callback(null, checkIn);
    })
    .catch((err) => {
      callback(err);
    });
  }

}
