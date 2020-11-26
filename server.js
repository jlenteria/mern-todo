const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routers/users");
const tasks = require("./routers/tasks");
const path = require("path");
const app = express();

require("./db/mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tasks", tasks);

if (process.env.NODE_ENV === "production") {
  //Set statis folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running at port ", PORT);
});
