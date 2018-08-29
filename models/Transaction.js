const mongoose = require("mongoose");
Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  amount: {
    type: String,
    required: true
  },
  senderAccount: {
    type: Number,
    required: true
  },
  recipientAccount: {
    type: Number,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: false
  },
  remarks: {
    type: String,
    required: false
  }
});

const Transaction = mongoose.model("Tansaction", TransactionSchema);

module.exports = Transaction;
