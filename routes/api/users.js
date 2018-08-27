const router = require("express").Router();

router.get("/test", (req, res) => {
  res.json({ msg: "Auth route works" });
});

module.exports = router;
