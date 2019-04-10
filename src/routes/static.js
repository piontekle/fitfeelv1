const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log("Home page loaded")
})

app.get("/about", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

module.exports = app;
