const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const expressSession = require("express-session");
const { initializingPassport } = require("./config/passport.config.js");

const userRouter = require("./routes/user.routes.js");
const authRouter = require("./routes/auth.routes.js");
const profileRouter = require("./routes/profile.routes.js");

// Initialize Passport and Express Session
initializingPassport(passport);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET, // You should replace this with a secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport session
app.use(passport.initialize());
app.use(passport.session());

// Define cookie-session middleware if you prefer

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.Cookie_Key],
//   })
// );

// Routes
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
module.exports = app;
