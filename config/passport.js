const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/User");
const secret = require("./keys").jwtSecret;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            const userDetails = {
              _id: user._id,
              accounts: user.accounts
            };
            return done(null, userDetails);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
