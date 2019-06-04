const request = require("request");
const server= require("../../server");
const base = "http://localhost:5000/";
const sequelize = require("../../src/db/models/index").sequelize;

const CheckIn = require("../../src/db/models").CheckIn;
const User = require("../../src/db/models").User;

describe("routes : check ins", () => {
  beforeEach((done) => {
    this.user;
    this.checkIn;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        username: "Star boi",
        email: "starboi@galaxy.com",
        password: "lamar1"
      })
      .then((user) => {
        this.user = user;

        CheckIn.create({
          title: "Workout 10/21",
          exercise: "Weights",
          feelings: ["Tired", "OK"],
          comment: "Just dragging a little",
          userId: this.user.id
        })
        .then((checkIn) => {
          this.checkIn = checkIn;
          done();
        });
      });
    });
  });

  describe("POST /check-in", () => {
    it("should create a new post", (done) => {
      const options = {
        url: `${base}check-in`,
        form: {
          title: "Rough Day 03/21",
          exercise: "Run",
          feelings: ["Sad", "Exhausted"],
          comment: "Meh"
        }
      }

      request.post(options, (err, res, body) => {
        expect(err).toBeNull();

        CheckIn.findOne({where: {title: "Rough Day 03/21"}})
        .then((checkIn) => {
          expect(checkIn.exercise).toBe("Run");
          expect(checkIn.feelings).toEqual(["Sad", "Exhausted"]);
          expect(checkIn.comment).toBe("Meh");
          done();
        })
      })

    });
  });

});
