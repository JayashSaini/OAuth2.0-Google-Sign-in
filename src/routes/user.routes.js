const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import your User model and isAuthenticated middleware if needed

router.route("/").get((req, res) => {
  res.render("index", { user: req?.user });
});

// Assuming this is your route handler for logging out
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle error
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    // Redirect the user to a different page or send a response
    res.redirect("/user"); // Redirect to the home page
  });
});

router.route("/login").get((req, res) => {
  res.render("login", { user: req?.user });
});

module.exports = router;
