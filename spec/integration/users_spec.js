const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/";

describe("routes : users", () => {

  describe("GET /:id", () => {
    it("should return the user info", (done) => {
      request.get(`${base}${this.user.id}`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("User Info");
        done();
      });
    });

  })
})
