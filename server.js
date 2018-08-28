const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURL;

// Connect to mongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Database connection established"))
  .catch(err => console.log("Error connecting to database: " + err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

const user = require("./routes/api/users");
const accounts = require("./routes/api/accounts");
app.use("/api/user", user);
app.use("/api/accounts", accounts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
