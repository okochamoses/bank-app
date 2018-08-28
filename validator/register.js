const validator = require("validator");
const isEmpty = require("./is-empty");

const validateRegisterInput = data => {
  let errors = {};

  if (!validator.isLength(data.firstName, { min: 2, max: 20 })) {
    errors.firstName = "First name must be between 2 and 20 characters";
  }

  if (!validator.isLength(data.lastName, { min: 2, max: 20 })) {
    errors.lastName = "Last name must be between 2 and 20 characters";
  }

  if (validator.isEmpty(data.firstName.trim())) {
    errors.firstName = "First name field is required";
  }

  if (validator.isEmpty(data.lastName.trim())) {
    errors.firstName = "Last name field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!validator.isISO8601(data.dateOfBirth)) {
    errors.dateOfBirth = "Please enter a valid date";
  }

  if (validator.isEmpty(data.type)) {
    errors.type = "Account type is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
