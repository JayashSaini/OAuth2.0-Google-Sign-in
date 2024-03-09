const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../config/passport.config.js");

router.route("/").get(isAuthenticated, (req, res) => {
  // res.send("Welcome to the profile" + req.user?.username);

  res.render("profile", {
    user: req.user,
  });
});
module.exports = router;
