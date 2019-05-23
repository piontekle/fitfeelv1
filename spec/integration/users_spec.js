const request = require("request");
const server = require("../../server");
const base = "http://localhost:5000/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("controllers : users", () => {
  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    })
  })

  describe("POST /sign-up", () => {
    it("should create a user with valid values and redirect", (done) => {
      const options = {
        url: `${base}sign-up`,
        form: {
          username: "user123",
          email: "user@example.com",
          password: "123456"
        }
      }

      request.post(options, (err, res, body) => {
        User.findOne({where: {username: "user123"}})
        .then((user) => {
          expect(user).not.toBeNull();
          expect(user.username).toBe("user123");
          expect(user.email).toBe("user@example.com");
          expect(user.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

    it("should not  create a new user with invalid attributes", (done) => {
      request.post({
        url: `${base}sign-up`,
        form: {
          username: "user123",
          email: "no",
          password: "123456"
        }
      }, (err, res, body) => {
        User.findOne({where: {email: "no"}})
        .then((user) => {
          expect(user).toBeNull();
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

});
