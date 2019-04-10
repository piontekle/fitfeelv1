const request = require("request");
const server = require("../../server.js");
const base = "http://localhost:5000";
var React = require("react");
var ReactDOM = require("react-dom");
var act = require("react-dom/test-utils").act;
var Home = require("../../client/src/App/views/home");

describe("routes : static", () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  describe("GET /", () => {
    it("renders without error", (done) => {
      act(() => {
        ReactDOM.render(Home, container);
      });
      const header = container.querySelector('h4');
      expect(header.textContent).toContain("Welcome to FitFeel")
      done();
    });

  });

});
