const router = require("express").Router();
const passport = require("passport");
const Account = require("../../models/Account");

router.get("/test", (req, res) => res.json({ msg: success }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.find({ user: req.user._id }).then(accounts => {
      if (!accounts) {
        return res
          .status(404)
          .json({ user, error: "This user has no account" });
      }
      res.json({ user: req.user, accounts });
    });
  }
);
module.exports = router;
