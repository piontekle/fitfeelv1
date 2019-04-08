const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const path = require("path");

app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+"/client/build/index.html"));
});

app.listen(port);
console.log(`App is listening on ${port}`);
