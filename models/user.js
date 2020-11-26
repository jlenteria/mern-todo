const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.virtual("tasks", {
  ref: "tasks",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const auth = {
    _id: user._id.toString(),
    firstname: user.firstname,
    lastname: user.lastname,
    avatar: user.avatar,
  };
  const token = jwt.sign(auth, keys.secretKey, { expiresIn: 3600 });
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
