const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account"
    }
  ],
  registrationDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
