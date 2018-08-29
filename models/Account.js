const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Account Schema
const AccountSchema = new Schema({
  number: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * 10000000000)
  },
  type: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  active: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

AccountSchema.methods.debitAccount = function(amount, callback) {
  if (this.balance < amount) throw Error("Insufficient funds");

  this.balance -= amount;

  return Account.findOneAndUpdate(
    { number: this.number },
    { balance: this.balance },
    callback
  );
};

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
