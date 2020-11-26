const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.loginEmail = !isEmpty(data.loginEmail) ? data.loginEmail : "";
  data.loginPassword = !isEmpty(data.loginPassword) ? data.loginPassword : "";

  if (validator.isEmpty(data.loginEmail)) {
    errors.loginEmail = "Email address is required";
  } else if (!validator.isEmail(data.loginEmail)) {
    errors.loginEmail = "Email address is invalid";
  }

  if (validator.isEmpty(data.loginPassword)) {
    errors.loginPassword = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
