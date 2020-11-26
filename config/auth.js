const jwt = require("jsonwebtoken");
const User = require("../models/user");
const keys = require("./keys");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            //googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value.split("?")[0],
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decode = jwt.verify(token, keys.secretKey);

  User.findOne({ _id: decode._id, "tokens.token": token })
    .then((user) => {
      if (!user) {
        throw new Error();
      }

      req.token = token;
      req.user = user;

      next();
    })
    .catch((e) => {
      res.status(401).json({ error: "Please authenticate" });
    });
};

module.exports = auth;
