const router = require("express").Router();

router.get("/test", (req, res) => res.json({ msg: "success" }));

module.exports = router;