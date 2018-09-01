const validator = require("validator");
const isEmpty = require("./is-empty");

const validateTransaction = data => {
  let errors = {};

  if (isEmpty(data.amount)) {
    errors.amount = "Amount field cannot be empty";
  }

  if (!validator.isInt(data.amount.toString())) {
    errors.amount = "Please enter a valid amount";
  }

  if (isEmpty(data.recipientAccount)) {
    errors.recipientAccount = "Recipient Account field cannot be empty";
  }

  if (!validator.isInt(data.recipientAccount.toString())) {
    errors.recipientAccount = "Please enter a valid account number";
  }

  if (isEmpty(data.bankName)) {
    errors.bankName = "Bank Name field cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateTransaction;
