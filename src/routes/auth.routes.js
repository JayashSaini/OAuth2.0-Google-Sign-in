const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router
  .route("/google/redirect")
  .get(passport.authenticate("google"), (req, res) => {
    res.redirect("/profile/");
  });
module.exports = router;
