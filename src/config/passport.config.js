const GoogleStrategy = require("passport-google-oauth20");
const { User } = require("../models/user.model.js");

const initializingPassport = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        callbackURL: `${process.env.BASE_URL}/auth/google/redirect`,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({
          googleId: profile.id,
        }).then((existedUser) => {
          if (existedUser) {
            done(null, existedUser);
          } else {
            new User({
              googleId: profile.id,
              username: profile.displayName,
              thumbnail: profile._json.picture,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              })
              .catch((err) => {
                console.log("Error creating user", err.message);
                done(err);
                done(err);
              });
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      return done(error, false);
    }
  });
};

const isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  res.redirect("/user/login");
};

module.exports = {
  initializingPassport,
  isAuthenticated,
};
