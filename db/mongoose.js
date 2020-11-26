const mongoose = require("mongoose");

const db = require("../config/keys").MONGODB_URI;

mongoose.connect(
  db,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  () => {
    console.log("database connected");
  }
);
