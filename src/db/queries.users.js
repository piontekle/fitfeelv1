const User = require("./models").User;
const CheckIn = require("./models").CheckIn;
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  findUser(username, callback) {
    let result = {};
    User.findOne({where: {username: username}})
    .then((user) => {
      if(!user) {
        callback(404);
      } else {
        result["user"] = user;
        let id = user.id

        CheckIn.scope({method: ["lastTenFor", id]}).findAll()
        .then((checkIns) => {
          result["checkIns"] = checkIns;

          callback(null, result);
        })
        .catch((err) => {
          console.log(err)
          callback(err);
        })
      }
    })
  }
}
