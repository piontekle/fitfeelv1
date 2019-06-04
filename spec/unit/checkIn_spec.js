const sequelize = require("../../src/db/models/index").sequelize;
const CheckIn = require("../../src/db/models").CheckIn;
const User = require("../../src/db/models").User;

describe("CheckIn", () => {
  beforeEach((done) => {
    this.checkIn;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        username: "user123",
        email: "user@example.com",
        password: "123456"
      })
      .then((user) => {
        this.user = user;

        CheckIn.create({
          title: "Workout 10/21",
          exercise: "Weights",
          feelings: ["Tired", "Ready"],
          comment: "None today!",
          userId: 1
        })
        .then((checkIn) => {
          this.checkIn = checkIn;
          done();
        })
      })
    });
  });

  describe("#create()", () => {
    it("should return a check with title, exercise, feelings, & comments", (done) => {
      CheckIn.create({
        title: "Weights 03/24",
        exercise: "Weights",
        feelings: ["Energetic", "Happy"],
        comment: "Feeling great!"
      })
      .then((checkIn) => {
        expect(checkIn.title).toBe("Weights 03/24");
        expect(checkIn.exercise).toBe("Weights");
        expect(checkIn.feelings).toEqual(["Energetic", "Happy"]);
        expect(checkIn.comment).toBe("Feeling great!");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
  });

  describe("#setUser()", () => {
    it("should associate a post and a user together", (done) => {
      User.create({
        username: "newHere",
        email: "n00b@new.com",
        password: "123456"
      })
      .then((newUser) => {
        expect(this.checkIn.userId).toBe(this.user.id);

        this.checkIn.setUser(newUser)
        .then((post) => {
          expect(this.checkIn.userId).toBe(newUser.id);
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    })
  })

  describe("#getUser()", () => {
    it("should return the associated user", (done) => {
      this.checkIn.getUser()
      .then((associatedUser) => {
        expect(associatedUser.username).toBe("user123");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });

})
