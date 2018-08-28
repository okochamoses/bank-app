const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys").jwtSecret;
const passport = require("passport");

//Load User Model
const User = require("../../models/User");

// Load Account Model
const Account = require("../../models/Account");

router.get("/test", (req, res) => {
  res.json({ msg: "Auth route works" });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      dateOfBirth: Date.parse(req.body.dateOfBirth)
    });

    const newAccount = new Account({
      type: req.body.type,
      user: newUser._id
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        // Add new account to User.accounts array
        newUser.accounts.push(newAccount);

        newUser
          .save()
          .then(user => {
            newAccount
              .save()
              .then(account => res.json(account))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      });
    });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user in DB by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User does not exist" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ password: "Invalid password" });
      }
      // Successful
      const payload = { id: user._id, email: user.email };

      // Create token
      jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
        res.json({
          token: `Bearer ${token}`
        });
      });
    });
  });
});

// Test Private route
router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
