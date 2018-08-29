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

TransactionSchema.methods.addRemark = function() {
  const remarks = `Transfer of ${this.amount} from ${this.senderAccount} to ${
    this.recipientAccount
  } ${this.bankName}`;
  this.remarks = remarks;
};

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
