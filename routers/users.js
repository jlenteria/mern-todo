const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const auth = require("../config/auth");

//Load user model
const User = require("../models/user");

//Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //find existing user
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email is already registered";
      res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      //newUser
      const newUser = new User({
        avatar,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
      });

      //hashing password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err2, hash) => {
          if (err2) throw err2;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((err3) => res.status(400).json(err3));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  let { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  const email = req.body.loginEmail;
  const password = req.body.loginPassword;

  //Find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.notFound = "User not found";
      return res.status(404).json(errors);
    }

    //Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User matched
        const token = user.generateAuthToken();
        res.status(200).json({ user, token });
      } else {
        errors.loginPassword = "Incorrect password";
        res.status(400).json(errors);
      }
    });
  });
});

router.post("/logout", auth, (req, res) => {
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token;
  });

  req.user.save();
  res.json();
});

router.post("/logoutAll", auth, (req, res) => {
  req.user.tokens = [];
  req.user.save();
  res.json(req.user);
});

router.delete("/delete", auth, (req, res) => {
  req.user.remove();
  res.send(req.user);
});

router.get("/all", (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((e) => res.status(400).json({ nousers: "No users yet" }));
});

router.get("/current", auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
